import React, { useEffect, useRef, useState } from 'react';
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

interface HologramFigureProps {
  /** 'portrait' samples `src`; 'figure' draws an abstract wireframe human (no face). */
  kind: 'portrait' | 'figure';
  src?: string;
  alt: string;
  /** Tailwind aspect class for the box, e.g. 'aspect-[349/763]'. */
  aspectClass: string;
  /** Slight pose change so the three specialist figures are not identical. */
  variant?: number;
  className?: string;
}

const INK = '#0E0E0E';
const IDLE_SPEED = 0.18; // rad/s
const HOVER_SPEED = 0.9;

interface Cloud {
  positions: Float32Array;
  alphas: Float32Array;
}

/** Portrait: sample pixels, depth from brightness. Height is normalised to 2 units (y from -1 to 1). */
function cloudFromImage(img: HTMLImageElement): Cloud {
  const H = 300;
  const W = Math.max(1, Math.round((H * img.naturalWidth) / img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { positions: new Float32Array(0), alphas: new Float32Array(0) };
  ctx.drawImage(img, 0, 0, W, H);
  const data = ctx.getImageData(0, 0, W, H).data;

  const pos: number[] = [];
  const alp: number[] = [];
  const depth = 0.22;
  const thickness = 0.05;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (data[i + 3] < 140) continue;
      const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      const px = ((x - W / 2) / H) * 2;
      const py = 1 - (y / H) * 2;
      const z = (lum - 0.5) * depth;
      const a = 0.22 + 0.78 * (1 - lum);
      pos.push(px, py, z);
      alp.push(a);
      // thin back layer, so the relief has volume when it turns side-on
      if ((x + y) % 2 === 0) {
        pos.push(px, py, z - thickness);
        alp.push(a * 0.45);
      }
    }
  }
  return { positions: new Float32Array(pos), alphas: new Float32Array(alp) };
}

type V3 = [number, number, number];

/** Abstract wireframe human: rings and long lines along capsules. No face, no features. */
function cloudFromFigure(variant: number): Cloud {
  const pos: number[] = [];
  const spread = [0.0, 0.05, -0.03][variant % 3];
  const lift = variant % 3 === 2 ? 0.22 : 0;

  const add = (p: V3) => pos.push(p[0], p[1], p[2]);

  const capsule = (a: V3, b: V3, r: number, zScale = 1) => {
    const d: V3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const len = Math.hypot(...d);
    const ax: V3 = [d[0] / len, d[1] / len, d[2] / len];
    // any vector not parallel to the axis
    const t: V3 = Math.abs(ax[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const u: V3 = [ax[1] * t[2] - ax[2] * t[1], ax[2] * t[0] - ax[0] * t[2], ax[0] * t[1] - ax[1] * t[0]];
    const ul = Math.hypot(...u);
    u[0] /= ul; u[1] /= ul; u[2] /= ul;
    const v: V3 = [ax[1] * u[2] - ax[2] * u[1], ax[2] * u[0] - ax[0] * u[2], ax[0] * u[1] - ax[1] * u[0]];
    const rings = Math.max(2, Math.round(len / 0.07));
    const N = 14;
    for (let i = 0; i <= rings; i++) {
      const s = i / rings;
      const cx = a[0] + d[0] * s, cy = a[1] + d[1] * s, cz = a[2] + d[2] * s;
      for (let k = 0; k < N; k++) {
        const ang = (k / N) * Math.PI * 2;
        const cs = Math.cos(ang) * r, sn = Math.sin(ang) * r;
        add([cx + u[0] * cs + v[0] * sn, cy + u[1] * cs + v[1] * sn, (cz + u[2] * cs + v[2] * sn) * zScale]);
      }
    }
    // longitudinal lines
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + 0.4;
      const cs = Math.cos(ang) * r, sn = Math.sin(ang) * r;
      const steps = Math.round(len / 0.02);
      for (let i = 0; i <= steps; i++) {
        const s = i / steps;
        add([
          a[0] + d[0] * s + u[0] * cs + v[0] * sn,
          a[1] + d[1] * s + u[1] * cs + v[1] * sn,
          (a[2] + d[2] * s + u[2] * cs + v[2] * sn) * zScale,
        ]);
      }
    }
  };

  const sphere = (c: V3, r: number) => {
    for (let lat = -3; lat <= 3; lat++) {
      const phi = (lat / 4) * (Math.PI / 2);
      const rr = Math.cos(phi) * r;
      for (let k = 0; k < 18; k++) {
        const ang = (k / 18) * Math.PI * 2;
        add([c[0] + Math.cos(ang) * rr, c[1] + Math.sin(phi) * r, c[2] + Math.sin(ang) * rr]);
      }
    }
  };

  sphere([0, 0.86, 0], 0.115);
  capsule([0, 0.74, 0], [0, 0.66, 0], 0.05); // neck
  capsule([0, 0.62, 0], [0, 0.06, 0], 0.19, 0.55); // torso
  capsule([-0.2, 0.58, 0], [0.2, 0.58, 0], 0.05, 0.8); // shoulder line
  for (const side of [-1, 1]) {
    const lx = 0.22 + spread;
    capsule([side * 0.21, 0.58, 0], [side * (lx + 0.06), 0.28 + lift * (side > 0 ? 1 : 0), 0.02], 0.045); // upper arm
    capsule([side * (lx + 0.06), 0.28 + lift * (side > 0 ? 1 : 0), 0.02], [side * (lx + 0.1), 0.0 + lift * 1.6 * (side > 0 ? 1 : 0), 0.06], 0.038); // forearm
    capsule([side * 0.1, 0.04, 0], [side * 0.12, -0.46, 0.01], 0.075); // thigh
    capsule([side * 0.12, -0.46, 0.01], [side * 0.12, -0.94, 0], 0.055); // shin
    capsule([side * 0.12, -0.96, 0.0], [side * 0.12, -0.96, 0.12], 0.035); // foot
  }

  const positions = new Float32Array(pos);
  const alphas = new Float32Array(positions.length / 3).fill(0.85);
  return { positions, alphas };
}

const VERT = /* glsl */ `
  attribute float aAlpha;
  uniform float uSize;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uSize;
    gl_Position = projectionMatrix * mv;
  }
`;
const FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    gl_FragColor = vec4(uColor, vAlpha * smoothstep(0.5, 0.2, r));
  }
