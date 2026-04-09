type SideX = "left" | "right";
type SideY = "top" | "bottom";

type AxisX = {
  side?: SideX;
  startAt?: number;
  strength?: number;
};

type AxisY = {
  side?: SideY;
  startAt?: number;
  strength?: number;
};

interface Props {
  x?: AxisX;
  y?: AxisY;
}

export default function CustomOverlay({ x, y }: Props) {
  const xSide = x?.side ?? "left";
  const xStart = x?.startAt ?? 40;
  const xStrength = x?.strength ?? 0.8;

  const ySide = y?.side ?? "bottom";
  const yStart = y?.startAt ?? 40;
  const yStrength = y?.strength ?? 0.8;

  const background = (() => {
    if (x && !y) {
      return xSide === "right"
        ? `linear-gradient(to right, transparent 0%, transparent ${xStart}%, rgba(0,0,0,${xStrength}) 100%)`
        : `linear-gradient(to left, transparent 0%, transparent ${xStart}%, rgba(0,0,0,${xStrength}) 100%)`;
    }

    if (y && !x) {
      return ySide === "bottom"
        ? `linear-gradient(to top, transparent 0%, transparent ${yStart}%, rgba(0,0,0,${yStrength}) 100%)`
        : `linear-gradient(to bottom, transparent 0%, transparent ${yStart}%, rgba(0,0,0,${yStrength}) 100%)`;
    }

    if (x && y) {
      const cornerX = xSide === "right" ? "right" : "left";
      const cornerY = ySide === "bottom" ? "bottom" : "top";

      const xRadius = 100 - xStart;
      const yRadius = 100 - yStart;

      const s = Math.max(xStrength, yStrength);

      return `radial-gradient(
        ellipse ${xRadius}% ${yRadius}% at ${cornerX} ${cornerY},
        rgba(0,0,0,${s}) 0%,
        rgba(0,0,0,${s * 0.5}) 35%,
        transparent 70%
      )`;
    }

    return `linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)`;
  })();

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background }}
    />
  );
}
