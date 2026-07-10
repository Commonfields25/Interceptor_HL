// Interceptor_HL — Geometry Data
// Fuselage: L=360mm, Ø=36mm, cosine ogive nose (Mason), linear boat-tail
// Wing: tapered, swept 18°, dihedral 5.5°, attached at fuselage shoulder FS=120

export const fuselageStations = [
  { label: "STA_000", x:   0, r:  0.00 },
  { label: "STA_012", x:  12, r:  1.11 },
  { label: "STA_024", x:  24, r:  4.24 },
  { label: "STA_036", x:  36, r:  8.10 },
  { label: "STA_048", x:  48, r: 11.97 },
  { label: "STA_060", x:  60, r: 15.20 },
  { label: "STA_072", x:  72, r: 17.40 },
  { label: "STA_084", x:  84, r: 17.94 },
  { label: "STA_096", x:  96, r: 18.00 },
  { label: "STA_108", x: 108, r: 18.00 },
  { label: "STA_120", x: 120, r: 18.00 },  // ← WING ROOT ATTACHMENT
  { label: "STA_132", x: 132, r: 18.00 },
  { label: "STA_144", x: 144, r: 18.00 },
  { label: "STA_156", x: 156, r: 18.00 },
  { label: "STA_168", x: 168, r: 18.00 },
  { label: "STA_180", x: 180, r: 18.00 },  // ← WING ROOT TE
  { label: "STA_192", x: 192, r: 18.00 },
  { label: "STA_204", x: 204, r: 18.00 },
  { label: "STA_216", x: 216, r: 18.00 },
  { label: "STA_228", x: 228, r: 18.00 },
  { label: "STA_240", x: 240, r: 18.00 },
  { label: "STA_252", x: 252, r: 18.00 },
  { label: "STA_264", x: 264, r: 18.00 },
  { label: "STA_276", x: 276, r: 18.00 },
  { label: "STA_288", x: 288, r: 18.00 },
  { label: "STA_300", x: 300, r: 18.00 },  // ← Boat-tail start
  { label: "STA_320", x: 320, r: 12.67 },
  { label: "STA_340", x: 340, r:  7.33 },
  { label: "STA_360", x: 360, r:  0.00 },
];

// Cosine ogive (Mason): r(x) = R·(1 - cos(πx/2L)) for x in [0, L_nose]
// Boat-tail: r(x) = R·(1 - (x-x_bt)/L_tail) for x in [x_bt, x_bt+L_tail]

export const fuselageVectors: Record<string, [number, number, number]> = {
  "STA_120_000": [120.0,  18.0000,   0.0000],  // WING ROOT RIGHT (attachment point!)
  "STA_120_090": [120.0,   0.0000,  18.0000],
  "STA_120_180": [120.0, -18.0000,   0.0000],  // WING ROOT LEFT (attachment point!)
  "STA_120_270": [120.0,   0.0000, -18.0000],
  // ... (8 vectors per station, 45° increments)
};

// Centerline (nose → tail)
export const centerline = [
  [  0.0,  0.0000,  0.0000],
  [ 60.0,  0.0000,  0.0000],
  [120.0,  0.0000,  0.0000],
  [180.0,  0.0000,  0.0000],
  [240.0,  0.0000,  0.0000],
  [300.0,  0.0000,  0.0000],
  [360.0,  0.0000,  0.0000],
];

// ══════════════════════════════════════════════════════════════
// WING ATTACHMENT MATRIX
// Wings attach at fuselage shoulder: FS=120mm, r=18mm (on surface)
// Right wing: y = +18mm (fuselage right side, z=0 mid-fuselage)
// Left wing:  y = -18mm (mirror)
// ══════════════════════════════════════════════════════════════

export const WING_ATTACHMENT = {
  // Right wing attachment vertices
  "WING_ROOT_LE_R": {
    pos: [120.0, 18.00, 0.0] as [number,number,number],
    desc: "Root Leading Edge — on fuselage surface (FS=120, y=18, z=0)"
  },
  "WING_ROOT_TE_R": {
    pos: [180.0, 18.00, 0.0] as [number,number,number],
    desc: "Root Trailing Edge (FS=180, y=18, z=0)"
  },
  "WING_TIP_LE_R": {
    pos: [175.0, 188.00, 16.3] as [number,number,number],
    desc: "Tip Leading Edge — swept 18° + dihedral 5.5° (FS≈175, y=188, z=16.3)"
  },
  "WING_TIP_TE_R": {
    pos: [203.0, 188.00, 16.3] as [number,number,number],
    desc: "Tip Trailing Edge (FS≈203, y=188, z=16.3)"
  },
  // Left wing attachment vertices (mirror)
  "WING_ROOT_LE_L": {
    pos: [120.0, -18.00, 0.0] as [number,number,number],
    desc: "Left root LE (mirror of WING_ROOT_LE_R)"
  },
  "WING_ROOT_TE_L": {
    pos: [180.0, -18.00, 0.0] as [number,number,number],
    desc: "Left root TE (mirror)"
  },
  "WING_TIP_LE_L": {
    pos: [175.0, -188.00, 16.3] as [number,number,number],
    desc: "Left tip LE (mirror)"
  },
  "WING_TIP_TE_L": {
    pos: [203.0, -188.00, 16.3] as [number,number,number],
    desc: "Left tip TE (mirror)"
  },
} as const;

