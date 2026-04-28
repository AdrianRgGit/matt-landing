import ArrowIcon from "../../../assets/ArrowIcon";

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
      className={`flex cursor-pointer group
        ${className}`}
    >
      <div
        className="w-fit p-3 flex items-center bg-theme-blue rounded-md transition-colors duration-200 group-hover:bg-theme-blue/80
          md:p-3.5
          xl:p-4 xl:rounded-lg"
      >
        <span
          className="text-sm font-spacegrotesk-light text-font-white
            xl:text-base"
        >
          {text}
        </span>
      </div>

      <div
        className="w-11 flex items-center justify-center self-stretch border-[3px] border-theme-blue rounded-md
          md:w-12
          xl:w-14 xl:border-4 xl:rounded-lg"
      >
        <ArrowIcon
          color="#6984a9"
          size={20}
          className="w-4 -rotate-45
            xl:w-5"
        />
      </div>
    </button>
  );
}
