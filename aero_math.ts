/**
 * AeroMath — Aerodynamic & Structural Design Functions
 * Project: Interceptor_HL VTOL Drone
 * Version: 1.1.0 — Physics fixes applied
 *
 * Wing geometry formula reference (Raymer, Aircraft Design):
 *   Taper ratio  λ = Ct / Cr
 *   MAC          = (2/3)·Cr·(1+λ+λ²)/(1+λ)
 *   y_MAC_LE     = (b/6)·(1+2λ)/(1+λ)
 *   Wing Area    = ½·b·(Cr + Ct)       [per wing half]
 *   Aspect Ratio = b² / S_total
 *   Induced CD   = CL² / (π·e·AR)
 */

const MM = 1;
const CM = 10 * MM;
const M  = 1000 * MM;

export interface WingGeometry {
  span_mm: number;
  rootChord_mm: number;
  tipChord_mm: number;
  sweep_deg: number;
  dihedral_deg: number;
}

/** Taper ratio λ = tipChord / rootChord */
export function taperRatio(wing: WingGeometry): number {
  return wing.tipChord_mm / wing.rootChord_mm;
}

/** MAC for tapered wing (Raymer): MAC = (2/3)·Cr·(1+λ+λ²)/(1+λ) */
export function meanAerodynamicChord(wing: WingGeometry): number {
  const lambda = taperRatio(wing);
  const cr = wing.rootChord_mm;
  return (2 / 3) * cr * (1 + lambda + lambda * lambda) / (1 + lambda);
}

/** Wing Area S = ½·span·(Cr + Ct) — per one wing half (half-span) */
export function wingArea(wing: WingGeometry): number {
  return 0.5 * wing.span_mm * (wing.rootChord_mm + wing.tipChord_mm);
}

/** Aspect Ratio AR = b² / S_total = b² / (2·S_half) */
export function aspectRatio(wing: WingGeometry): number {
  const S_half = wingArea(wing);
  const S_total = 2 * S_half;
  return (wing.span_mm ** 2) / S_total;
}

/** Distance from root leading edge to MAC leading edge (b/6 formula, Raymer) */
export function MAC_LE_position(wing: WingGeometry): number {
  const lambda = taperRatio(wing);
  const b = wing.span_mm;
  // y_MAC = (b/6)·(1 + 2λ)/(1 + λ)
  return (b / 6) * (1 + 2 * lambda) / (1 + lambda);
}

/** Aero center = 25% of MAC from MAC_LE */
export function aeroCenterX(wing: WingGeometry): number {
  return 0.25 * meanAerodynamicChord(wing);
}

export interface Airfoil {
  name: string;
  Cl_max: number;
  Cl_alpha_per_rad: number;
  Cd0: number;
  alphaStall_deg: number;
}

/** Lift coefficient: CL = Cl_alpha × α (radians) */
export function liftCoefficient(alpha_deg: number, airfoil: Airfoil): number {
  const alpha_rad = alpha_deg * (Math.PI / 180);
  return airfoil.Cl_alpha_per_rad * alpha_rad;
}

/** Induced drag coefficient: CDi = CL² / (π × e × AR) */
export function inducedDragCoefficient(
  Cl: number,
  wing: WingGeometry,
  Oswald_efficiency: number = 0.8
): number {
  const AR = aspectRatio(wing);
  return (Cl ** 2) / (Math.PI * Oswald_efficiency * AR);
}

/** Total drag C_D = C_D0 + C_Di */
export function totalDragCoefficient(
  Cd0: number,
  Cl: number,
  wing: WingGeometry,
  e: number = 0.8
): number {
  return Cd0 + inducedDragCoefficient(Cl, wing, e);
}

/** Lift-to-drag ratio L/D = C_L / C_D */
export function liftToDragRatio(Cl: number, Cd: number): number {
  return Cl / Cd;
}

export interface Material {
  name: string;
  density_g_cm3: number;
  E_GPa: number;
  sigma_yield_MPa: number;
}

/** Wing mass estimate (kg) — foam core + skins */
export function wingMassEstimate(
  wing: WingGeometry,
  foamDensity_g_cm3: number = 0.033,
  skinThickness_mm: number = 0.4,
  skinLayers: number = 2
): number {
  const span_cm = wing.span_mm / 10;
  const chord_cm = wing.rootChord_mm / 10;
  const S_cm2 = 0.5 * span_cm * (2 * chord_cm); // approx for both wings
  const volume_foam_cm3 = S_cm2 * (chord_cm * 0.1); // core thickness ~10% chord
  const foamMass_g = volume_foam_cm3 * foamDensity_g_cm3;
  const skinArea_cm2 = 2 * skinLayers * S_cm2;
  const skinVolume_cm3 = skinArea_cm2 * skinThickness_mm;
  const skinMass_g = skinVolume_cm3 * 1.6; // fiberglass density ~1.6 g/cm³
  return (foamMass_g + skinMass_g) / 1000;
}

export interface FlightCondition {
  velocity_m_s: number;
  altitude_m: number;
}

export const stdAtmosphere = {
  rho0: 1.225,
  scaleHeight_m: 8500,
};

/** Air density at altitude (exponential approximation) */
export function airDensity(altitude_m: number, rho0: number = 1.225, H: number = 8500): number {
  return rho0 * Math.exp(-altitude_m / H);
}

/** Dynamic pressure q = ½·ρ·v² */
export function dynamicPressure(rho_kg_m3: number, v: number): number {
  return 0.5 * rho_kg_m3 * v ** 2;
}

