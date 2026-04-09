type MercedesIconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function MercedesIcon({
  size = 75,
  color = "#f3eae3",
  className,
}: MercedesIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 75 75"
      fill="none"
      className={className}
    >
      <path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.5 6.25C20.24 6.25 6.25 20.24 6.25 37.5S20.24 68.75 37.5 68.75 68.75 54.76 68.75 37.5 54.76 6.25 37.5 6.25M11.925 22.813A29.53 29.53 0 0 1 37.156 8.025l-4.04 26.781-21.363 17.26a29.47 29.47 0 0 1 .172-29.254m25.697 44.312a29.44 29.44 0 0 1-25.484-14.403l25.375-10.503L62.98 52.562a29.5 29.5 0 0 1-25.36 14.563m4.144-31.962L37.913 8.025a29.53 29.53 0 0 1 14.506 4.063 29.56 29.56 0 0 1 10.625 10.675 29.47 29.47 0 0 1 .322 29.112z"
      />
    </svg>
  );
}
