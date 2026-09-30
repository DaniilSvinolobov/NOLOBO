/**
 * Overlay geometry for the "one site, five layers" process figure.
 *
 * Every point is [x, y] in percent of the photograph (0–100 of its width and
 * height), so the drawings follow the photo whatever the crop. To realign the
 * layers to a new photograph, edit the numbers in this file only.
 */

export type Pt = [number, number];

export interface OverlayStroke {
  points: Pt[];
  /** Draw a smooth curve through the points instead of straight segments. */
  smooth?: boolean;
  closed?: boolean;
  dashed?: boolean;
  accent?: boolean;
  /** Adds an arrowhead at the last point. */
  arrow?: boolean;
  /** Relative line weight, 1 = default hairline. */
  weight?: number;
  opacity?: number;
}

export interface OverlayLabel {
  /** Matches the id of the copy in content.ts. */
  id: string;
  /** Where the leader line ends on the photo. */
  target: Pt;
  /** Where the label sits; the leader line starts here. */
  at: Pt;
  /** Which side of `at` the text extends to. */
  align: 'left' | 'right';
}

export interface OverlayHatch {
  /** [x, y, width, height] in percent of the photo. */
  rect: [number, number, number, number];
  pattern: 'dryStone' | 'courses';
}

// Top edge of the terraced slope in the current photo.
const slopeEdge: Pt[] = [
  [0, 70],
  [25, 62],
  [50, 53],
  [75, 45],
  [100, 39],
];

const contour = (offset: number): Pt[] => slopeEdge.map(([x, y]) => [x, y + offset]);

const sunArc: Pt[] = Array.from({ length: 14 }, (_, i) => {
  const x = 12 + i * (76 / 13);
  return [x, 10 + 22 * ((x - 50) / 40) ** 2];
});

const wind = (y: number): Pt[] => [
  [26, y],
  [32, y - 0.8],
  [38, y + 0.4],
  [44, y - 0.4],
];

export const processOverlays = {
  /** 1 Listen: handwritten notes with leader lines. */
  listen: {
    notes: [
      { id: 'coffee', target: [35, 62.5], at: [22, 37.5], align: 'right' },
      { id: 'carob', target: [82, 44], at: [78, 32], align: 'right' },
      { id: 'grandchildren', target: [20, 77], at: [16, 52.5], align: 'right' },
    ] as OverlayLabel[],
  },

  /** 2 Site: contours, sun path, wind. */
  site: {
    strokes: [
      ...[4.5, 14, 24.5, 36].map((d, i): OverlayStroke => ({
        points: contour(d),
        smooth: true,
        opacity: i % 2 === 0 ? 0.9 : 0.6,
      })),
      { points: sunArc, smooth: true, dashed: true },
      ...[35, 39, 43].map((y): OverlayStroke => ({ points: wind(y), smooth: true, arrow: true })),
    ] as OverlayStroke[],
    sun: [68, 17] as Pt,
    labels: [
      { id: 'sun', target: [68, 17], at: [70.5, 12], align: 'left' },
      { id: 'wind', target: [26, 35], at: [26, 32], align: 'left' },
    ] as OverlayLabel[],
  },

  /** 3 Design: house set into the slope. */
  design: {
    strokes: [
      // Original ground line
      { points: [[38, 57.2], [50, 53], [75, 45], [80, 43.4]], dashed: true, opacity: 0.7 },
      // Roof slab
      { points: [[46, 53], [68, 53], [68, 55], [46, 55]], closed: true, weight: 1.4 },
      // Green roof running back into the slope
      { points: [[68, 53], [76, 44.7]], weight: 1.4 },
      // Walls
      { points: [[47, 55], [47, 61]], weight: 1.4 },
      { points: [[67, 55], [67, 61]], weight: 1.4 },
      // Glazing
      { points: [[53, 55], [53, 61]], opacity: 0.6 },
      { points: [[60, 55], [60, 61]], opacity: 0.6 },
      // Terrace plane
      { points: [[40, 61], [74, 61]], accent: true, weight: 1.6 },
      { points: [[40, 61], [40, 64.5]] },
      { points: [[40, 64.5], [74, 64.5]], opacity: 0.6 },
    ] as OverlayStroke[],
  },

  /** 4 Craft: material hatches and labels. */
  craft: {
    hatches: [
      { rect: [40, 61.3, 34, 3.1], pattern: 'dryStone' },
      { rect: [47.2, 55.2, 5.6, 5.6], pattern: 'courses' },
      { rect: [60.2, 55.2, 6.6, 5.6], pattern: 'courses' },
    ] as OverlayHatch[],
    labels: [
      { id: 'dryStone', target: [57, 63], at: [60, 72], align: 'left' },
      { id: 'mares', target: [50, 58], at: [44, 50], align: 'right' },
    ] as OverlayLabel[],
  },

  /** 5 Tech: a measured dimension line; the readouts sit at the frame edge. */
  tech: {
    strokes: [
      { points: [[40, 67.5], [74, 67.5]], weight: 0.9 },
      { points: [[40, 66.5], [40, 68.5]], weight: 0.9 },
      { points: [[57, 66.8], [57, 68.2]], weight: 0.9, opacity: 0.6 },
      { points: [[74, 66.5], [74, 68.5]], weight: 0.9 },
      { points: [[76, 53], [76, 61]], accent: true, weight: 1.2 },
      { points: [[75.3, 53], [76.7, 53]], accent: true, weight: 1.2 },
      { points: [[75.3, 61], [76.7, 61]], accent: true, weight: 1.2 },
    ] as OverlayStroke[],
  },
};
