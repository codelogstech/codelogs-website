// The satin ribbon from the "Tech v3" design, ported from its buildGraphic():
// a Catmull-Rom spine swept into 600 shaded quads whose width and lighting
// follow a twist function, fading from brand blue to violet. Split at the
// middle so the two halves can fall away when the ribbon is cut.

type Pt = [number, number];
export type RibbonQuad = { points: string; fill: string; opacity: number };

const BL = [10, 116, 255];
const PU = [119, 0, 255];
const N = 600;
const HALF_W = 15;

const shade = (c: number[], lit: number, spec: number) =>
  "rgb(" + c.map((v) => Math.min(255, Math.round(v * lit + 255 * spec))).join(",") + ")";

function catmullRom(pts: Pt[], s: number): Pt {
  const n = pts.length - 1;
  const f = Math.min(n - 1e-6, s * n);
  const i = Math.floor(f);
  const t = f - i;
  const p0 = pts[Math.max(0, i - 1)];
  const p1 = pts[i];
  const p2 = pts[i + 1];
  const p3 = pts[Math.min(n, i + 2)];
  const q = (k: 0 | 1) =>
    0.5 *
    (2 * p1[k] +
      (-p0[k] + p2[k]) * t +
      (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t +
      (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t * t * t);
  return [q(0), q(1)];
}

const SPINE: Pt[] = [
  [-40, 236], [150, 250], [330, 248], [470, 244], [600, 254],
  [730, 244], [870, 248], [1050, 250], [1240, 236],
];
const twist = (s: number) => 0.5 * Math.sin(s * 20 + 0.6) + 0.22 * Math.sin(s * 50 + 2);
const colour = (s: number) => {
  const k = 1 / (1 + Math.exp(-(s - 0.5) * 10));
  return BL.map((v, i) => v + (PU[i] - v) * k);
};

function build() {
  const left: RibbonQuad[] = [];
  const right: RibbonQuad[] = [];
  const P = (s: number) => {
    const [x, y] = catmullRom(SPINE, s);
    return { x, y, phi: twist(s) };
  };
  let prev = P(0);
  for (let i = 1; i <= N; i++) {
    const s = i / N;
    const cur = P(s);
    const w0 = HALF_W * Math.abs(Math.cos(prev.phi)) + 2;
    const w1 = HALF_W * Math.abs(Math.cos(cur.phi)) + 2;
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    const l = Math.hypot(dx, dy) || 1;
    const nx = -dy / l;
    const ny = dx / l;
    const back = Math.cos(cur.phi) < 0;
    const lit = (0.5 + 0.5 * Math.cos(prev.phi * 2.2 - 0.5)) * (back ? 0.58 : 1);
    const spec = back ? 0 : Math.pow(Math.max(0, Math.cos(prev.phi * 2.2 - 0.9)), 14) * 0.5;
    const q: Pt[] = [
      [prev.x + nx * w0, prev.y + ny * w0],
      [cur.x + nx * w1, cur.y + ny * w1],
      [cur.x - nx * w1, cur.y - ny * w1],
      [prev.x - nx * w0, prev.y - ny * w0],
    ];
    const quad = {
      points: q.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" "),
      fill: shade(colour(s), lit, spec),
      opacity: +Math.min(1, s / 0.06, (1 - s) / 0.06).toFixed(3),
    };
    (s <= 0.5 ? left : right).push(quad);
    prev = cur;
  }
  return { left, right };
}

export const RIBBON = build();
// Where the ribbon crosses the middle, in the art layer's coordinates
// (the design draws the ribbon group at translate(0 210)).
export const RIBBON_CUT = { x: 600, y: 254 + 210 };
export const RIBBON_ANCHOR_Y = 236 + 210;
