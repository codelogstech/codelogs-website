import type { CSSProperties } from "react";

// Small glossy icon tile used by the mega-menu and footer. Glyphs are
// simple strokes drawn on a 24-unit grid centred on 0,0.
const GLYPHS: Record<string, string> = {
  spark: "M0,-8 C0.8,-2.5 2.5,-0.8 8,0 C2.5,0.8 0.8,2.5 0,8 C-0.8,2.5 -2.5,0.8 -8,0 C-2.5,-0.8 -0.8,-2.5 0,-8 Z",
  layers: "M0,-7 L8,-3 L0,1 L-8,-3 Z M-8,1 L0,5 L8,1 M-8,5 L0,9 L8,5",
  phone: "M-4.5,-8 H4.5 C5.3,-8 6,-7.3 6,-6.5 V6.5 C6,7.3 5.3,8 4.5,8 H-4.5 C-5.3,8 -6,7.3 -6,6.5 V-6.5 C-6,-7.3 -5.3,-8 -4.5,-8 Z M-1.5,5 H1.5",
  chart: "M-7,7 H7 M-4.5,7 V1 M0,7 V-5 M4.5,7 V-1",
  cloud: "M-5,6 H5 C8,6 9,1.5 6,-0.5 C6,-5 0.5,-7 -1.5,-3.5 C-5,-5 -8.5,-1.5 -6.5,1.5 C-9,2.5 -8,6 -5,6 Z",
  card: "M-8,-5.5 H8 V5.5 H-8 Z M-8,-2 H8 M-5,2.5 H-1.5",
  bank: "M-8,-2.5 L0,-8 L8,-2.5 Z M-6,0 V5.5 M-2,0 V5.5 M2,0 V5.5 M6,0 V5.5 M-8,7.5 H8",
  globe: "M0,-8 A8,8 0 1 1 -0.01,-8 Z M-8,0 H8 M0,-8 C-4,-4 -4,4 0,8 M0,-8 C4,-4 4,4 0,8",
  coins: "M-3,-3 A5,2 0 1 0 7,-3 A5,2 0 1 0 -3,-3 Z M-3,-3 V2 C-3,3.2 7,3.2 7,2 V-3 M-7,1 A5,2 0 1 0 3,1 M-7,1 V6 C-7,7.2 3,7.2 3,6 V3",
  route: "M-6,7 A2,2 0 1 0 -6,3 A2,2 0 1 0 -6,7 Z M6,-3 A2,2 0 1 0 6,-7 A2,2 0 1 0 6,-3 Z M-6,3 V0 C-6,-2 -4,-3 -2,-3 H2 C4,-3 4,-5 4,-5",
  repeat: "M-7,-1 V-3 C-7,-5 -5.5,-6 -4,-6 H6 M3,-9 L6,-6 L3,-3 M7,1 V3 C7,5 5.5,6 4,6 H-6 M-3,9 L-6,6 L-3,3",
  scan: "M-8,-4 V-8 H-4 M4,-8 H8 V-4 M8,4 V8 H4 M-4,8 H-8 V4 M-5,0 H5",
  key: "M-3.5,-1.5 A3.6,3.6 0 1 0 -3.5,-1.6 Z M-1,1 L7,9 M4,6 L6.5,3.5",
  eye: "M-8,0 C-5,-5 5,-5 8,0 C5,5 -5,5 -8,0 Z M0,-2.5 A2.5,2.5 0 1 0 0.01,-2.5 Z",
  build: "M-8,8 H8 M-6,8 V-2 L0,-7 L6,-2 V8 M-2,8 V3 H2 V8",
  truck: "M-8,-5 H3 V5 H-8 Z M3,-1 H6.5 L8.5,2 V5 H3 M-5,7 A1.6,1.6 0 1 0 -5,6.9 M5,7 A1.6,1.6 0 1 0 5,6.9",
  pulse: "M-8,0 H-4 L-2,-5 L1,5 L3,0 H8",
  steps: "M-8,6 H-3 V1 H2 V-4 H7",
  code: "M-4,-6 L-9,0 L-4,6 M4,-6 L9,0 L4,6 M1.5,-8 L-1.5,8",
  pin: "M0,8 C-5,2 -6,-1 -6,-3 A6,6 0 1 1 6,-3 C6,-1 5,2 0,8 Z M0,-5 A2,2 0 1 0 0.01,-5 Z",
  mail: "M-8,-5.5 H8 V5.5 H-8 Z M-8,-4.5 L0,1 L8,-4.5",
  lock: "M-6.5,-1 H6.5 V8 H-6.5 Z M-4,-1 V-4 C-4,-8 4,-8 4,-4 V-1 M0,3 V5",
  users: "M-3,-3 A3,3 0 1 0 -2.99,-3 Z M-9,7 C-9,1.5 3,1.5 3,7 M4,-5 A2.6,2.6 0 1 1 4,0.2 M5,2 C8,2.5 9,4.5 9,7",
  user: "M0,-3.5 A3.6,3.6 0 1 0 0.01,-3.5 Z M-7,8 C-7,1.5 7,1.5 7,8",
  file: "M-6,-8 H3 L7,-4 V8 H-6 Z M3,-8 V-4 H7 M-3,0 H4 M-3,4 H4",
  bell: "M-6,4 V-1 C-6,-5 -3,-7.5 0,-7.5 C3,-7.5 6,-5 6,-1 V4 L8,6 H-8 Z M-2,8 C-1,9.5 1,9.5 2,8",
  calc: "M-6,-8 H6 V8 H-6 Z M-3.5,-5 H3.5 V-2 H-3.5 Z M-3.5,2 H-2.5 M0,2 H1 M3,2 H4 M-3.5,5 H-2.5 M0,5 H1 M3,5 H4",
  share: "M5,-6 A2.4,2.4 0 1 0 5.01,-6 Z M-5,0 A2.4,2.4 0 1 0 -4.99,0 Z M5,6 A2.4,2.4 0 1 0 5.01,6 Z M-2.8,-1.2 L2.8,-4.8 M-2.8,1.2 L2.8,4.8",
  wifi: "M-9,-2 C-4,-7 4,-7 9,-2 M-6,1.5 C-2.5,-2 2.5,-2 6,1.5 M-3,5 C-1.5,3.5 1.5,3.5 3,5 M0,8 V8.1",
  receipt: "M-6,-8 H6 V8 L4,6.5 L2,8 L0,6.5 L-2,8 L-4,6.5 L-6,8 Z M-3,-4 H3 M-3,-1 H3 M-3,2 H1",
  search: "M-2,-2 A5.5,5.5 0 1 0 -1.99,-2 Z M2.2,2.2 L8,8",
  list: "M-4,-6 H8 M-4,0 H8 M-4,6 H8 M-8,-6 H-7 M-8,0 H-7 M-8,6 H-7",
  sync: "M7,-2 A7,7 0 0 0 -6,-4 M-6,-8 V-4 H-2 M-7,2 A7,7 0 0 0 6,4 M6,8 V4 H2",
  clock: "M0,-8 A8,8 0 1 0 0.01,-8 Z M0,-5 V0 L4,3",
};

export default function NavIcon({ name, color, size = 34 }: { name: string; color: string; size?: number }) {
  return (
    <span className="navicon" style={{ "--c": color, width: size, height: size } as CSSProperties} aria-hidden="true">
      <svg viewBox="-12 -12 24 24">
        <path d={GLYPHS[name] ?? GLYPHS.spark} />
      </svg>
    </span>
  );
}
