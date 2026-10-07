import React, { useEffect, useRef, useState } from 'react';
import { ACCENT } from '../theme';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  p1: number;
  p2: number;
  type?: 'solid' | 'dashed' | 'accent' | 'dimension';
}

export const WireframeVolume: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0.4);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotAngleRef = useRef(0.4);
  const elevationAngleRef = useRef(0.42); // ~24 degrees axonometric pitch
  const animFrameRef = useRef<number | null>(null);

  // Modernist architectural volume: Pavilion geometry (Main volume + Cantilever + Roof canopy + Core)
  const vertices: Point3D[] = [
    // Lower ground plinth (0-3)
    { x: -160, y: 80, z: -100 },
    { x: 160, y: 80, z: -100 },
    { x: 160, y: 80, z: 100 },
    { x: -160, y: 80, z: 100 },

    // Ground gallery ceiling / datum (4-7)
    { x: -160, y: 0, z: -100 },
    { x: 160, y: 0, z: -100 },
    { x: 160, y: 0, z: 100 },
    { x: -160, y: 0, z: 100 },

    // Upper cantilevered residential wing (8-11)
    { x: -120, y: 0, z: -60 },
    { x: 190, y: 0, z: -60 },
    { x: 190, y: -75, z: -60 },
    { x: -120, y: -75, z: -60 },

    // Cantilever front face (12-15)
    { x: -120, y: 0, z: 70 },
    { x: 190, y: 0, z: 70 },
    { x: 190, y: -75, z: 70 },
    { x: -120, y: -75, z: 70 },

    // Cantilever overhanging thin roof plane (16-19)
    { x: -135, y: -80, z: -75 },
    { x: 205, y: -80, z: -75 },
    { x: 205, y: -80, z: 85 },
    { x: -135, y: -80, z: 85 },

    // Vertical structural glass mullions & columns (20-23)
    { x: 0, y: 80, z: 100 },
    { x: 0, y: 0, z: 100 },
    { x: 80, y: 80, z: 100 },
    { x: 80, y: 0, z: 100 },

    // Patio internal void lines (24-27)
    { x: -80, y: 80, z: -20 },
    { x: -20, y: 80, z: -20 },
    { x: -20, y: 80, z: 40 },
    { x: -80, y: 80, z: 40 }
  ];

  const edges: Edge[] = [
    // Plinth
    { p1: 0, p2: 1, type: 'solid' },
    { p1: 1, p2: 2, type: 'solid' },
    { p1: 2, p2: 3, type: 'solid' },
    { p1: 3, p2: 0, type: 'solid' },

    // Ground gallery box
    { p1: 4, p2: 5, type: 'solid' },
    { p1: 5, p2: 6, type: 'solid' },
    { p1: 6, p2: 7, type: 'solid' },
    { p1: 7, p2: 4, type: 'solid' },
    { p1: 0, p2: 4, type: 'solid' },
    { p1: 1, p2: 5, type: 'solid' },
    { p1: 2, p2: 6, type: 'solid' },
    { p1: 3, p2: 7, type: 'solid' },

    // Cantilevered volume
    { p1: 8, p2: 9, type: 'dashed' },
    { p1: 9, p2: 10, type: 'solid' },
    { p1: 10, p2: 11, type: 'solid' },
    { p1: 11, p2: 8, type: 'dashed' },

    { p1: 12, p2: 13, type: 'solid' },
    { p1: 13, p2: 14, type: 'solid' },
    { p1: 14, p2: 15, type: 'solid' },
    { p1: 15, p2: 12, type: 'solid' },

    { p1: 8, p2: 12, type: 'dashed' },
    { p1: 9, p2: 13, type: 'solid' },
    { p1: 10, p2: 14, type: 'solid' },
    { p1: 11, p2: 15, type: 'solid' },

    // Floating roof plane
    { p1: 16, p2: 17, type: 'accent' },
    { p1: 17, p2: 18, type: 'accent' },
    { p1: 18, p2: 19, type: 'accent' },
    { p1: 19, p2: 16, type: 'accent' },

    // Columns
    { p1: 20, p2: 21, type: 'dimension' },
    { p1: 22, p2: 23, type: 'dimension' },

    // Internal courtyard
    { p1: 24, p2: 25, type: 'dashed' },
    { p1: 25, p2: 26, type: 'dashed' },
    { p1: 26, p2: 27, type: 'dashed' },
    { p1: 27, p2: 24, type: 'dashed' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isReducedMotion = false;
    if (typeof window !== 'undefined') {
      isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Slow, steady architectural rotation when not dragging
      if (!isDragging && !isReducedMotion) {
        rotAngleRef.current += dt * 0.12; // slow drift
      }

      setRotationAngle(rotAngleRef.current);

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
      const centerY = height / 2 + 10;
      const scale = Math.min(width, height) / 480;

      // 3D rotation math
      const cosY = Math.cos(rotAngleRef.current);
      const sinY = Math.sin(rotAngleRef.current);
      const cosX = Math.cos(elevationAngleRef.current);
      const sinX = Math.sin(elevationAngleRef.current);

      const project = (pt: Point3D) => {
        // Rotate around Y
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate around X (pitch)
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // Axonometric/orthographic projection with slight perspective cue
        const fov = 900;
        const pScale = fov / (fov + z2);

        return {
          x: centerX + x1 * scale * pScale,
          y: centerY + y2 * scale * pScale,
          z: z2
        };
      };

      const projected = vertices.map(project);

      // Draw faint ground shadow grid lines
      ctx.strokeStyle = 'rgba(14, 14, 14, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);

      // Floor plane extents
      const floorPts = [
        project({ x: -240, y: 80, z: -160 }),
        project({ x: 240, y: 80, z: -160 }),
        project({ x: 240, y: 80, z: 160 }),
        project({ x: -240, y: 80, z: 160 })
      ];

      ctx.beginPath();
      ctx.moveTo(floorPts[0].x, floorPts[0].y);
      for (let i = 1; i < floorPts.length; i++) {
        ctx.lineTo(floorPts[i].x, floorPts[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw model edges
      edges.forEach((edge) => {
        const p1 = projected[edge.p1];
        const p2 = projected[edge.p2];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        if (edge.type === 'accent') {
          ctx.strokeStyle = ACCENT;
          ctx.lineWidth = 1.25;
          ctx.setLineDash([]);
        } else if (edge.type === 'dashed') {
          ctx.strokeStyle = 'rgba(14, 14, 14, 0.25)';
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
        } else if (edge.type === 'dimension') {
          ctx.strokeStyle = 'rgba(14, 14, 14, 0.35)';
          ctx.lineWidth = 0.75;
          ctx.setLineDash([1, 2]);
        } else {
          ctx.strokeStyle = 'rgba(14, 14, 14, 0.75)';
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
        }

        ctx.stroke();
      });

      // Draw key vertex crosshair nodes
      [0, 1, 2, 3, 10, 14, 17, 18].forEach((vIdx) => {
        const p = projected[vIdx];
        ctx.fillStyle = vIdx === 18 ? ACCENT : 'rgba(14, 14, 14, 0.6)';
        const size = vIdx === 18 ? 3.5 : 2;
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      });

      // Technical Dimension Callouts in Monospace
      const pOverhang = projected[18];
      const pPlinth = projected[2];
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(14, 14, 14, 0.6)';
      ctx.setLineDash([]);

      // Overhang annotation
      ctx.fillText('+6.80m [ROOF SLAB]', pOverhang.x + 8, pOverhang.y - 4);
      ctx.fillText('±0.00m [DATUM]', pPlinth.x + 8, pPlinth.y + 12);

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    rotAngleRef.current += dx * 0.008;
    elevationAngleRef.current = Math.max(0.15, Math.min(0.85, elevationAngleRef.current + dy * 0.005));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetOrientation = () => {
    rotAngleRef.current = 0.4;
    elevationAngleRef.current = 0.42;
  };

  return (
    <div
      className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="region"
      aria-label="Interactive 3D architectural volume simulation"
    >
      {/* 3D Wireframe Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Drafting Corner Spec Annotations */}
      <div className="absolute top-2 left-2 flex items-center gap-2 text-[10px] font-mono text-[#0E0E0E]/60 pointer-events-none">
        <span className="w-1.5 h-1.5 bg-accent" />
        <span>AXONOMETRIC 4.3</span>
        <span className="text-[#0E0E0E]/30">|</span>
        <span>ROT: {(rotationAngle % (Math.PI * 2)).toFixed(2)} rad</span>
      </div>

      <div className="absolute top-2 right-2 text-[10px] font-mono text-[#0E0E0E]/50 pointer-events-none text-right">
        <div>ORTHO PROJECTION</div>
        <div className="text-[9px] text-[#0E0E0E]/40">SCALE 1:100 @ A1</div>
      </div>

      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#0E0E0E]/50 pointer-events-none flex items-center gap-2">
        <span className="text-accent">■</span>
        <span>DRAG TO ROTATE AXIS</span>
      </div>

      {isHovered && (
        <button
          onClick={resetOrientation}
          className="absolute bottom-2 right-2 px-2 py-0.5 text-[9px] font-mono border border-hairline bg-[#F5F5F2]/90 hover:border-accent hover:text-accent transition-colors"
        >
          RESET VIEW [R]
        </button>
      )}
    </div>
  );
};
