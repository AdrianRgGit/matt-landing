type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  label: string;
  name: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  options: Option[];
};

export function CustomSelect({
  label,
  name,
  id,
  value,
  defaultValue,
  onChange,
  required = false,
  className = "",
  disabled = false,
  options,
}: CustomSelectProps) {
  const inputId = id ?? name;

  return (
    <div className={`relative w-full ${className}`}>
      <select
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="peer w-full border-0 border-b border-theme-blue bg-transparent px-0 pt-7 pb-2 text-2xl text-theme-black outline-none transition-all duration-300 disabled:opacity-50"
      >
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-0 text-theme-black/60 transition-all duration-300 ease-in-out top-6 peer-focus:top-1 peer-focus:text-sm peer-focus:text-theme-blue peer-[&:valid]:top-1 peer-[&:valid]:text-sm peer-[&:valid]:text-theme-blue"
      >
        {label}
        {required ? "*" : ""}
      </label>
    </div>
  );
}
