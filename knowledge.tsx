/**
 * knowledge.tsx — Interceptor_HL Geometry & Physics Standards
 * 
 * Extracted from:
 *   - Interceptor_HL/aero_knowledge.json (fuselage stations)
 *   - Standard missile/fuselage design principles
 *   - Interceptor_HL/aero_math.ts (physics formulas)
 * 
 * Version: 1.2.0
 * Updated: 2026-07-10
 */

// ============================================================
// UNIT CONVERSION
// ============================================================
const MM = 1;
const CM = 10 * MM;
const M  = 1000 * MM;

// ============================================================
// FUSELAGE GEOMETRY — 12 STATIONS WITH (x, r) VECTORS
// Based on ogive nose, cylindrical body, tapered tail
// ============================================================
export const FUSELAGE_LENGTH_mm = 360;
export const MAX_DIAMETER_mm    = 36;
export const MAX_RADIUS_mm      = MAX_DIAMETER_mm / 2; // 18mm

// Nose: ogive profile using r² = R² - (x - L_nose)² for x in [0, L_nose]
// Optimized for subsonic (noseLength = 0.5–1.0 calibers, using 1.11 calibers = 40mm)
export const NOSE_LENGTH_mm  = 40;
export const NOSE_HALF_ANGLE = Math.atan(MAX_RADIUS_mm / NOSE_LENGTH_mm) * (180 / Math.PI); // ~24.23°

export interface FuselageStation {
  id: string;
  x_mm: number;
  r_mm: number;
  desc: string;
  type: 'nose' | 'cylindrical' | 'transition' | 'tail';
}

export const fuselageStations: FuselageStation[] = [
  // ── NOSE SECTION ──────────────────────────────────────
  // Ogive profile: r(x) = sqrt(R² - (x - L_nose)²) for x ∈ [0, L_nose]
  // Station 0:  Nose tip
  { id: 'FUS_STA_000', x_mm: 0,    r_mm: 0,    desc: 'Nose tip',            type: 'nose' },
  
  // Station 1:  Nose at 1/4 length (ogive radius begins)
  { id: 'FUS_STA_010', x_mm: 10,   r_mm: 7.3,  desc: 'Nose quarter',       type: 'nose' },
  
  // Station 2:  Nose at 1/2 length
  { id: 'FUS_STA_020', x_mm: 20,   r_mm: 12.4, desc: 'Nose midpoint',      type: 'nose' },
  
  // Station 3:  Nose shoulder (ogive meets cylinder)
  { id: 'FUS_STA_040', x_mm: 40,   r_mm: MAX_RADIUS_mm, desc: 'Nose shoulder', type: 'nose' },
  
  // ── CYLINDRICAL BODY ─────────────────────────────────
  // Constant radius from shoulder through payload bays
  // Station 4:  Canopy leading edge
  { id: 'FUS_STA_070', x_mm: 70,   r_mm: MAX_RADIUS_mm, desc: 'Canopy leading edge', type: 'cylindrical' },
  
  // Station 5:  FC bay forward
  { id: 'FUS_STA_110', x_mm: 110,  r_mm: MAX_RADIUS_mm, desc: 'FC bay forward',      type: 'cylindrical', payload_bay: 'FC' },
  
  // Station 6:  FC bay aft
  { id: 'FUS_STA_150', x_mm: 150,  r_mm: MAX_RADIUS_mm, desc: 'FC bay aft',          type: 'cylindrical' },
  
  // Station 7:  Battery bay forward
  { id: 'FUS_STA_180', x_mm: 180,  r_mm: MAX_RADIUS_mm, desc: 'Battery bay forward', type: 'cylindrical', payload_bay: 'Battery' },
  
  // Station 8:  Battery bay aft
  { id: 'FUS_STA_230', x_mm: 230,  r_mm: MAX_RADIUS_mm, desc: 'Battery bay aft',     type: 'cylindrical' },
  
  // Station 9:  ESC bay forward
  { id: 'FUS_STA_260', x_mm: 260,  r_mm: MAX_RADIUS_mm, desc: 'ESC bay forward',    type: 'cylindrical', payload_bay: 'ESC' },
  
  // Station 10: ESC bay aft
  { id: 'FUS_STA_290', x_mm: 290,  r_mm: MAX_RADIUS_mm, desc: 'ESC bay aft',         type: 'cylindrical' },
  
  // Station 11: Motor mount front
  { id: 'FUS_STA_330', x_mm: 330,  r_mm: MAX_RADIUS_mm, desc: 'Motor mount front',   type: 'cylindrical' },
  
  // ── TAIL SECTION ─────────────────────────────────────
  // Boat-tail taper: radius reduces over final 30mm
  // Station 12: Begin taper
  { id: 'FUS_STA_335', x_mm: 335,  r_mm: MAX_RADIUS_mm, desc: 'Tail taper start',   type: 'transition' },
  
  // Station 13: Mid taper
  { id: 'FUS_STA_350', x_mm: 350,  r_mm: 14.0,          desc: 'Tail taper mid',     type: 'transition' },
  
  // Station 14: Tail face (motor nozzle exit)
  { id: 'FUS_STA_360', x_mm: 360,  r_mm: 12.0,          desc: 'Tail face',          type: 'tail' },
];

