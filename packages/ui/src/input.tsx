interface InputProps {
  autoComplete?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "time";
  value: string;
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
}: InputProps): JSX.Element {
  return (
    <div>
      <label
        className="ui-block ui-mb-2 ui-text-sm ui-font-medium ui-text-gray-900 "
        htmlFor={label}
      >
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className="ui-block ui-w-full  ui-py-1 ui-px-2  ui-text-gray-900  ui-border  ui-border-gray-300  ui-rounded-lg  ui-bg-gray-50  ui-sm:text-xs  ui-focus:ring-blue-500  ui-focus:border-blue-500"
        disabled={disabled}
        id={label}
        name={label}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {Boolean(error) && (
        <p className="ui-mt-2 ui-text-sm ui-text-red-600">
          <span className="ui-font-medium">{errorText}</span> Some error
          message.
        </p>
      )}
    </div>
  );
}
