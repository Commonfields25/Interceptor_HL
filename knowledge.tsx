import React from 'react';

export interface GeometryData {
  L: number;
  maxDiameter: number;
  noseLen: number;
  tailStart: number;
  nozzleR: number;
  stations: Array<{ x: number; r: number }>;
  wing: {
    rootChord: number;
    tipChord: number;
    halfSpan: number;
    sweepLE: number;
    dihedral: number;
    thicknessRoot: number;
    thicknessTip: number;
    posRootX: number;
    taper: number;
    span: number;
    area: number;
    AR: number;
    qcSweep: number;
  };
  vectors: {
    nPerStation: number;
    angleStep: number;
  };
}

export const geometry: GeometryData = {
  L: 360,          // mm — total fuselage length
  maxDiameter: 36, // mm — max fuselage diameter (Ø)
  noseLen: 40,      // mm — ogive nose length
  tailStart: 330,   // mm — boat-tail begins
  nozzleR: 7,      // mm — nozzle exit radius

  stations: [
    { x: 0,   r: 0.00 }, { x: 12,  r: 11.83 }, { x: 24,  r: 15.87 },
    { x: 36,  r: 17.73 }, { x: 40,  r: 18.00 }, { x: 48,  r: 18.00 },
    { x: 60,  r: 18.00 }, { x: 84,  r: 18.00 }, { x: 108, r: 18.00 },
    { x: 120, r: 18.00 }, { x: 132, r: 18.00 }, { x: 144, r: 18.00 },
    { x: 156, r: 18.00 }, { x: 168, r: 18.00 }, { x: 180, r: 18.00 },
    { x: 192, r: 18.00 }, { x: 204, r: 18.00 }, { x: 216, r: 18.00 },
    { x: 228, r: 18.00 }, { x: 240, r: 18.00 }, { x: 252, r: 18.00 },
    { x: 264, r: 18.00 }, { x: 276, r: 18.00 }, { x: 288, r: 18.00 },
    { x: 300, r: 18.00 }, { x: 312, r: 18.00 }, { x: 324, r: 17.73 },
    { x: 330, r: 17.36 }, { x: 342, r: 14.36 }, { x: 360, r: 7.00 },
  ],

  // ── MAIN WING DATA ──
  wing: {
    rootChord:   60,   // mm — chord at fuselage attachment
    tipChord:    28,   // mm — chord at wing tip
    halfSpan:     85,   // mm — root to tip (one side)
    sweepLE:      18,   // degrees — leading edge sweep angle
    dihedral:     5.5,  // degrees — tip dihedral (tip up)
    thicknessRoot: 0.12, // t/c ratio at root (NACA 12%)
    thicknessTip:  0.10, // t/c ratio at tip (NACA 10%)
    posRootX:     105,  // mm FS — root leading edge position

    // Derived
    taper:   0.467,     // λ = Ct/Cr = 28/60
    span:    170,       // b = 2 × halfSpan = 170 mm
    area:    0.00748,   // m² — trapezoidal area: ½(Cr+Ct)×b
    AR:      5.67,      // Aspect Ratio: b²/S ≈ 170²/5098
    qcSweep: 12,        // degrees — quarter-chord sweep (design value)

    // NACA 4-digit thickness: y/c = 5·tc·(0.2969√t − 0.126t − 0.3516t² + 0.2843t³ − 0.1015t⁴)
    // Airfoil cross-section: parametric in XY plane at each span station
  },

  vectors: {
    nPerStation: 12,
    angleStep: 30,   // degrees — 12 vectors at 30° intervals
  },
};

export const aerodynamicConstants = {
  rho: 1.225,        // kg/m³ — air density at sea level
  nu: 1.5e-5,        // m²/s — kinematic viscosity
  gamma: 1.4,        // ratio of specific heats
  R: 287,            // J/(kg·K) — gas constant
};

export const flightConditions = {
  vCruise: 40,       // m/s — estimated cruise speed
  alphaMax: 15,      // degrees — max CL before stall
  clAlpha: 0.1,      // per degree — lift curve slope (thin airfoil)
};

export function getFuselageSection(x: number): number {
  // Returns radius at fuselage station x (mm)
  // Ogive: r(x) = √(R² − (L_nose − x)²) for 0 ≤ x ≤ L_nose
  // Body: r = R for L_nose < x < TAIL_START
  // Boat-tail: linear taper for x ≥ TAIL_START
  if (x <= geometry.noseLen) {
    const dx = geometry.noseLen - x;
    return Math.sqrt(Math.max(0, (geometry.maxDiameter / 2) ** 2 - dx ** 2));
  } else if (x <= geometry.tailStart) {
    return geometry.maxDiameter / 2;
  } else {
    const t = (x - geometry.tailStart) / (geometry.L - geometry.tailStart);
    return geometry.maxDiameter / 2 - t * (geometry.maxDiameter / 2 - geometry.nozzleR);
  }
}

export function getWingChordAt(spanFrac: number): number {
  // spanFrac: 0 = root, 1 = tip
  return geometry.wing.rootChord - spanFrac * (geometry.wing.rootChord - geometry.wing.tipChord);
}

export function getWingArea(): number {
  const { rootChord, tipChord, halfSpan } = geometry.wing;
  return 0.5 * (rootChord + tipChord) * (halfSpan * 2) * 1e-6; // m²
}
