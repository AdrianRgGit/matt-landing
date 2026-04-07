interface NameTagProps {
  name: string;
  role: string;
  isActive: boolean;
  onActivate: () => void;
}

export default function NameTag({
  name,
  role,
  isActive,
  onActivate,
}: NameTagProps) {
  return (
    <div
      className={`flex flex-col cursor-pointer transition-all duration-300 origin-left xl:flex-row xl:items-center xl:gap-4 ${
        isActive ? "opacity-100 scale-100" : "opacity-30 scale-90"
      }`}
      onMouseEnter={onActivate}
      onClick={onActivate}
    >
      <p className="text-2xl xl:order-2 xl:text-5xl">{name}</p>
      <small className="xl:order-1 xl:text-xl">{role}</small>
    </div>
  );
}
