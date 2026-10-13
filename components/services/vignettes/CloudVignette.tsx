"use client";

import type { ReactNode } from "react";
import "./cloud.css";

// A production cloud architecture in the AWS diagram style (640×294):
// edge (DNS, CDN, WAF) → internet gateway → VPC with two availability
// zones, each split into public / private-app / private-data subnets;
// a load balancer across both zones, an auto-scaling group, primary +
// standby database with cross-zone sync, caches, and regional services
// (queue → functions → storage, monitoring, secrets, logs, pipeline).
// 8s cycle: load climbs → CPU alarm → scale out 2 → 4 → 6 → settle →
// alarm clears → scale in. Queue messages are processed throughout.

type Slot = { x: number; wave: 0 | 1 | 2 };
const SLOT_Y = 138;
const SLOTS: Slot[] = [
  { x: 164, wave: 0 },
  { x: 316, wave: 0 },
  { x: 196, wave: 1 },
  { x: 348, wave: 1 },
  { x: 228, wave: 2 },
  { x: 380, wave: 2 },
];

const P = {
  users: "M26,147 L42,147",
  edge: "M68,147 C84,147 82,77 97,77",
  igw: "M123,77 C133,77 136,94 148,94 H270 C280,94 280,84 286,84",
  toSlot: (x: number) => `M299,90 C299,114 ${x + 13},116 ${x + 13},${SLOT_Y}`,
  db: "M243,180 V214",
  cache: "M190,180 C190,198 177,198 177,214",
  queue: "M414,150 C442,150 450,109 474,109",
  fn: "M500,109 H530",
  store: "M543,96 C543,62 522,47 500,47",
  mon: "M414,168 C440,168 450,176 470,176",
};

function Tile({ x, y, kind, children }: { x: number; y: number; kind: string; children: ReactNode }) {
  return (
    <g className={`vg-aws__tile vg-aws--${kind}`} transform={`translate(${x} ${y})`}>
      <rect className="vg-aws__shadow" x="1" y="2.5" width="24" height="25" rx="6" />
      <rect width="26" height="26" rx="6" />
      <rect className="vg-aws__gloss" width="26" height="26" rx="6" />
      <g transform="translate(13 13) scale(0.78)" className="vg-aws__glyph">
        {children}
      </g>
    </g>
  );
}

const Chip = () => (
  <>
    <rect x="-6" y="-6" width="12" height="12" rx="1.5" />
    <path d="M-3,-9 V-6 M3,-9 V-6 M-3,6 V9 M3,6 V9 M-9,-3 H-6 M-9,3 H-6 M6,-3 H9 M6,3 H9" />
  </>
);
const Cylinder = () => (
  <>
    <ellipse cy="-6" rx="7.5" ry="2.8" />
    <path d="M-7.5,-6 V6 C-7.5,9.5 7.5,9.5 7.5,6 V-6" />
    <path d="M-7.5,0 C-7.5,3.5 7.5,3.5 7.5,0" />
  </>
);
const Bolt = () => <path d="M2,-9 L-5,1 H0 L-2,9 L5,-1 H0 Z" />;
const Nat = () => <path d="M-8,-3 H5 M2,-6 L5,-3 L2,0 M8,3 H-5 M-2,0 L-5,3 L-2,6" />;