`;

export const HologramFigure: React.FC<HologramFigureProps> = ({
  kind,
  src,
  alt,
  aspectClass,
  variant = 0,
  className = '',
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const staticPortrait = kind === 'portrait' && reduced;

  useEffect(() => {
    const box = boxRef.current;
    if (!box || staticPortrait) return;

    let disposed = false;
    let raf = 0;
    let renderer: WebGLRenderer | null = null;
    let geometry: BufferGeometry | null = null;
    let material: ShaderMaterial | null = null;
    let observers: (() => void)[] = [];

    const start = (cloud: Cloud) => {
      if (disposed) return;
      try {
        renderer = new WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setFailed(true);
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
      box.appendChild(canvas);

      const scene = new Scene();
      const camera = new PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0, 4.4);

      geometry = new BufferGeometry();
      geometry.setAttribute('position', new BufferAttribute(cloud.positions, 3));
      geometry.setAttribute('aAlpha', new BufferAttribute(cloud.alphas, 1));
      material = new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        uniforms: { uColor: { value: new Color(INK) }, uSize: { value: 2 } },
        transparent: true,
        depthWrite: false,
      });
      const points = new Points(geometry, material);
      points.rotation.y = kind === 'portrait' ? 0.25 : 0.5;
      scene.add(points);

      const resize = () => {
        const w = box.clientWidth;
        const h = box.clientHeight;
        if (!w || !h) return;
        renderer!.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        material!.uniforms.uSize.value = Math.max(1.4, h / (kind === 'portrait' ? 230 : 300)) * dpr;
        if (reduced) renderer!.render(scene, camera);
      };
      resize();

      // interaction
      let hover = false;
      let dragging = false;
      let lastX = 0;
      let vel = 0; // extra rad/s from drag release
      let speed = IDLE_SPEED;

      const onEnter = () => { hover = true; };
      const onLeave = () => { hover = false; };
      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        points.rotation.y += dx * 0.012;
        vel = dx * 0.012 * 60;
      };
      const onUp = (e: PointerEvent) => {
        dragging = false;
        canvas.style.cursor = 'grab';
        if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      };
      if (!reduced) {
        canvas.addEventListener('pointerenter', onEnter);
        canvas.addEventListener('pointerleave', onLeave);
        canvas.addEventListener('pointerdown', onDown);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerup', onUp);
        canvas.addEventListener('pointercancel', onUp);
      } else {
        canvas.style.cursor = 'default';
      }

      // render loop, only while on screen and the tab is visible
      let visible = false;
      let last = 0;
      const frame = (t: number) => {
        raf = 0;
        if (disposed || !visible || document.hidden) return;
        const dt = Math.min(0.05, (t - last) / 1000 || 0.016);
        last = t;
        if (!dragging) {
          const target = hover ? HOVER_SPEED : IDLE_SPEED;
          speed += (target - speed) * Math.min(1, dt * 3);
          vel *= Math.pow(0.04, dt);
          points.rotation.y += (speed + vel) * dt;
        }
        renderer!.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };
      const kick = () => {
        if (reduced) { renderer!.render(scene, camera); return; }
        if (!raf && visible && !document.hidden) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      };

      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }, { threshold: 0 });
      io.observe(box);
      const ro = new ResizeObserver(resize);
      ro.observe(box);
      document.addEventListener('visibilitychange', kick);

      observers = [
        () => io.disconnect(),
        () => ro.disconnect(),
        () => document.removeEventListener('visibilitychange', kick),
        () => {
          canvas.removeEventListener('pointerenter', onEnter);
          canvas.removeEventListener('pointerleave', onLeave);
          canvas.removeEventListener('pointerdown', onDown);
          canvas.removeEventListener('pointermove', onMove);
          canvas.removeEventListener('pointerup', onUp);
          canvas.removeEventListener('pointercancel', onUp);
        },
      ];
    };

    if (kind === 'figure') {
      start(cloudFromFigure(variant));
    } else if (src) {
      const img = new Image();
      img.onload = () => start(cloudFromImage(img));
      img.onerror = () => !disposed && setFailed(true);
      img.src = src;
    }

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      observers.forEach((f) => f());
      geometry?.dispose();
      material?.dispose();
      if (renderer) {
        renderer.domElement.remove();
        renderer.dispose();
      }
    };
  }, [kind, src, variant, reduced, staticPortrait]);

  return (
    <div
      ref={boxRef}
      role="img"
      aria-label={alt}
      className={`relative w-full ${aspectClass} ${className}`}
    >
      {(staticPortrait || (failed && kind === 'portrait')) && src && (
        <img src={src} alt="" className="absolute inset-0 w-full h-full object-contain" />
      )}
    </div>
  );
};