export const attachmentPoints = {
  ...WING_ATTACHMENT,
  "FUSELAGE_SHOULDER_R": {
    pos: [120.0, 18.00, 0.0] as [number,number,number],
    desc: "Fuselage shoulder right (wing root attachment)"
  },
  "FUSELAGE_SHOULDER_L": {
    pos: [120.0, -18.00, 0.0] as [number,number,number],
    desc: "Fuselage shoulder left (wing root attachment)"
  },
  "NOSE_SHOULDER": {
    pos: [120.0, 18.00, 0.0] as [number,number,number],
    desc: "Nose at max diameter (FS=120)"
  },
  "TAIL_SHOULDER": {
    pos: [300.0, 18.00, 0.0] as [number,number,number],
    desc: "Boat-tail start (FS=300)"
  },
  "ENGINE_LIP": {
    pos: [360.0, 7.00, 0.0] as [number,number,number],
    desc: "Engine intake lip (x=360, r=7mm)"
  },
} as const;

// ══════════════════════════════════════════════════════════════
// WING PLANFORM DATA
// ══════════════════════════════════════════════════════════════

export const WING = {
  // Attachment
  attachFS_mm: 120,          // Root at FS=120mm
  attachY_mm: 18,            // On fuselage surface (y=±18mm)
  attachZ_mm: 0,             // Mid-fuselage height

  // Geometry
  halfSpan_mm: 170,
  rootChord_mm: 60,
  tipChord_mm: 28,
  taperLambda: 28/60,        // 0.467

  // Sweep & dihedral
  sweepLE_deg: 18,           // Leading edge sweep
  dihedral_deg: 5.5,         // Wingtip dihedral

  // Calculated tip position
  tipX_mm: 120 + 170 * Math.tan(18 * Math.PI/180),  // ≈175mm
  tipY_mm: 188,              // 18 + 170
  tipZ_mm: 170 * Math.sin(5.5 * Math.PI/180),       // ≈16.3mm

  // Aerodynamics
  wingArea_m2: 0.5 * (60+28) * 170 / 1e6,   // 0.00748 m²
  aspectRatio: 2 * 170*170 / (0.5*(60+28)*170),  // ≈45.5 / 7.48 ≈ 6.08
  airfoil: "NACA 0012 (12%)",
  t_c_root: 0.12,
  t_c_tip: 0.10,
} as const;

// Attachment matrix (transformation from fuselage to wing coords)
export const WING_TRANSFORM = {
  // Right wing: local coords (x_wing along chord, y_wing spanwise, z_wing thickness)
  rootOffset: { x: 120, y: 18, z: 0 },   // Wing LE origin on fuselage
  sweepAngle_deg: 18,
  dihedralAngle_deg: 5.5,
  // Chord-wise: x increases from LE to TE
  // Span-wise: y increases from root to tip (right wing)
  // Thickness: z perpendicular to chord plane
  // Tip position formula:
  //   tip_x = root_x + span * tan(sweep) + chord_offset
  //   tip_y = root_y + span (for right wing, +span; left wing, -span)
  //   tip_z = span * sin(dihedral)
} as const;

export const FUSELAGE = {
  totalLength_mm: 360,
  maxDiameter_mm: 36,         // Ø 36mm = r × 2
  maxRadius_mm: 18,
  noseLength_mm: 120,         // Ogive region
  tailLength_mm: 60,          // Boat-tail region
  bodyLength_mm: 180,         // Cylindrical region (STA 120→300)
  noseFormula: "cosine ogive r(x) = R·(1-cos(πx/2L))",
  noseHalfAngle_deg: 24.23,   // atan(18/40) — but full nose is 120mm
  scale_px_per_mm: 2.5,
  stations: 30,
} as const;

export default fuselageStations;