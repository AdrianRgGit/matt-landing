type ButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
};

export default function CustomButton({
  text = "Partner with us",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex cursor-pointer group ${className}`}
    >
      <div className="bg-theme-blue w-fit p-4 rounded-lg group-hover:bg-theme-blue/80 transition-colors duration-200">
        <span className="font-spacegrotesk-light text-font-white">{text}</span>
      </div>

      <div className="border-4 border-theme-blue rounded-lg w-12 flex items-center justify-center">
        f
      </div>
    </button>
  );
}
