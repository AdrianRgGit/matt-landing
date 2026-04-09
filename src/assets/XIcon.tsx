type Props = {
  size?: number;
  color?: string;
};

export default function XIcon({ size = 27, color = "#f3eae3" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 27 27"
      fill="none"
    >
      <path
        fill={color}
        d="M7.2 21.375 5.625 19.8l6.3-6.3-6.3-6.3L7.2 5.625l6.3 6.3 6.3-6.3L21.375 7.2l-6.3 6.3 6.3 6.3-1.575 1.575-6.3-6.3z"
      />
    </svg>
  );
}
