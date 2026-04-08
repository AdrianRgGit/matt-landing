type CustomTextareaProps = {
  label: string;
  name: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  rows?: number;
};

export function CustomTextarea({
  label,
  name,
  id,
  value,
  defaultValue,
  onChange,
  required = false,
  className = "",
  disabled = false,
  rows = 3,
}: CustomTextareaProps) {
  const inputId = id ?? name;

  return (
    <div className={`relative w-full ${className}`}>
      <textarea
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        rows={rows}
        placeholder=" "
        className="peer w-full resize-none border-0 border-b border-theme-blue bg-transparent px-0 pt-7 pb-2 text-lg text-theme-black outline-none transition-all duration-300 disabled:opacity-50"
      />

      <label
        htmlFor={inputId}
        className="pointer-events-none absolute left-0 text-theme-black/60 transition-all duration-300 ease-in-out top-6 peer-placeholder-shown:text-2xl peer-focus:top-1 peer-focus:text-sm peer-focus:text-theme-blue peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-theme-blue"
      >
        {label}
        {required ? "*" : ""}
      </label>
    </div>
  );
}
