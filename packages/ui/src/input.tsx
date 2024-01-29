interface InputProps {
  autoComplete?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: "text" | "email" | "password" | "time";
  value: string;
  onBlur?: () => void;
}

export default function Input({
  autoComplete = "none",
  onChange,
  value,
  disabled = false,
  error = false,
  errorText,
  label,
  placeholder = "",
  type = "text",
  required = false,
  onBlur,
}: InputProps): JSX.Element {
  return (
    <div className="">
      <label
        className="ui-block ui-mb-2 ui-text-sm ui-font-medium ui-text-gray-900 "
        htmlFor={label}
      >
        {label}
        {required && <span className="ui-text-red-600 ui-ms-1">*</span>}
        {Boolean(error) && (
          <span className=" ui-text-sm  ui-text-red-600 ui-font-medium">
            {errorText}
          </span>
        )}
      </label>
      <input
        autoComplete={autoComplete}
        className="ui-block ui-w-full  ui-py-1 ui-px-2 ui-text-gray-900 ui-transition-all  ui-rounded-lg  ui-border ui-border-gray-200  ui-sm:text-xs focus:ui-transition-all focus:ui-outline focus:ui-outline-yellow-400"
        disabled={disabled}
        id={label}
        name={label}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={(e) => {
          if (onBlur) onBlur();
        }}
      />
    </div>
  );
}
