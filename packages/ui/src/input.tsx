import Spinner from "../../../apps/backoffice/src/components/Spinner/Spinner";
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
  isLoading?: boolean;
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
  isLoading = false,
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
      <div className="ui-inline-block ui-relative w-full">
        <input
          autoComplete={autoComplete}
          className="ui-block ui-w-full  ui-py-1 ui-px-2 ui-text-gray-900 ui-transition-all  ui-rounded-lg  ui-border ui-border-gray-200  ui-sm:text-xs focus:ui-transition-all focus:ui-outline focus:ui-outline-yellow-400"
          disabled={disabled}
          id={label}
          name={label}
          onBlur={() => {
            if (onBlur) onBlur();
          }}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        <div
          style={{
            position: "absolute",
            right: "8px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {isLoading && <Spinner size="sm" />}
        </div>
      </div>
    </div>
  );
}
