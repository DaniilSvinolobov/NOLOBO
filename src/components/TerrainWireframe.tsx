import React, { useEffect, useRef, useState, useCallback } from 'react';
import { content, Language } from '../content';

export type StageId = 0 | 1 | 2 | 3 | 4;

interface StageConfig {
  id: StageId;
  tabLabel: string;
  stageNum: string;
  stageName: string;
  caption: string;
  pitch: number;
  zoom: number; // camera scale multiplier
}

interface TerrainWireframeProps {
  currentLang?: Language;
}

interface TreeSpec {
  id: string;
  gx: number;
  gz: number;
  scale: number;
  type: 'olive' | 'pine' | 'oak';
  species: string;
}

// 23 surveyed trees on the Serra de Tramuntana site transect
const TREES_DATA: TreeSpec[] = [
  { id: 'T-01', gx: -0.62, gz: -0.32, scale: 1.25, type: 'pine', species: 'Pinus halepensis' },
  { id: 'T-02', gx: -0.48, gz: -0.22, scale: 0.95, type: 'olive', species: 'Olea europaea' },
  { id: 'T-03', gx: -0.56, gz: -0.06, scale: 1.10, type: 'pine', species: 'Pinus halepensis' },
  { id: 'T-04', gx: -0.38, gz: -0.14, scale: 0.85, type: 'olive', species: 'Olea europaea' },
  { id: 'T-05', gx: -0.44, gz: 0.12, scale: 1.15, type: 'olive', species: 'Olea europaea' },
  { id: 'T-06', gx: -0.52, gz: 0.28, scale: 1.05, type: 'pine', species: 'Pinus halepensis' },
  { id: 'T-07', gx: -0.34, gz: 0.34, scale: 0.90, type: 'olive', species: 'Olea europaea' },
  { id: 'T-08', gx: -0.20, gz: 0.42, scale: 0.80, type: 'olive', species: 'Olea europaea' },
  { id: 'T-09', gx: -0.08, gz: 0.46, scale: 0.95, type: 'olive', species: 'Olea europaea' },
  { id: 'T-10', gx: 0.12, gz: 0.44, scale: 0.85, type: 'oak', species: 'Quercus ilex' },
  { id: 'T-11', gx: 0.28, gz: 0.40, scale: 1.05, type: 'olive', species: 'Olea europaea' },
  { id: 'T-12', gx: 0.42, gz: 0.32, scale: 1.10, type: 'pine', species: 'Pinus halepensis' },
  { id: 'T-13', gx: 0.54, gz: 0.22, scale: 1.20, type: 'pine', species: 'Pinus halepensis' },
  { id: 'T-14', gx: 0.48, gz: 0.04, scale: 0.95, type: 'olive', species: 'Olea europaea' },
  { id: 'T-15', gx: 0.58, gz: -0.12, scale: 1.30, type: 'pine', species: 'Pinus halepensis' },
  { id: 'T-16', gx: 0.46, gz: -0.24, scale: 0.90, type: 'oak', species: 'Quercus ilex' },
  { id: 'T-17', gx: 0.52, gz: -0.36, scale: 1.15, type: 'pine', species: 'Pinus halepensis' },
  { id: 'T-18', gx: 0.32, gz: -0.34, scale: 0.85, type: 'olive', species: 'Olea europaea' },
  { id: 'T-19', gx: 0.18, gz: -0.38, scale: 1.00, type: 'olive', species: 'Olea europaea' },
  { id: 'T-20', gx: -0.04, gz: -0.36, scale: 0.90, type: 'olive', species: 'Olea europaea' },
  { id: 'T-21', gx: -0.22, gz: -0.32, scale: 1.05, type: 'oak', species: 'Quercus ilex' },
  { id: 'T-22', gx: -0.36, gz: 0.20, scale: 0.75, type: 'olive', species: 'Olea europaea' },
  { id: 'T-23', gx: 0.36, gz: 0.18, scale: 1.00, type: 'olive', species: 'Olea europaea' },
];

const STAGE_CAMERAS = [
  { pitch: 0.54, zoom: 1.0 },
  { pitch: 0.44, zoom: 1.06 },
  { pitch: 0.36, zoom: 1.12 },
  { pitch: 0.42, zoom: 1.08 },
  { pitch: 0.46, zoom: 0.98 },
] as const;

