import { CODELOGS_DOTS } from "@/lib/logoDots";

type Props = {
  fill?: string;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function LogoMark({
  fill = "#0373fe",
  scale = 0.9,
  className,
  style,
}: Props) {
  return (
    <svg
      viewBox="-1 -1 2 2"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <g fill={fill}>
        {CODELOGS_DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.x * scale}
            cy={d.y * scale}
            r={d.r * scale}
            fill={fill}
          />
        ))}
      </g>
    </svg>
  );
}