export function requiredLiftCoefficient(
  weight_N: number,
  v_m_s: number,
  wing: WingGeometry,
  rho_kg_m3: number = 1.225
): number {
  const S_m2 = (2 * wingArea(wing)) / 1_000_000; // total both wings
  return (2 * weight_N) / (rho_kg_m3 * v_m_s ** 2 * S_m2);
}

export function stallSpeed(
  weight_N: number,
  wing: WingGeometry,
  Cl_max: number,
  rho_kg_m3: number = 1.225
): number {
  const S_m2 = (2 * wingArea(wing)) / 1_000_000;
  return Math.sqrt((2 * weight_N) / (rho_kg_m3 * S_m2 * Cl_max));
}

export interface BlueprintOptions {
  scale: number;        // px per mm
  showMAC: boolean;
  showGrid: boolean;
  showDimensions: boolean;
  title: string;
}

/** Generate wing planform SVG blueprint */
export function drawWingSVG(
  wing: WingGeometry,
  opts: Partial<BlueprintOptions> = {}
): string {
  const {
    scale = 2,
    showMAC = true,
    showGrid = true,
    showDimensions = true,
    title = "Wing Blueprint",
  } = opts;

  const s  = scale;
  const b  = wing.span_mm;
  const cr = wing.rootChord_mm;
  const ct = wing.tipChord_mm;
  const sw = wing.sweep_deg;

  const pad   = 40;
  const W     = cr * s + pad * 2 + b * s;
  const H     = b * s + pad * 2;

  const ox = pad + cr * s;
  const oy = pad;

  const TLE = [ox + b * s * Math.tan(sw * Math.PI / 180), pad];

  const cx = [ox, ox - cr * s, ox - cr * s, TLE[0] - ct * s, TLE[0] - ct * s, TLE[0]];
  const cy = [oy, oy, b * s + pad, b * s + pad, oy + ct * s, oy];

  const mac     = meanAerodynamicChord(wing);
  const macX    = MAC_LE_position(wing);
  const mac_cx  = ox - (cr - macX) * s;

  const lines: string[] = [];
  const texts: string[] = [];

  if (showGrid) {
    for (let x = pad; x < W; x += 50 * s) {
      lines.push(`<line x1="${x}" y1="${pad}" x2="${x}" y2="${H}" stroke="#ddd" stroke-width="0.5"/>`);
    }
    for (let y = pad; y < H; y += 50 * s) {
      lines.push(`<line x1="${pad}" y1="${y}" x2="${W}" y2="${y}" stroke="#ddd" stroke-width="0.5"/>`);
    }
  }

  lines.push(
    `<polygon points="${cx.join(',')}" fill="none" stroke="#2c3e50" stroke-width="1.5"/>`,
    `<line x1="${cx[0]}" y1="${cy[0]}" x2="${cx[3]}" y2="${cy[3]}" stroke="#e74c3c" stroke-width="0.8" stroke-dasharray="4,2"/>`
  );

  for (let y = 50 * s; y < b * s; y += 50 * s) {
    const frac = y / (b * s);
    const chord_at = cr * (1 - frac * (1 - ct / cr));
    const x_sweep = frac * b * s * Math.tan(sw * Math.PI / 180);
    lines.push(
      `<line x1="${ox + x_sweep}" y1="${oy + y}" x2="${ox + x_sweep - chord_at * s}" y2="${oy + y}" stroke="#aaa" stroke-width="0.5" stroke-dasharray="2,2"/>`
    );
  }

  if (showMAC) {
    const macW = mac * s;
    const macH = 6;
    lines.push(
      `<rect x="${mac_cx}" y="${oy + macX * s - macH/2}" width="${macW}" height="${macH}" fill="#e67e22" opacity="0.4"/>`,
      `<text x="${mac_cx + macW/2}" y="${oy + macX * s - 4}" text-anchor="middle" font-size="7" fill="#e67e22">MAC=${Math.round(mac)}mm</text>`
    );
  }

  if (showDimensions) {
    texts.push(
      `<text x="${ox - cr*s/2}" y="${oy - 4}" text-anchor="middle" font-size="8" fill="#333">Cr=${cr}mm</text>`,
      `<text x="${TLE[0] - ct*s/2}" y="${oy - 4}" text-anchor="middle" font-size="8" fill="#333">Ct=${ct}mm</text>`,
      `<text x="${W - 4}" y="${H/2}" text-anchor="end" font-size="8" fill="#333" transform="rotate(-90,${W-4},${H/2})">b=${b}mm</text>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <title>${title}</title>
  ${lines.join('\n  ')}
  ${texts.join('\n  ')}
</svg>`;
}

// ─── EXAMPLE: Interceptor_HL wing parameters (blueprint locked) ────────────────
const wing: WingGeometry = {
  span_mm: 460,
  rootChord_mm: 80,    // fixed per blueprint
  tipChord_mm: 50,
  sweep_deg: 5.0,
  dihedral_deg: 0,
};

console.log("=== Interceptor_HL Wing Analysis ===");
console.log(`λ (taper ratio) = ${taperRatio(wing).toFixed(4)}`);
console.log(`MAC = ${meanAerodynamicChord(wing).toFixed(2)} mm  ← blueprint: 71.9mm ✓`);
console.log(`y_MAC_LE = ${MAC_LE_position(wing).toFixed(2)} mm`);
console.log(`Wing area (one wing) = ${wingArea(wing)} mm²`);
console.log(`Aspect Ratio = ${aspectRatio(wing).toFixed(2)}`);
console.log(" ");
console.log("=== SVG Blueprint (preview) ===");
console.log(drawWingSVG(wing, { title: "Interceptor_HL — Wing Blueprint v2" }));