// ============================================================
// Ogive Radius for Nose Section
// Standard ogive: R_ogive ≈ 0.86 × (nose_length² + radius²) / radius
// ============================================================
export const OGV_RADIUS_mm = (NOSE_LENGTH_mm ** 2 + MAX_RADIUS_mm ** 2) / (2 * MAX_RADIUS_mm);
// ≈ (1600 + 324) / 36 ≈ 53.4mm — standard tangent ogive

export function ogiveRadius(x_mm: number): number {
  if (x_mm < 0 || x_mm > NOSE_LENGTH_mm) return x_mm <= 0 ? 0 : MAX_RADIUS_mm;
  const dx = x_mm - NOSE_LENGTH_mm;
  return Math.sqrt(Math.max(0, MAX_RADIUS_mm ** 2 - dx ** 2));
}

// ============================================================
// WING GEOMETRY (from aero_knowledge.json)
// ============================================================
export const wingGeometry = {
  span_mm:          460,
  rootChord_mm:    90,
  tipChord_mm:     50,
  sweep_deg:        5.0,
  dihedral_deg:     0.0,
  taperRatio:      50 / 90,  // 0.5556
  MAC_mm:          71.9,
  MAC_LE_fromRoot_mm: 104.05,
  area_mm2:        64400,
  aspectRatio:     3.29,
  airfoil: {
    name:          'Clark Y',
    thickness_pct: 0.12,
    Cl_max:        1.5,
    Cl_alpha_per_rad: 6.28318,
    Cd0:           0.006,
    alpha_stall_deg: 14,
  },
};

// ============================================================
// PHYSICS CONSTANTS & STANDARDS
// ============================================================
export const physics = {
  // Air properties (sea level ISA)
  rho0_kg_m3:      1.225,         // air density
  nu0_m2_s:        1.5e-5,        // kinematic viscosity
  scaleHeight_m:   8500,          // atmospheric scale height
  
  // Speed regimes
  V_cruise_m_s:    30,            // nominal cruise
  V_max_m_s:       50,            // max speed
  V_stall_m_s:     12,            // estimated stall
  
  // Reynolds number baseline (at MAC chord, cruise)
  Re_MAC:          (30 * 71.9e-3) / 1.5e-5,  // ≈ 143,800
  
  // Oswald efficiency (estimated for this planform)
  oswald_e:        0.8,
  
  // Gravitational
  g_m_s2:          9.81,
};

// ============================================================
// MATERIALS (from aero_knowledge.json)
// ============================================================
export const materials = [
  { name: 'EPS foam',      density_g_cm3: 0.033, E_GPa: 0.001, sigma_yield_MPa: 0.15 },
  { name: 'EPP foam',      density_g_cm3: 0.04,  E_GPa: 0.002, sigma_yield_MPa: 0.20 },
  { name: 'CNC foam',      density_g_cm3: 0.035, E_GPa: 0.001, sigma_yield_MPa: 0.18 },
  { name: 'Balsa wood',    density_g_cm3: 0.13,  E_GPa: 12.0,  sigma_yield_MPa: 50   },
  { name: 'Birch ply 1mm', density_g_cm3: 0.60,  E_GPa: 12.6,  sigma_yield_MPa: 40   },
  { name: 'Fiberglass',    density_g_cm3: 1.60,  E_GPa: 35.0,  sigma_yield_MPa: 350  },
  { name: 'Carbon UD',    density_g_cm3: 1.50,  E_GPa: 135.0, sigma_yield_MPa: 1600 },
];

// ============================================================
// FORMULA REFERENCES
// ============================================================
export const formulas = {
  totalDrag:         'C_D = C_D0 + C_Di',
  dynamicPressure:   'q = ½ρv²',
  requiredLiftCL:     'CL_req = 2W / (ρv²S)',
  aspectRatio:        'AR = b²/S_total',
  ogiveRadius:        'R = (L² + R₀²) / (2R₀)',
  inducedDrag:       'C_Di = CL² / (πe·AR)',
  reynolds:           'Re = v·c/ν',
  l_D_ratio:          'L/D = C_L / C_D',
};