export default function CloudVignette() {
  return (
    <svg viewBox="0 0 640 294" className="vg-aws">
      <defs>
        <linearGradient id="vg-aws-gloss" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.32" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      {/* ---------- Edge (outside the region) ---------- */}
      <g transform="translate(16 144)" className="vg-aws__users">
        <circle cx="-3" cy="-6" r="4" />
        <path d="M-11,8 C-11,0 5,0 5,8" />
        <circle cx="7" cy="-4" r="3.2" />
        <path d="M3,9 C3,3 14,3 14,9" />
      </g>
      <text x="16" y="170" textAnchor="middle" className="vg-aws__lbl">
        Users
      </text>
      <path d="M16,133 C16,100 28,83 42,83" className="vg-aws__link vg-aws__link--dash" />

      <Tile x={42} y={70} kind="net">
        <path d="M0,-9 V9 M0,-7 H7 L9,-5 L7,-3 H0 M0,0 H-7 L-9,2 L-7,4 H0" />
      </Tile>
      <text x="55" y="106" textAnchor="middle" className="vg-aws__lbl">
        DNS
      </text>
      <Tile x={42} y={134} kind="net">
        <circle r="8.5" />
        <ellipse rx="3.6" ry="8.5" />
        <path d="M-8.5,0 H8.5" />
      </Tile>
      <text x="55" y="170" textAnchor="middle" className="vg-aws__lbl">
        CDN
      </text>
      <Tile x={42} y={190} kind="sec">
        <path d="M0,-9 L7,-6 V0 C7,4.5 3.5,7.5 0,9 C-3.5,7.5 -7,4.5 -7,0 V-6 Z" />
        <path d="M-3,0 L-0.5,2.5 L3.5,-2" />
      </Tile>
      <text x="55" y="226" textAnchor="middle" className="vg-aws__lbl">
        WAF
      </text>

      {/* ---------- Region ---------- */}
      <rect x="94" y="4" width="540" height="286" rx="9" className="vg-aws__region" />
      <rect x="94" y="4" width="12" height="12" rx="2.5" className="vg-aws__region-flag" />
      <text x="111" y="13.5" className="vg-aws__tag vg-aws__tag--region">
        REGION
      </text>

      {/* VPC */}
      <rect x="110" y="22" width="342" height="262" rx="7" className="vg-aws__vpc" />
      <rect x="110" y="22" width="12" height="12" rx="2.5" className="vg-aws__vpc-flag" />
      <text x="127" y="31.5" className="vg-aws__tag vg-aws__tag--vpc">
        VPC · 10.0.0.0/16
      </text>

      {/* Two AZs, three subnets each */}
      {[
        { x: 148, name: "AZ-a" },
        { x: 302, name: "AZ-b" },
      ].map((az) => (
        <g key={az.name}>
          <rect x={az.x} y="38" width="146" height="240" rx="5" className="vg-aws__az" />
          <text x={az.x + 6} y="47" className="vg-aws__azl">
            {az.name}
          </text>
          <rect x={az.x + 4} y="51" width="138" height="50" rx="3" className="vg-aws__sub vg-aws__sub--pub" />
          <text x={az.x + 9} y="59" className="vg-aws__subl vg-aws__subl--pub">
            PUBLIC
          </text>
          <rect x={az.x + 4} y="106" width="138" height="80" rx="3" className="vg-aws__sub vg-aws__sub--prv" />
          <text x={az.x + 9} y="114" className="vg-aws__subl vg-aws__subl--prv">
            PRIVATE · APP
          </text>
          <rect x={az.x + 4} y="191" width="138" height="81" rx="3" className="vg-aws__sub vg-aws__sub--prv" />
          <text x={az.x + 9} y="199" className="vg-aws__subl vg-aws__subl--prv">
            PRIVATE · DATA
          </text>
        </g>
      ))}

      {/* Links (under tiles) */}
      <path d={P.users} className="vg-aws__link" />
      <path d={P.edge} className="vg-aws__link" />
      <path d={P.igw} className="vg-aws__link" />
      {SLOTS.map((s) => (
        <path key={`l${s.x}`} d={P.toSlot(s.x)} className={`vg-aws__link vg-aws__w${s.wave}`} />
      ))}
      <path d={P.db} className="vg-aws__link" />
      <path d={P.cache} className="vg-aws__link" />
      <path d={P.queue} className="vg-aws__link" />
      <path d={P.fn} className="vg-aws__link" />
      <path d={P.store} className="vg-aws__link" />
      <path d={P.mon} className="vg-aws__link vg-aws__link--mon" />
      <path d="M256,227 H316" className="vg-aws__sync" />
      <path d="M190,240 C190,262 395,262 395,240" className="vg-aws__link vg-aws__link--dash" />

      {/* Internet gateway on the VPC border */}
      <Tile x={97} y={64} kind="net">
        <rect x="-7" y="-7" width="14" height="14" rx="2" />
        <path d="M-3,0 H9 M5,-4 L9,0 L5,4" />
      </Tile>
      <text x="110" y="100" textAnchor="middle" className="vg-aws__lbl">
        IGW
      </text>

      {/* Public subnets: NAT gateways + load balancer across both AZs */}
      <Tile x={160} y={64} kind="net">
        <Nat />
      </Tile>
      <text x="191" y="80" className="vg-aws__lbl vg-aws__lbl--left">
        NAT
      </text>
      <Tile x={410} y={64} kind="net">
        <Nat />
      </Tile>
      <text x="405" y="80" textAnchor="end" className="vg-aws__lbl">
        NAT
      </text>
      <Tile x={286} y={64} kind="net">
        <circle cx="-7" r="2.6" />
        <path d="M-4.5,0 L6,-6 M-4.5,0 L6,0 M-4.5,0 L6,6" />
        <circle cx="7.5" cy="-6" r="1.6" />
        <circle cx="7.5" r="1.6" />
        <circle cx="7.5" cy="6" r="1.6" />
      </Tile>
      <text x="317" y="73" className="vg-aws__lbl vg-aws__lbl--left">
        Load
      </text>
      <text x="317" y="82" className="vg-aws__lbl vg-aws__lbl--left">
        balancer
      </text>

      {/* Auto-scaling group across both app subnets */}
      <rect x="156" y="121" width="258" height="60" rx="5" className="vg-aws__asg" />
      <text x="161" y="130" className="vg-aws__tag vg-aws__tag--asg">
        AUTO SCALING
      </text>
      {[2, 4, 6].map((c) => (
        <text key={c} x="409" y="130" textAnchor="end" className={`vg-aws__count vg-aws__count--${c}`}>
          {c}/6
        </text>
      ))}
      {SLOTS.map((s) => (
        <g key={`i${s.x}`} className={`vg-aws__inst vg-aws__w${s.wave}`}>
          <rect x={s.x} y={SLOT_Y} width="26" height="26" rx="5" className="vg-aws__slot" />
          <g className="vg-aws__tile vg-aws--compute" transform={`translate(${s.x} ${SLOT_Y})`}>
            <rect className="vg-aws__shadow" x="1" y="2.5" width="24" height="25" rx="6" />
            <rect width="26" height="26" rx="6" />
            <rect className="vg-aws__gloss" width="26" height="26" rx="6" />
            <g transform="translate(13 13) scale(0.72)" className="vg-aws__glyph">
              <Chip />
            </g>
            <circle cx="22" cy="4" r="1.7" className="vg-aws__led" />
          </g>
        </g>
      ))}

      {/* Data subnets: caches, primary + standby */}
      <Tile x={164} y={214} kind="db">
        <Bolt />
      </Tile>
      <text x="177" y="250" textAnchor="middle" className="vg-aws__lbl">
        Cache
      </text>
      <Tile x={230} y={214} kind="db">
        <Cylinder />
      </Tile>
      <text x="243" y="250" textAnchor="middle" className="vg-aws__lbl">
        Primary
      </text>
      <Tile x={316} y={214} kind="db replica">
        <Cylinder />
      </Tile>
      <text x="329" y="250" textAnchor="middle" className="vg-aws__lbl">
        Standby
      </text>
      <Tile x={382} y={214} kind="db replica">
        <Bolt />
      </Tile>
      <text x="395" y="250" textAnchor="middle" className="vg-aws__lbl">
        Cache
      </text>
      <text x="286" y="222" textAnchor="middle" className="vg-aws__sync-lbl">
        sync
      </text>

      {/* ---------- Regional services ---------- */}
      <Tile x={474} y={34} kind="storage">
        <path d="M-8,-6 H8 L6,8 C6,9.5 -6,9.5 -6,8 Z" />
        <ellipse cy="-6" rx="8" ry="2.4" />
      </Tile>
      <text x="506" y="44" className="vg-aws__lbl vg-aws__lbl--left">
        Object storage
      </text>
      <text x="506" y="53" className="vg-aws__sub-txt">
        backups · assets
      </text>

      <Tile x={474} y={96} kind="mgmt">
        <path d="M-9,-4 H9 V4 H-9 Z M-4,-4 V4 M0,-4 V4 M4,-4 V4" />
      </Tile>
      <text x="487" y="132" textAnchor="middle" className="vg-aws__lbl">
        Queue
      </text>
      <g className="vg-aws__fn">
        <Tile x={530} y={96} kind="compute">
          <path d="M-6,9 L-1,-1 M-6,-9 H-2 L6,9 H9" />
        </Tile>
      </g>
      <text x="543" y="132" textAnchor="middle" className="vg-aws__lbl">
        Functions
      </text>
      <g className="vg-aws__fn-count">
        <rect x="562" y="102" width="56" height="14" rx="7" />
        <text x="590" y="111.6" textAnchor="middle">
          ×12 runs
        </text>
      </g>

      {/* Monitoring */}
      <rect x="470" y="142" width="156" height="74" rx="6" className="vg-aws__mon-panel" />
      <rect x="477" y="149" width="14" height="14" rx="3.5" className="vg-aws__mon-icon" />
      <path d="M480,159 L483.5,155.5 L486,158 L489,152.5" className="vg-aws__mon-icon-line" />
      <text x="496" y="159" className="vg-aws__lbl vg-aws__lbl--left">
        CPU · app tier
      </text>
      <g className="vg-aws__badge vg-aws__badge--ok">
        <rect x="592" y="149" width="27" height="13" rx="6.5" />
        <text x="605.5" y="158.5" textAnchor="middle">
          OK
        </text>
      </g>
      <g className="vg-aws__badge vg-aws__badge--alarm">
        <rect x="585" y="149" width="34" height="13" rx="6.5" />
        <text x="602" y="158.5" textAnchor="middle">
          ALARM
        </text>
      </g>
      <path d="M478,186 H618" className="vg-aws__threshold" />
      <text x="618" y="183" textAnchor="end" className="vg-aws__thr-lbl">
        70%
      </text>
      <path
        d="M478,206 L492,204 L506,205 L520,198 L534,184 L548,174 L562,180 L576,195 L590,202 L604,204 L618,205"
        pathLength={100}
        className="vg-aws__metric"
      />

      {/* Security / ops row */}
      <Tile x={474} y={232} kind="sec">
        <circle cx="-3" cy="-2" r="3.6" />
        <path d="M-0.5,0.5 L7,8 M4,5 L6.5,2.5" />
      </Tile>
      <text x="487" y="268" textAnchor="middle" className="vg-aws__lbl">
        Secrets
      </text>
      <Tile x={524} y={232} kind="mgmt">
        <path d="M-7,-6 H7 M-7,-2 H7 M-7,2 H3 M-7,6 H5" />
      </Tile>
      <text x="537" y="268" textAnchor="middle" className="vg-aws__lbl">
        Logs
      </text>
      <Tile x={574} y={232} kind="dev">
        <circle cx="-6" r="2.4" />
        <circle cx="6" r="2.4" />
        <path d="M-3.6,0 H3.6 M0,-7 V-3 M0,3 V7" />
      </Tile>
      <text x="587" y="268" textAnchor="middle" className="vg-aws__lbl">
        Pipeline
      </text>

      {/* ---------- Traffic ---------- */}
      {[0, 0.45].map((b) => (
        <circle key={`e${b}`} r="2.4" className="vg-aws__pkt">
          <animateMotion dur="0.9s" begin={`-${b}s`} repeatCount="indefinite" path={`${P.users} ${P.edge}`} />
        </circle>
      ))}
      {[0, 0.45].map((b) => (
        <circle key={`g${b}`} r="2.4" className="vg-aws__pkt">
          <animateMotion dur="0.9s" begin={`-${b}s`} repeatCount="indefinite" path={P.igw} />
        </circle>
      ))}
      {SLOTS.map((s, n) => (
        <circle key={`p${n}`} r="2.4" className={`vg-aws__pkt vg-aws__pw${s.wave}`}>
          <animateMotion dur="1s" begin={`-${(n * 0.23) % 1}s`} repeatCount="indefinite" path={P.toSlot(s.x)} />
        </circle>
      ))}
      <circle r="2.4" className="vg-aws__pkt vg-aws__pkt--db">
        <animateMotion dur="0.9s" repeatCount="indefinite" path={P.db} />
      </circle>
      <circle r="2.4" className="vg-aws__pkt vg-aws__pkt--db">
        <animateMotion dur="1.1s" begin="-0.4s" repeatCount="indefinite" path={P.cache} />
      </circle>
      {[0, 0.6].map((b) => (
        <rect key={`q${b}`} x="-2.6" y="-2.6" width="5.2" height="5.2" rx="1" className="vg-aws__msg">
          <animateMotion dur="1.2s" begin={`-${b}s`} repeatCount="indefinite" path={`${P.queue} ${P.fn}`} />
        </rect>
      ))}
      <circle r="2.4" className="vg-aws__pkt vg-aws__pkt--s3">
        <animateMotion dur="1.6s" repeatCount="indefinite" path={P.store} />
      </circle>
      <circle r="2" className="vg-aws__pkt vg-aws__pkt--mon">
        <animateMotion dur="1.4s" repeatCount="indefinite" path={P.mon} />
      </circle>
    </svg>
  );
}
