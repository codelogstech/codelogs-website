// Clients shown on the homepage wall: co-operative societies and banks
// running ProBank (shortlisted from the client list by branch count) mixed
// with businesses we've built products for. Logos are the clients' own
// (public/assets/clients/); anyone with no published logo shows an initials
// tile.

export type Client = { name: string; logo?: string };

export const CLIENTS: Client[] = [
  { name: "Shri Saraswathi Credit Souharda Sahakari", logo: "/assets/clients/saraswathi.webp" },
  { name: "Vionna", logo: "/assets/clients/vionna.webp" },
  { name: "BulletDraw", logo: "/assets/clients/bulletdraw.webp" },
  { name: "Karavali Credit Co-operative", logo: "/assets/clients/karavali.webp" },
  { name: "Mahaveera Credit Co-operative", logo: "/assets/clients/mahaveera.webp" },
  { name: "Complete Omics", logo: "/assets/clients/omics.webp" },
  { name: "Vega Transport India", logo: "/assets/clients/vega.webp" },
  { name: "Bantwal Catholic Credit Co-operative", logo: "/assets/clients/bantwal.webp" },
  { name: "Badagabettu Credit Co-operative", logo: "/assets/whitelabel/chethana.webp" },
  { name: "Novigo Solutions", logo: "/assets/clients/novigo.webp" },
  { name: "Korangrapady Co-operative Agricultural Bank", logo: "/assets/clients/korangrapady.webp" },
  { name: "Udupi Catholic Credit Co-operative", logo: "/assets/clients/udupi-catholic.webp" },
  { name: "Udupi LAMPS Co-operative", logo: "/assets/clients/lamps.webp" },
  { name: "Narayanaguru Urban Co-operative Bank", logo: "/assets/clients/narayana.webp" },
  { name: "Soundarya Souharda Credit Co-operative", logo: "/assets/whitelabel/soundarya.webp" },
  { name: "Rosary Credit Co-operative" },
  { name: "Kota Co-operative Agricultural Bank" },
  { name: "Mangala Co-operative" },
  { name: "Bhatkal PLD Bank" },
  { name: "Samaja Seva Co-operative" },
  { name: "Gurumachideva Credit Co-operative" },
  { name: "Sumangala Credit Co-operative" },
  { name: "Rajapura Credit Co-operative" },
];
