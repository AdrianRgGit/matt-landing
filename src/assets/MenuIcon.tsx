type Props = {
  size?: number;
  color?: string;
};

export default function MenuIcon({ size = 27, color = "#f3eae3" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 18) / 27}
      viewBox="0 0 27 18"
      fill="none"
    >
      <path fill={color} d="M0 18v-3h27v3zm0-7.5v-3h27v3zM0 3V0h27v3z" />
    </svg>
  );
}