export const TerrainWireframe: React.FC<TerrainWireframeProps> = ({ currentLang = 'en' }) => {
  const modelContent = content.hero.model;
  const stages: StageConfig[] = [
    {
      id: 0,
      tabLabel: `01 ${modelContent.tabs[0][currentLang]}`,
      stageNum: '01',
      stageName: modelContent.tabs[0][currentLang].toUpperCase(),
      caption: modelContent.captions[0][currentLang],
      pitch: 0.54,
      zoom: 1.0,
    },
    {
      id: 1,
      tabLabel: `02 ${modelContent.tabs[1][currentLang]}`,
      stageNum: '02',
      stageName: modelContent.tabs[1][currentLang].toUpperCase(),
      caption: modelContent.captions[1][currentLang],
      pitch: 0.44,
      zoom: 1.06,
    },
    {
      id: 2,
      tabLabel: `03 ${modelContent.tabs[2][currentLang]}`,
      stageNum: '03',
      stageName: modelContent.tabs[2][currentLang].toUpperCase(),
      caption: modelContent.captions[2][currentLang],
      pitch: 0.36,
      zoom: 1.12,
    },
    {
      id: 3,
      tabLabel: `04 ${modelContent.tabs[3][currentLang]}`,
      stageNum: '04',
      stageName: modelContent.tabs[3][currentLang].toUpperCase(),
      caption: modelContent.captions[3][currentLang],
      pitch: 0.42,
      zoom: 1.08,
    },
    {
      id: 4,
      tabLabel: `05 ${modelContent.tabs[4][currentLang]}`,
      stageNum: '05',
      stageName: modelContent.tabs[4][currentLang].toUpperCase(),
      caption: modelContent.captions[4][currentLang],
      pitch: 0.46,
      zoom: 0.98,
    },
  ];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Active Stage
  const [activeStage, setActiveStage] = useState<StageId>(0);
  const [stageProgress, setStageProgress] = useState<number>(0); // 0 to 1 for top tab progress line
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(true);

  // Stage 05 Evolve Year Slider: 0, 5, 20, 50 years
  const [evolveYear, setEvolveYear] = useState<number>(20);

  // Smooth Stage Interpolation
  const stageTargetRef = useRef<number>(0);
  const stageAnimRef = useRef<number>(0);
  const stageTimerRef = useRef<number>(0);
  const isInteractingRef = useRef<boolean>(false);

  // Camera Orbit & Navigation State
  const camRef = useRef<{
    orbitAngle: number;
    userAngleOffset: number;
    pitch: number;
    targetPitch: number;
    zoom: number;
    targetZoom: number;
    velAngle: number;
    velPitch: number;
    cursorYaw: number;
    cursorPitch: number;
    isDragging: boolean;
    lastMouseX: number;
    lastMouseY: number;
  }>({
    orbitAngle: 0.65,
    userAngleOffset: 0,
    pitch: STAGE_CAMERAS[0].pitch,
    targetPitch: STAGE_CAMERAS[0].pitch,
    zoom: STAGE_CAMERAS[0].zoom,
    targetZoom: STAGE_CAMERAS[0].zoom,
    velAngle: 0,
    velPitch: 0,
    cursorYaw: 0,
    cursorPitch: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  const mouseHoverRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: 0.5,
    y: 0.5,
    isInside: false,
  });

  // Topography calculation: Serra de Tramuntana slope toward Mediterranean Sea
  const getNaturalHeight = useCallback((normX: number, normZ: number): number => {
    if (normZ > 0.62) return 0; // Flat sea plane

    const slopeFactor = Math.pow((0.62 - normZ) / 1.62, 1.25) * 96;
    const ridgeDist = normX + 0.46;
    const ridge = Math.exp(-ridgeDist * ridgeDist * 4.2) * 36;
    const valley = Math.sin((normX - 0.2) * 2.5) * 8;

    const rawHeight = slopeFactor + ridge + valley;
    const step = 8.5;
    const stepped = Math.floor(rawHeight / step) * step;
    const blend = (rawHeight % step) / step;
    return Math.max(0, stepped + Math.pow(blend, 3.2) * step);
  }, []);

  // Footprint of house
  const isHouseFootprint = useCallback((normX: number, normZ: number): boolean => {
    return normX >= -0.22 && normX <= 0.26 && normZ >= -0.16 && normZ <= 0.22;
  }, []);

  // Excavated height for Ground & Build stages
  const getExcavatedHeight = useCallback((normX: number, normZ: number, natH: number, groundFactor: number): number => {
    if (!isHouseFootprint(normX, normZ) || groundFactor <= 0.01) {
      return natH;
    }
    const targetH = 28.0; // Foundation datum
    if (natH > targetH) {
      return natH - (natH - targetH) * groundFactor;
    }
    return natH;
  }, [isHouseFootprint]);

  // Stage Switch Handler
  const goToStage = (s: StageId) => {
    setActiveStage(s);
    stageTargetRef.current = s;
    stageTimerRef.current = 0;
    setStageProgress(0);

    camRef.current.targetPitch = STAGE_CAMERAS[s].pitch;
    camRef.current.targetZoom = STAGE_CAMERAS[s].zoom;
  };

  const prevStage = () => {
    const next = (activeStage <= 0 ? 4 : activeStage - 1) as StageId;
    goToStage(next);
  };

  const nextStage = () => {
    const next = (activeStage >= 4 ? 0 : activeStage + 1) as StageId;
    goToStage(next);
  };

  // Main 3D Canvas Render Loop
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
    let animId: number;

    const GRID_COLS = 36;
    const GRID_ROWS = 36;
    const WORLD_SIZE = 360;
    const STAGE_DURATION = 8.5; // 8.5 seconds per stage in auto-cycle

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // 1. Auto-Cycle Timer (pauses when user hovers or drags)
      if (!isPaused && !isInteractingRef.current) {
        stageTimerRef.current += dt;
        const prog = Math.min(1, stageTimerRef.current / STAGE_DURATION);
        setStageProgress(prog);

        if (stageTimerRef.current >= STAGE_DURATION) {
          stageTimerRef.current = 0;
          setActiveStage((prev) => {
            const next = ((prev + 1) % 5) as StageId;
            stageTargetRef.current = next;
            camRef.current.targetPitch = STAGE_CAMERAS[next].pitch;
            camRef.current.targetZoom = STAGE_CAMERAS[next].zoom;
            return next;
          });
        }
      }

      // 2. Smooth Stage Morphing (cubic-bezier-like interpolation)
      const stageDiff = stageTargetRef.current - stageAnimRef.current;
      stageAnimRef.current += stageDiff * Math.min(1, dt * 2.8);
      const curStageAnim = stageAnimRef.current;

      // Stage weights (0 to 1) for blending features
      const wScan = Math.max(0, 1 - Math.abs(curStageAnim - 0) * 1.15);
      const wFit = Math.max(0, 1 - Math.abs(curStageAnim - 1) * 1.15);
      const wGround = Math.max(0, 1 - Math.abs(curStageAnim - 2) * 1.15);
      const wBuild = Math.max(0, 1 - Math.abs(curStageAnim - 3) * 1.15);
      const wEvolve = Math.max(0, 1 - Math.abs(curStageAnim - 4) * 1.15);

      // Cumulative factors
      const groundFactor = Math.max(0, Math.min(1, (curStageAnim - 1.2) * 1.25));
      const buildFactor = Math.max(0, Math.min(1, (curStageAnim - 2.2) * 1.25));
      const evolveFactor = Math.max(0, Math.min(1, (curStageAnim - 3.2) * 1.25));

      // 3. Camera Orbit & Motion
      const cam = camRef.current;

      if (!cam.isDragging) {
        // Continuous smooth camera orbit around the 3D model
        if (isOrbiting && !isReducedMotion) {
          // Slow, elegant 360-degree orbit (around 52 seconds per full revolution)
          cam.orbitAngle += dt * 0.12;
        }

        // Smoothly guide pitch and zoom to the stage target
        cam.pitch += (cam.targetPitch - cam.pitch) * 0.05 + cam.velPitch;
        cam.zoom += (cam.targetZoom - cam.zoom) * 0.05;
        cam.userAngleOffset += cam.velAngle;
      } else {
        cam.userAngleOffset += cam.velAngle;
        cam.pitch += cam.velPitch;
      }

      // Damping on user drag momentum
      cam.velAngle *= 0.90;
      cam.velPitch *= 0.90;

      // Cursor parallax
      const targetCursorYaw = (mouseHoverRef.current.x - 0.5) * 0.28;
      const targetCursorPitch = (mouseHoverRef.current.y - 0.5) * 0.15;
      cam.cursorYaw += (targetCursorYaw - cam.cursorYaw) * 0.06;
      cam.cursorPitch += (targetCursorPitch - cam.cursorPitch) * 0.06;

      const effectiveRotY = cam.orbitAngle + cam.userAngleOffset + cam.cursorYaw;
      const effectivePitch = Math.max(0.18, Math.min(0.85, cam.pitch + cam.cursorPitch));

      // 4. Canvas Sizing & Projection
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
      const centerY = height / 2 + 14;
      const scale = (Math.min(width, height) / 380) * cam.zoom;

      const cosY = Math.cos(effectiveRotY);
      const sinY = Math.sin(effectiveRotY);
      const cosX = Math.cos(effectivePitch);
      const sinX = Math.sin(effectivePitch);

      const project = (x: number, y: number, z: number) => {
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const yWorld = -y;
        const y2 = yWorld * cosX - z1 * sinX;
        const z2 = yWorld * sinX + z1 * cosX;
        const fov = 1050;
        const pScale = fov / (fov + z2);

        return {
          x: centerX + x1 * scale * pScale,
          y: centerY + y2 * scale * pScale,
          z: z2,
        };
      };

      // -------------------------------------------------------------
      // 5. SEA PLANE AT COASTLINE (normZ = 0.62 to 1.0)
      // -------------------------------------------------------------
      const seaZ1 = 0.62 * (WORLD_SIZE / 2);
      const seaZ2 = WORLD_SIZE / 2;
      const seaP1 = project(-WORLD_SIZE / 2, 0, seaZ1);
      const seaP2 = project(WORLD_SIZE / 2, 0, seaZ1);
      const seaP3 = project(WORLD_SIZE / 2, 0, seaZ2);
      const seaP4 = project(-WORLD_SIZE / 2, 0, seaZ2);

      // Sea subtle wash
      ctx.beginPath();
      ctx.fillStyle = 'rgba(14, 14, 14, 0.025)';
      ctx.moveTo(seaP1.x, seaP1.y);
      ctx.lineTo(seaP2.x, seaP2.y);
      ctx.lineTo(seaP3.x, seaP3.y);
      ctx.lineTo(seaP4.x, seaP4.y);
      ctx.closePath();
      ctx.fill();

      // Sea border
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(14, 14, 14, 0.20)';
      ctx.lineWidth = 0.8;
      ctx.moveTo(seaP1.x, seaP1.y);
      ctx.lineTo(seaP2.x, seaP2.y);
      ctx.lineTo(seaP3.x, seaP3.y);
      ctx.lineTo(seaP4.x, seaP4.y);
      ctx.closePath();
      ctx.stroke();

      // Calm sea wash lines
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = 'rgba(14, 14, 14, 0.07)';
      for (let s = 0.70; s <= 0.94; s += 0.08) {
        const w1 = project(-WORLD_SIZE / 2 + 18, 0, s * (WORLD_SIZE / 2));
        const w2 = project(WORLD_SIZE / 2 - 18, 0, s * (WORLD_SIZE / 2));
        ctx.beginPath();
        ctx.moveTo(w1.x, w1.y);
        ctx.lineTo(w2.x, w2.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // -------------------------------------------------------------
      // 6. PROCEDURAL TERRAIN MESH
      // -------------------------------------------------------------
      const gridPoints: { x: number; y: number; z: number; elev: number; natElev: number }[][] = [];

      for (let r = 0; r <= GRID_ROWS; r++) {
        gridPoints[r] = [];
        const normZ = (r / GRID_ROWS) * 2 - 1;
        const worldZ = normZ * (WORLD_SIZE / 2);

        for (let c = 0; c <= GRID_COLS; c++) {
          const normX = (c / GRID_COLS) * 2 - 1;
          const worldX = normX * (WORLD_SIZE / 2);

          const natH = getNaturalHeight(normX, normZ);
          const curH = getExcavatedHeight(normX, normZ, natH, groundFactor);
          const pt = project(worldX, curH, worldZ);
          gridPoints[r][c] = { ...pt, elev: curH, natElev: natH };
        }
      }

      // Draw fine grey terrain lines
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(14, 14, 14, 0.16)';
      ctx.lineWidth = 0.65;

      // Z-contour isolines
      for (let r = 0; r <= GRID_ROWS; r++) {
        const normZ = (r / GRID_ROWS) * 2 - 1;
        if (normZ > 0.62) continue;

        const isMajorContour = r % 4 === 0;
        if (isMajorContour) {
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(14, 14, 14, 0.32)';
          ctx.lineWidth = 0.85;
        }

        ctx.moveTo(gridPoints[r][0].x, gridPoints[r][0].y);
        for (let c = 1; c <= GRID_COLS; c++) {
          const normX = (c / GRID_COLS) * 2 - 1;
          if (buildFactor > 0.7 && isHouseFootprint(normX, normZ)) {
            ctx.moveTo(gridPoints[r][c].x, gridPoints[r][c].y);
          } else {
            ctx.lineTo(gridPoints[r][c].x, gridPoints[r][c].y);
          }
        }

        if (isMajorContour) {
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(14, 14, 14, 0.16)';
          ctx.lineWidth = 0.65;
        }
      }

      // Fall-lines (orthogonal to contour)
      for (let c = 0; c <= GRID_COLS; c += 2) {
        ctx.moveTo(gridPoints[0][c].x, gridPoints[0][c].y);
        for (let r = 1; r <= GRID_ROWS; r++) {
          const normZ = (r / GRID_ROWS) * 2 - 1;
          const normX = (c / GRID_COLS) * 2 - 1;
          if (normZ > 0.62) break;

          if (buildFactor > 0.7 && isHouseFootprint(normX, normZ)) {
            ctx.moveTo(gridPoints[r][c].x, gridPoints[r][c].y);
          } else {
            ctx.lineTo(gridPoints[r][c].x, gridPoints[r][c].y);
          }
        }
      }
      ctx.stroke();

      // -------------------------------------------------------------
      // 7. STAGE 01: SCAN (Year Simulation, Sun Arc, Flowing Wind)
      // -------------------------------------------------------------
      if (wScan > 0.05) {
        ctx.save();
        ctx.globalAlpha = wScan;

        // Simulated year sun-path arc and sweeping shadow
        const scanCycle = (time * 0.00035) % 1;
        const sunAngle = (scanCycle - 0.5) * Math.PI * 0.85;
        const sunX = Math.sin(sunAngle) * (WORLD_SIZE * 0.45);
        const sunY = Math.cos(sunAngle) * 78 + 36;
        const sunZ = -Math.cos(sunAngle) * (WORLD_SIZE * 0.28);
        const sunPt = project(sunX, sunY, sunZ);

        // Sun-path golden/orange arc
        ctx.beginPath();
        ctx.strokeStyle = '#FF4D00';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 4]);
        for (let a = -0.85; a <= 0.85; a += 0.06) {
          const ang = a * Math.PI * 0.42;
          const sx = Math.sin(ang) * (WORLD_SIZE * 0.45);
          const sy = Math.cos(ang) * 78 + 36;
          const sz = -Math.cos(ang) * (WORLD_SIZE * 0.28);
          const p = project(sx, sy, sz);
          if (a === -0.85) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Active sun disk
        ctx.beginPath();
        ctx.fillStyle = '#FF4D00';
        ctx.arc(sunPt.x, sunPt.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Sweeping hill shadow tone
        const shadowP1 = project(-60, getNaturalHeight(-0.3, -0.1), -0.1 * (WORLD_SIZE / 2));
        const shadowP2 = project(30, getNaturalHeight(0.15, 0.2), 0.2 * (WORLD_SIZE / 2));
        const shadowP3 = project(80, getNaturalHeight(0.4, 0.3), 0.3 * (WORLD_SIZE / 2));
        const shadowP4 = project(-20, getNaturalHeight(-0.1, 0.0), 0.0);

        ctx.beginPath();
        ctx.fillStyle = 'rgba(14, 14, 14, 0.04)';
        ctx.moveTo(shadowP1.x, shadowP1.y);
        ctx.lineTo(shadowP2.x, shadowP2.y);
        ctx.lineTo(shadowP3.x, shadowP3.y);
        ctx.lineTo(shadowP4.x, shadowP4.y);
        ctx.closePath();
        ctx.fill();

        // Flowing wind streamlines up slope
        ctx.strokeStyle = '#0E0E0E';
        ctx.lineWidth = 0.85;
        const windDashOffset = -(time * 0.04) % 16;
        ctx.setLineDash([4, 6]);
        ctx.lineDashOffset = windDashOffset;

        for (let bx = -70; bx <= 70; bx += 35) {
          const w1 = project(bx, 0, 0.72 * (WORLD_SIZE / 2));
          const w2 = project(bx + 12, 24, 0.22 * (WORLD_SIZE / 2));
          const w3 = project(bx + 24, 56, -0.28 * (WORLD_SIZE / 2));
          ctx.beginPath();
          ctx.moveTo(w1.x, w1.y);
          ctx.quadraticCurveTo(w2.x, w2.y, w3.x, w3.y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.lineDashOffset = 0;

        // Label on sun
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = '#0E0E0E';
        const dayMinutes = Math.floor((6 + scanCycle * 14) * 60);
        const clock = `${String(Math.floor(dayMinutes / 60)).padStart(2, '0')}:${String(dayMinutes % 60).padStart(2, '0')}`;
        ctx.fillText(`SUN · ${clock}`, sunPt.x + 8, sunPt.y - 2);

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 8. STAGE 02: FIT (Heatmap, Candidate Volumes, Priority HUD)
      // -------------------------------------------------------------
      if (wFit > 0.05) {
        ctx.save();
        ctx.globalAlpha = wFit;

        // Heatmap contours around optimal slope pad
        const optCenter = project(0.02 * (WORLD_SIZE / 2), 34, 0.03 * (WORLD_SIZE / 2));

        for (let h = 1; h <= 4; h++) {
          ctx.beginPath();
          ctx.strokeStyle = h === 1 ? '#FF4D00' : 'rgba(255, 77, 0, 0.35)';
          ctx.lineWidth = h === 1 ? 1.2 : 0.8;
          ctx.setLineDash(h === 1 ? [] : [2, 3]);
          ctx.ellipse(optCenter.x, optCenter.y, h * 24, h * 14, 0.15, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.setLineDash([]);

        // Ghosted candidate volumes flickering in and out
        const candidatePositions = [
          { gx: -0.18, gz: -0.08, h: 42 },
          { gx: -0.06, gz: 0.16, h: 26 },
          { gx: 0.14, gz: -0.12, h: 46 },
          { gx: 0.22, gz: 0.10, h: 32 },
          { gx: 0.02, gz: 0.03, h: 34 }, // Optimal
        ];

        candidatePositions.forEach((pos, idx) => {
          const isOptimal = idx === 4;
          const flicker = Math.sin(time * 0.005 + idx * 1.7);
          if (flicker > -0.2 || isOptimal) {
            const wx = pos.gx * (WORLD_SIZE / 2);
            const wz = pos.gz * (WORLD_SIZE / 2);
            const c1 = project(wx - 24, pos.h, wz - 16);
            const c2 = project(wx + 24, pos.h, wz - 16);
            const c3 = project(wx + 24, pos.h, wz + 16);
            const c4 = project(wx - 24, pos.h, wz + 16);

            ctx.beginPath();
            ctx.strokeStyle = isOptimal ? '#FF4D00' : 'rgba(14, 14, 14, 0.25)';
            ctx.lineWidth = isOptimal ? 1.5 : 0.7;
            ctx.setLineDash(isOptimal ? [] : [2, 2]);
            ctx.moveTo(c1.x, c1.y);
            ctx.lineTo(c2.x, c2.y);
            ctx.lineTo(c3.x, c3.y);
            ctx.lineTo(c4.x, c4.y);
            ctx.closePath();
            ctx.stroke();
            ctx.setLineDash([]);

            if (isOptimal) {
              ctx.font = '8px "JetBrains Mono", monospace';
              ctx.fillStyle = '#FF4D00';
              ctx.fillText(modelContent.readouts.fit.chosenLabel[currentLang], c3.x + 6, c3.y + 2);
            }
          }
        });

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 9. STAGE 03: GROUND (Excavation Cut Hatching, Fill, Flow)
      // -------------------------------------------------------------
      const bMinX = -0.22 * (WORLD_SIZE / 2);
      const bMaxX = 0.26 * (WORLD_SIZE / 2);
      const bBackZ = -0.16 * (WORLD_SIZE / 2);
      const bFrontZ = 0.22 * (WORLD_SIZE / 2);

      const livingElev = 28.0; // Cut foundation level
      const terraceElev = 20.0; // Stepped terrace level
      const roofElev = 40.0;

      if (groundFactor > 0.05) {
        ctx.save();
        const gf = groundFactor;

        // Cut foundation perimeter
        const cut1 = project(bMinX, livingElev, bBackZ);
        const cut2 = project(bMaxX, livingElev, bBackZ);
        const cut3 = project(bMaxX, livingElev, bFrontZ);
        const cut4 = project(bMinX, livingElev, bFrontZ);

        // Excavated pad floor
        ctx.beginPath();
        ctx.fillStyle = 'rgba(14, 14, 14, 0.03)';
        ctx.moveTo(cut1.x, cut1.y);
        ctx.lineTo(cut2.x, cut2.y);
        ctx.lineTo(cut3.x, cut3.y);
        ctx.lineTo(cut4.x, cut4.y);
        ctx.closePath();
        ctx.fill();

        // Diagonal hatching for cut volume
        if (wGround > 0.05) {
          ctx.strokeStyle = `rgba(255, 77, 0, ${wGround * 0.55})`;
          ctx.lineWidth = 0.8;
          for (let step = 0; step <= 10; step++) {
            const frac = step / 10;
            const hx1 = bMinX + (bMaxX - bMinX) * frac;
            const pA = project(hx1, livingElev, bBackZ);
            const pB = project(Math.min(bMaxX, hx1 + 22), livingElev, bFrontZ);
            ctx.beginPath();
            ctx.moveTo(pA.x, pA.y);
            ctx.lineTo(pB.x, pB.y);
            ctx.stroke();
          }
        }

        // Stepped dry-stone retaining terrace walls
        const t1 = project(bMinX - 10, terraceElev, bFrontZ);
        const t2 = project(bMaxX + 10, terraceElev, bFrontZ);
        const t3 = project(bMaxX + 10, terraceElev, bFrontZ + 36);
        const t4 = project(bMinX - 10, terraceElev, bFrontZ + 36);

        // Fill tone under stepped terrace
        ctx.beginPath();
        ctx.fillStyle = `rgba(14, 14, 14, ${gf * 0.04})`;
        ctx.moveTo(t1.x, t1.y);
        ctx.lineTo(t2.x, t2.y);
        ctx.lineTo(t3.x, t3.y);
        ctx.lineTo(t4.x, t4.y);
        ctx.closePath();
        ctx.fill();

        // Solid retaining wall perimeter (Pedra en sec)
        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 14, 14, ${gf * 0.9})`;
        ctx.lineWidth = 1.6;
        ctx.moveTo(t1.x, t1.y);
        ctx.lineTo(t2.x, t2.y);
        ctx.lineTo(t3.x, t3.y);
        ctx.lineTo(t4.x, t4.y);
        ctx.closePath();
        ctx.stroke();

        // Horizontal stonework courses
        ctx.beginPath();
        ctx.strokeStyle = `rgba(14, 14, 14, ${gf * 0.4})`;
        ctx.lineWidth = 0.7;
        for (let k = 0.3; k <= 0.7; k += 0.35) {
          const cy = terraceElev - 6 * k;
          const s1 = project(bMinX - 10, cy, bFrontZ + 36);
          const s2 = project(bMaxX + 10, cy, bFrontZ + 36);
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
        }
        ctx.stroke();

        // Flow of excavated material to retaining wall
        if (wGround > 0.1) {
          ctx.strokeStyle = '#FF4D00';
          ctx.lineWidth = 1.1;
          const flowDash = -(time * 0.03) % 12;
          ctx.setLineDash([3, 4]);
          ctx.lineDashOffset = flowDash;

          const flow1 = project(0, livingElev, bFrontZ - 10);
          const flow2 = project(0, terraceElev, bFrontZ + 30);
          ctx.beginPath();
          ctx.moveTo(flow1.x, flow1.y);
          ctx.lineTo(flow2.x, flow2.y);
          ctx.stroke();

          ctx.setLineDash([]);
          ctx.lineDashOffset = 0;

          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = '#FF4D00';
          ctx.fillText(modelContent.readouts.ground.materialFlow[currentLang], flow2.x + 8, flow2.y);
        }

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 10. STAGE 04: BUILD (Assembly by Components & Sourcing Radar)
      // -------------------------------------------------------------
      if (buildFactor > 0.05) {
        ctx.save();
        const bf = buildFactor;

        // Assembly coordinates
        const r1 = project(bMinX, roofElev, bBackZ);
        const r2 = project(bMaxX, roofElev, bBackZ);
        const r3 = project(bMaxX, roofElev, bFrontZ);
        const r4 = project(bMinX, roofElev, bFrontZ);

        const b1 = project(bMinX, livingElev, bBackZ);
        const b2 = project(bMaxX, livingElev, bBackZ);
        const b3 = project(bMaxX, livingElev, bFrontZ);
        const b4 = project(bMinX, livingElev, bFrontZ);

        // A. Structural Plinth & Walls (Solid dark lines)
        ctx.beginPath();
        ctx.strokeStyle = '#0E0E0E';
        ctx.lineWidth = 1.8;
        ctx.moveTo(b4.x, b4.y);
        ctx.lineTo(b3.x, b3.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.stroke();

        // B. Vertical Glazing Mullions
        ctx.beginPath();
        ctx.strokeStyle = '#0E0E0E';
        ctx.lineWidth = 1.4;
        ctx.moveTo(r3.x, r3.y);
        ctx.lineTo(b3.x, b3.y);
        ctx.moveTo(r4.x, r4.y);
        ctx.lineTo(b4.x, b4.y);
        ctx.moveTo(r2.x, r2.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.stroke();

        // Intermediate mullions
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(14, 14, 14, 0.4)';
        ctx.lineWidth = 0.8;
        for (let m = 0.25; m <= 0.75; m += 0.25) {
          const gx = bMinX + (bMaxX - bMinX) * m;
          const gTop = project(gx, roofElev, bFrontZ);
          const gBot = project(gx, livingElev, bFrontZ);
          ctx.moveTo(gTop.x, gTop.y);
          ctx.lineTo(gBot.x, gBot.y);
        }
        ctx.stroke();

        // C. Continuous Green Roof Slab
        ctx.beginPath();
        ctx.strokeStyle = '#0E0E0E';
        ctx.lineWidth = 2.0;
        ctx.moveTo(r1.x, r1.y);
        ctx.lineTo(r2.x, r2.y);
        ctx.lineTo(r3.x, r3.y);
        ctx.lineTo(r4.x, r4.y);
        ctx.closePath();
        ctx.stroke();

        // Roof soil planting hatching
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(14, 14, 14, 0.25)';
        ctx.lineWidth = 0.7;
        for (let k = 0.15; k <= 0.85; k += 0.15) {
          const rx = bMinX + (bMaxX - bMinX) * k;
          const pA = project(rx, roofElev, bBackZ);
          const pB = project(rx, roofElev, bFrontZ);
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
        }
        ctx.stroke();

        // Cantilever shadow accent line
        ctx.beginPath();
        ctx.strokeStyle = '#FF4D00';
        ctx.lineWidth = 1.3;
        ctx.moveTo(r4.x, r4.y + 1);
        ctx.lineTo(r3.x, r3.y + 1);
        ctx.stroke();

        // Sourcing radius rings on terrain during Stage 04
        if (wBuild > 0.05) {
          ctx.save();
          ctx.globalAlpha = wBuild;

          const ringRadii = [55, 90, 125, 160];
          const siteRef = project(0, 30, 0);

          modelContent.readouts.build.rings.forEach((ring, rIdx) => {
            const r = ringRadii[rIdx] || 60;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 77, 0, 0.4)';
            ctx.lineWidth = 0.8;
            ctx.setLineDash([2, 4]);
            ctx.ellipse(siteRef.x, siteRef.y, r, r * 0.48, 0.2, 0, Math.PI * 2);
            ctx.stroke();

            ctx.font = '7px "JetBrains Mono", monospace';
            ctx.fillStyle = '#FF4D00';
            ctx.fillText(`${ring.km} · ${ring.label[currentLang].toUpperCase()}`, siteRef.x + r * 0.85, siteRef.y - r * 0.2);
          });
          ctx.setLineDash([]);

          // Component ID tags
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillStyle = '#0E0E0E';
          ctx.fillText(modelContent.readouts.build.plinthTag[currentLang], b3.x + 8, b3.y + 2);
          ctx.fillText(modelContent.readouts.build.roofTag[currentLang], r1.x - 90, r1.y - 4);
          ctx.fillText(modelContent.readouts.build.glazingTag[currentLang], r4.x - 110, (r4.y + b4.y) / 2);

          ctx.restore();
        }

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 11. STAGE 05: EVOLVE (Time Slider: 0/5/20/50y, Green Roof, Sensors)
      // -------------------------------------------------------------
      const growthMult = 0.8 + (evolveYear / 50) * 0.9;
      const roofMeltMult = (evolveYear / 50);

      if (wEvolve > 0.05) {
        ctx.save();
        ctx.globalAlpha = wEvolve;

        // Green roof plant sprawl extending over slab into slope
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(14, 14, 14, 0.5)';
        ctx.lineWidth = 1.0;
        ctx.setLineDash([2, 3]);

        for (let sp = 0; sp <= 6; sp++) {
          const sprX = bMinX - (sp * 4 * roofMeltMult);
          const pS = project(sprX, roofElev - sp * 1.2, bBackZ + sp * 8);
          ctx.arc(pS.x, pS.y, 3 * growthMult, 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Active Telemetry Sensor Nodes (blinking green/orange nodes)
        const sensors = [
          { label: modelContent.readouts.evolve.sensorMoisture[currentLang], gx: -0.15, gz: -0.05, h: roofElev },
          { label: modelContent.readouts.evolve.sensorFlux[currentLang], gx: 0.18, gz: 0.05, h: roofElev },
          { label: modelContent.readouts.evolve.sensorCistern[currentLang], gx: 0.12, gz: 0.28, h: terraceElev },
        ];

        sensors.forEach((s) => {
          const spPt = project(s.gx * (WORLD_SIZE / 2), s.h, s.gz * (WORLD_SIZE / 2));
          const blink = (Math.sin(time * 0.006 + s.gx * 10) + 1) / 2;

          ctx.beginPath();
          ctx.fillStyle = '#FF4D00';
          ctx.arc(spPt.x, spPt.y, 2.5 + blink * 1.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.strokeStyle = '#FF4D00';
          ctx.lineWidth = 0.6;
          ctx.moveTo(spPt.x, spPt.y);
          ctx.lineTo(spPt.x + 14, spPt.y - 8);
          ctx.lineTo(spPt.x + 36, spPt.y - 8);
          ctx.stroke();

          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.fillStyle = '#0E0E0E';
          ctx.fillText(s.label, spPt.x + 40, spPt.y - 6);
        });

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 12. 23 SURVEYED TREES (Landscape Plan Symbols & Dynamic ID Tags)
      // -------------------------------------------------------------
      TREES_DATA.forEach((tree, idx) => {
        const worldX = tree.gx * (WORLD_SIZE / 2);
        const worldZ = tree.gz * (WORLD_SIZE / 2);
        const natH = getNaturalHeight(tree.gx, tree.gz);
        const elev = getExcavatedHeight(tree.gx, tree.gz, natH, groundFactor);
        const base = project(worldX, elev, worldZ);

        // Effective scale accounts for year evolution in Stage 05
        const curScale = tree.scale * (wEvolve > 0.05 ? growthMult : 1.0);
        const trunkH = (tree.type === 'pine' ? 14 : 9) * curScale;
        const crownR = (tree.type === 'pine' ? 7.5 : 6) * curScale;
        const trunkTop = project(worldX, elev + trunkH, worldZ);

        // Trunk line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(14, 14, 14, 0.65)';
        ctx.lineWidth = 0.9;
        ctx.moveTo(base.x, base.y);
        ctx.lineTo(trunkTop.x, trunkTop.y);
        ctx.stroke();

        // Center crosshair marker (+) like professional landscape plans
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(14, 14, 14, 0.45)';
        ctx.lineWidth = 0.6;
        ctx.moveTo(trunkTop.x - 2.5, trunkTop.y);
        ctx.lineTo(trunkTop.x + 2.5, trunkTop.y);
        ctx.moveTo(trunkTop.x, trunkTop.y - 2.5);
        ctx.lineTo(trunkTop.x, trunkTop.y + 2.5);
        ctx.stroke();

        // Landscape plan symbol: Dashed perimeter canopy ring
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(14, 14, 14, 0.45)';
        ctx.lineWidth = 0.75;
        ctx.setLineDash([2, 2]);
        ctx.arc(trunkTop.x, trunkTop.y - crownR * 0.3, crownR, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Stage 02: Root Protection Zone (RPZ) circles around trees near footprint
        if (wFit > 0.1 && (idx === 6 || idx === 7 || idx === 21)) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 77, 0, 0.7)';
          ctx.lineWidth = 0.9;
          ctx.setLineDash([1.5, 2]);
          ctx.ellipse(base.x, base.y, crownR * 1.5, crownR * 0.75, 0.1, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.font = '6.5px "JetBrains Mono", monospace';
          ctx.fillStyle = '#FF4D00';
          ctx.fillText('RPZ BUFFER', base.x - 14, base.y + 9);
        }

        // In Stage 05 Evolve, extra mature canopy rings
        if (wEvolve > 0.1 && evolveYear >= 20) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(14, 14, 14, 0.25)';
          ctx.lineWidth = 0.6;
          ctx.arc(trunkTop.x, trunkTop.y - crownR * 0.3, crownR * 1.35, 0, Math.PI * 2);
          ctx.stroke();
        }

        // DYNAMIC TREE ID TAGS (T-01, T-02...) APPEARING BASED ON ACTIVE STAGE:
        // - In Stage 01 (Scan): All 23 trees are surveyed with active tags & leader lines
        // - In Stage 02 (Fit): Trees display protection verification ("T-XX KEPT")
        // - In Stage 03-04: Discrete key tree tags
        // - In Stage 05 (Evolve): Mature canopy tags
        const showAllTagsInScan = wScan > 0.15;
        const isPreservedTagInFit = wFit > 0.15 && (idx % 2 === 0);
        const isKeyTag = idx % 4 === 0;

        if (showAllTagsInScan || isPreservedTagInFit || isKeyTag) {
          const leaderEndX = trunkTop.x + crownR + 10;
          const leaderEndY = trunkTop.y - crownR * 0.3 - 4;

          // Thin leader line from canopy crown to badge
          ctx.beginPath();
          ctx.strokeStyle = showAllTagsInScan ? 'rgba(255, 77, 0, 0.6)' : 'rgba(14, 14, 14, 0.35)';
          ctx.lineWidth = 0.6;
          ctx.moveTo(trunkTop.x + crownR * 0.7, trunkTop.y - crownR * 0.3);
          ctx.lineTo(leaderEndX - 3, leaderEndY);
          ctx.lineTo(leaderEndX, leaderEndY);
          ctx.stroke();

          // Small leader anchor dot
          ctx.beginPath();
          ctx.fillStyle = showAllTagsInScan ? '#FF4D00' : 'rgba(14, 14, 14, 0.6)';
          ctx.arc(trunkTop.x + crownR * 0.7, trunkTop.y - crownR * 0.3, 1.2, 0, Math.PI * 2);
          ctx.fill();

          // Tree tag label
          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.fillStyle = showAllTagsInScan ? '#FF4D00' : 'rgba(14, 14, 14, 0.75)';

          let tagText = tree.id;
          if (wFit > 0.25) {
            tagText = `${tree.id} [${modelContent.controls.treeKept[currentLang]}]`;
          } else if (showAllTagsInScan && idx < 8) {
            tagText = `${tree.id} ${tree.type.toUpperCase()}`;
          }

          ctx.fillText(tagText, leaderEndX + 3, leaderEndY + 2);
        }
      });

      // Coast sea datum marker
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(14, 14, 14, 0.5)';
      ctx.fillText(modelContent.controls.seaDatum[currentLang], seaP3.x - 92, seaP3.y - 6);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [getNaturalHeight, getExcavatedHeight, isHouseFootprint, isPaused, isOrbiting, evolveYear]);

  // Mouse & Drag Interaction Handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cam = camRef.current;
    if (cam.isDragging) {
      const deltaX = e.clientX - cam.lastMouseX;
      const deltaY = e.clientY - cam.lastMouseY;
      cam.lastMouseX = e.clientX;
      cam.lastMouseY = e.clientY;

      cam.velAngle = deltaX * 0.005;
      cam.velPitch = deltaY * 0.005;
      cam.userAngleOffset += cam.velAngle;
      cam.pitch += cam.velPitch;
      cam.targetPitch = cam.pitch;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseHoverRef.current = { x: nx, y: ny, isInside: true };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    camRef.current.isDragging = true;
    camRef.current.lastMouseX = e.clientX;
    camRef.current.lastMouseY = e.clientY;
    camRef.current.velAngle = 0;
    camRef.current.velPitch = 0;
    isInteractingRef.current = true;
  };

  const handleMouseUp = () => {
    camRef.current.isDragging = false;
    isInteractingRef.current = false;
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    camRef.current.isDragging = false;
    isInteractingRef.current = false;
    setIsPaused(false);
    mouseHoverRef.current.isInside = false;
    mouseHoverRef.current.x = 0.5;
    mouseHoverRef.current.y = 0.5;
  };

  const curStageConfig = stages[activeStage];

  return (
    <div className="flex flex-col bg-[#F5F5F2] select-none">
      {/* 1. TOP TABS: 01 Scan · 02 Fit · 03 Ground · 04 Build · 05 Evolve with Auto-Cycle Progress Line */}
      <div className="border-b border-hairline bg-[#F5F5F2]">
        <div className="grid grid-cols-5 font-mono text-[11px] sm:text-xs divide-x divide-hairline">
          {stages.map((s) => {
            const isActive = activeStage === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goToStage(s.id)}
                className={`relative py-2 sm:py-2.5 px-1 sm:px-3 text-center transition-colors font-medium whitespace-nowrap overflow-hidden ${
                  isActive
                    ? 'text-[#0E0E0E] bg-[#0E0E0E]/[0.03] font-bold'
                    : 'text-[#0E0E0E]/60 hover:text-[#0E0E0E] hover:bg-[#0E0E0E]/[0.015]'
                }`}
              >
                <span>{s.tabLabel}</span>

                {/* Active Tab Indicator & Auto-Cycle Progress Line */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0E0E0E]/15">
                    <div
                      className="h-full bg-[#FF4D00] transition-all duration-100 ease-linear"
                      style={{ width: `${Math.round(stageProgress * 100)}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 3D INTERACTIVE CANVAS & TECHNICAL HUD */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] cursor-grab active:cursor-grabbing overflow-hidden bg-[#F5F5F2]"
        style={{ touchAction: 'none' }}
        aria-label={content.aria.interactiveModel[currentLang]}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* HUD OVERLAY: one readout panel per stage, text from content */}
        {(() => {
          const r = modelContent.readouts;
          const panels = [r.scan, r.fit, r.ground, r.build, r.evolve];
          const panel = panels[activeStage];
          if (!panel) return null;
          return (
            <div
              className={`absolute top-3 left-3 z-10 space-y-1 font-mono text-[9px] sm:text-[10px] text-[#0E0E0E] bg-[#F5F5F2]/90 p-2 sm:p-2.5 border border-hairline shadow-xs min-w-[190px] ${
                activeStage === 4 ? '' : 'pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between gap-4 text-[#FF4D00] font-bold pb-1 border-b border-hairline">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#FF4D00]" />
                  <span>{panel.title[currentLang]}</span>
                </span>
                {activeStage === 4 && (
                  <span>
                    {r.evolve.year[currentLang]} +{evolveYear}
                  </span>
                )}
              </div>

              {/* Year selector, Time stage only */}
              {activeStage === 4 && (
                <div className="flex items-center gap-1 py-1">
                  {[0, 5, 20, 50].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setEvolveYear(yr)}
                      className={`flex-1 py-1 text-center border text-[9px] transition-colors ${
                        evolveYear === yr
                          ? 'border-[#0E0E0E] bg-[#0E0E0E] text-[#F5F5F2] font-bold'
                          : 'border-hairline bg-[#F5F5F2] text-[#0E0E0E]/70 hover:border-[#0E0E0E]'
                      }`}
                    >
                      +{yr}Y
                    </button>
                  ))}
                </div>
              )}

              {panel.rows.map((row) => (
                <div key={row.label.en} className="flex justify-between gap-4 text-[#0E0E0E]/70">
                  <span>{row.label[currentLang]}</span>
                  <span className="font-bold text-[#0E0E0E]">{row.value[currentLang]}</span>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Top-Right Technical Controls: Step & Orbit Toggle */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 font-mono text-[9px] bg-[#F5F5F2]/90 p-1 border border-hairline">
          <button
            type="button"
            onClick={prevStage}
            className="px-1.5 py-0.5 border border-hairline hover:border-[#0E0E0E] bg-[#F5F5F2] transition-colors"
            title="Previous Stage"
          >
            {modelContent.controls.prev[currentLang]}
          </button>
          <button
            type="button"
            onClick={nextStage}
            className="px-1.5 py-0.5 border border-hairline hover:border-[#0E0E0E] bg-[#F5F5F2] transition-colors"
            title="Next Stage"
          >
            {modelContent.controls.next[currentLang]}
          </button>
          <button
            type="button"
            onClick={() => setIsOrbiting((o) => !o)}
            className={`px-1.5 py-0.5 border transition-colors flex items-center gap-1 ${
              isOrbiting
                ? 'border-[#FF4D00] text-[#FF4D00]'
                : 'border-hairline text-[#0E0E0E]/60 hover:border-[#0E0E0E]'
            }`}
            title="Toggle 360° Camera Orbit"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOrbiting ? 'bg-[#FF4D00] animate-pulse' : 'bg-[#0E0E0E]/40'}`} />
            <span>{isOrbiting ? modelContent.controls.orbit[currentLang] : modelContent.controls.paused[currentLang]}</span>
          </button>
        </div>
      </div>

      {/* 3. BOTTOM BAR: Stage number, stage name, one-line caption. Nothing else. */}
      <div className="px-4 py-2.5 border-t border-hairline bg-[#F5F5F2] flex items-center gap-2.5 font-mono text-xs text-[#0E0E0E]">
        <span className="text-[#FF4D00] font-bold">{curStageConfig.stageNum}</span>
        <span className="font-bold tracking-wider">{curStageConfig.stageName}</span>
        <span className="text-[#0E0E0E]/30">·</span>
        <span className="text-[#0E0E0E]/80 text-[11px] sm:text-xs truncate">
          {curStageConfig.caption}
        </span>
      </div>
    </div>
  );
};
