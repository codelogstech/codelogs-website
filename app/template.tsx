// Re-mounts on every route change, giving each page a soft rise-in.
// The keyframes end on `transform: none`, so sticky/fixed descendants
// behave normally once the entrance completes.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
