const ArrowIcon = ({
  size = 13,
  color = "#f3eae3",
  className = "",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 11) / 13}
      viewBox="0 0 13 11"
      fill="none"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="m7.576 10.422 5.08-5.107L7.576.208a.529.529 0 1 0-.735.746l3.801 3.833H.53a.529.529 0 0 0 0 1.057h10.113l-3.8 3.833a.529.529 0 0 0 .75.745z"
      />
    </svg>
  );
};

export default ArrowIcon;
