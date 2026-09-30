import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  type: 'terrain' | 'structure' | 'accent';
}

export const PointCloudViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotYRef = useRef<number>(0.3);
  const pitchRef = useRef<number>(0.35);
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: 0,
    y: 0,
    isInside: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isReducedMotion = false;
    if (typeof window !== 'undefined') {
      isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Generate Point Cloud: Terrain plane + Architectural monolithic volume
    const points: Point3D[] = [];

    // 1. Terrain surface point grid (sloped ground)
    const T_RES = 18;
    for (let i = -T_RES; i <= T_RES; i += 2) {
      for (let j = -T_RES; j <= T_RES; j += 2) {
        const x = i * 8;
        const z = j * 8;
        // Natural slope drop
        const y = (x * 0.25 + z * 0.15) + Math.sin(x * 0.05) * 6 + 45;
        points.push({ x, y, z, type: 'terrain' });
      }
    }

    // 2. Monolithic building structure points
    // Roof slab points
    for (let x = -70; x <= 70; x += 10) {
      for (let z = -50; z <= 50; z += 10) {
        points.push({ x, y: -40, z, type: 'structure' });
      }
    }

    // Cantilever overhanging edge (accent points in orange)
    for (let x = -85; x <= 85; x += 8) {
      points.push({ x, y: -42, z: 54, type: 'accent' });
      points.push({ x, y: -42, z: -54, type: 'accent' });
    }

    // Columns & vertical perimeter points
    [-60, 0, 60].forEach((colX) => {
      [-40, 40].forEach((colZ) => {
        for (let y = -40; y <= 35; y += 6) {
          points.push({ x: colX, y, z: colZ, type: 'structure' });
        }
      });
    });

    // Interior walls & floor slab
    for (let x = -60; x <= 60; x += 12) {
      for (let z = -40; z <= 40; z += 12) {
        points.push({ x, y: 15, z, type: 'structure' });
      }
    }

    let lastTime = performance.now();
    let animId: number;

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!isReducedMotion) {
        rotYRef.current += dt * 0.14; // smooth slow rotation
      }

      if (mouseRef.current.isInside) {
        const targetPitch = 0.35 + (mouseRef.current.y - 0.5) * 0.3;
        pitchRef.current += (targetPitch - pitchRef.current) * 0.05;
      }

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) / 300;

      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);
      const cosX = Math.cos(pitchRef.current);
      const sinX = Math.sin(pitchRef.current);

      // Render points with depth sorting / alpha fading
      points.forEach((pt) => {
        // Rotate around Y
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate around X (pitch)
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        const fov = 750;
        const pScale = fov / (fov + z2);

        const scrX = centerX + x1 * scale * pScale;
        const scrY = centerY + y2 * scale * pScale;

        // Distance alpha
        const depthAlpha = Math.max(0.15, Math.min(1, (z2 + 200) / 400));

        if (pt.type === 'accent') {
          ctx.fillStyle = '#FF4D00';
          ctx.fillRect(scrX - 1.5, scrY - 1.5, 3, 3);
        } else if (pt.type === 'structure') {
          ctx.fillStyle = `rgba(14, 14, 14, ${0.85 * depthAlpha})`;
          ctx.fillRect(scrX - 1, scrY - 1, 2, 2);
        } else {
          ctx.fillStyle = `rgba(14, 14, 14, ${0.35 * depthAlpha})`;
          ctx.fillRect(scrX - 0.75, scrY - 0.75, 1.5, 1.5);
        }
      });

      // Axis crosshairs in center
      ctx.strokeStyle = 'rgba(255, 77, 0, 0.4)';
      ctx.lineWidth = 0.75;
      ctx.setLineDash([1, 3]);
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY);
      ctx.lineTo(centerX + 20, centerY);
      ctx.moveTo(centerX, centerY - 20);
      ctx.lineTo(centerX, centerY + 20);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      isInside: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isInside = false;
  };

  return (
    <div
      className="relative w-full h-[300px] sm:h-[360px] bg-[#0E0E0E]/[0.02] border border-hairline overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        mouseRef.current.isInside = true;
      }}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Point Cloud Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Faint Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />

      {/* Top Header Tag */}
      <div className="absolute top-2 left-2 flex items-center gap-2 font-mono text-[9px] text-[#0E0E0E]/70 pointer-events-none">
        <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
        <span className="font-semibold text-[#0E0E0E]">POINT CLOUD FEDERATION</span>
        <span className="text-[#0E0E0E]/30">|</span>
        <span>PTS: 840 · LIDAR BIM</span>
      </div>

      <div className="absolute top-2 right-2 font-mono text-[9px] text-[#0E0E0E]/50 pointer-events-none text-right">
        <span>ISO-VIEW / ROT: 360°</span>
      </div>

      {/* Bottom Footer Annotation */}
      <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#0E0E0E]/50 pointer-events-none flex items-center gap-1.5">
        <span className="text-[#FF4D00]">▲</span>
        <span>FARO FOCUS 3D RESOLUTION</span>
      </div>

      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#0E0E0E]/50 pointer-events-none text-right">
        <span>TOLERANCE ±0.5MM</span>
      </div>
    </div>
  );
};