// ============================================================
// 3D PROFILE VECTORS (for rendering / CNC slices)
// Each slice: { x, r, segments }
// ============================================================
export interface SliceVector {
  x_mm: number;
  r_mm: number;
  segments: number;
}

export const profileSlices: SliceVector[] = [
  { x_mm: 0,    r_mm: 0,    segments: 8  },
  { x_mm: 5,    r_mm: 3.5, segments: 12 },
  { x_mm: 10,   r_mm: 7.3, segments: 16 },
  { x_mm: 15,   r_mm: 10.8, segments: 16 },
  { x_mm: 20,   r_mm: 12.4, segments: 16 },
  { x_mm: 25,   r_mm: 14.2, segments: 16 },
  { x_mm: 30,   r_mm: 15.7, segments: 16 },
  { x_mm: 35,   r_mm: 17.1, segments: 16 },
  { x_mm: 40,   r_mm: 18.0, segments: 16 }, // nose shoulder
  { x_mm: 60,   r_mm: 18.0, segments: 16 },
  { x_mm: 70,   r_mm: 18.0, segments: 16 }, // canopy LE
  { x_mm: 90,   r_mm: 18.0, segments: 16 },
  { x_mm: 110,  r_mm: 18.0, segments: 16 }, // FC bay
  { x_mm: 130,  r_mm: 18.0, segments: 16 },
  { x_mm: 150,  r_mm: 18.0, segments: 16 }, // FC bay aft
  { x_mm: 165,  r_mm: 18.0, segments: 16 },
  { x_mm: 180,  r_mm: 18.0, segments: 16 }, // battery bay
  { x_mm: 205,  r_mm: 18.0, segments: 16 },
  { x_mm: 230,  r_mm: 18.0, segments: 16 }, // battery aft
  { x_mm: 245,  r_mm: 18.0, segments: 16 },
  { x_mm: 260,  r_mm: 18.0, segments: 16 }, // ESC bay
  { x_mm: 275,  r_mm: 18.0, segments: 16 },
  { x_mm: 290,  r_mm: 18.0, segments: 16 }, // ESC aft
  { x_mm: 310,  r_mm: 18.0, segments: 16 },
  { x_mm: 330,  r_mm: 18.0, segments: 16 }, // motor mount
  { x_mm: 335,  r_mm: 18.0, segments: 16 }, // taper start
  { x_mm: 342,  r_mm: 16.5, segments: 16 },
  { x_mm: 350,  r_mm: 14.0, segments: 16 },
  { x_mm: 355,  r_mm: 13.0, segments: 16 },
  { x_mm: 360,  r_mm: 12.0, segments: 12 }, // tail face
];

// ============================================================
// MOMENT OF INERTIA ESTIMATES (simplified cylinder model)
// I = (m/12) × (3r² + L²) for each section
// ============================================================
export const inertiaConstants = {
  // Approx mass distribution (g) per section
  noseMass_g:      15,   // ogive nose
  bodyMass_g:      120,  // cylindrical body
  tailMass_g:      25,   // motor/ESC region
  // Radius of gyration approximation
  kxx_factor:      0.25, // kx ≈ 0.25 × length (cylindrical rod)
  kyy_factor:      0.60, // ky ≈ 0.6 × radius (thin ring)
};

// ============================================================
// Export summary for console/UI
// ============================================================
export function logGeometrySummary(): void {
  console.log('=== Interceptor_HL Fuselage Geometry Summary ===');
  console.log(`Length: ${FUSELAGE_LENGTH_mm}mm | Max diameter: ${MAX_DIAMETER_mm}mm`);
  console.log(`Nose: ogive, L=${NOSE_LENGTH_mm}mm, half-angle=${NOSE_HALF_ANGLE.toFixed(2)}°`);
  console.log(`Ogive radius: ${OGV_RADIUS_mm.toFixed(1)}mm`);
  console.log(`Tail: boat-tail taper over 30mm`);
  console.log(`Stations: ${fuselageStations.length} defined`);
  console.log(`Profile slices: ${profileSlices.length} defined`);
  console.log('');
  console.log('Station table:');
  fuselageStations.forEach(s => {
    console.log(`  ${s.id} | x=${s.x_mm.toString().padStart(3)}mm | r=${s.r_mm.toFixed(1).padStart(5)}mm | ${s.desc}`);
  });
}
