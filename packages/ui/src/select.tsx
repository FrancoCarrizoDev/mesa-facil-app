import { ChangeEventHandler } from "react";

type Props = {
  readonly value: string | number;
  readonly label: string;
  readonly required?: boolean;
  readonly onChange: ChangeEventHandler<HTMLSelectElement>;
  readonly size?: "small" | "medium" | "large";
  readonly options: {
    readonly value: string | number;
    readonly label: string;
  }[];
  readonly disabled?: boolean;
};

export default function Select({
  value,
  onChange,
  label,
  required = false,
  options,
  size = "small",
  disabled = false,
}: Props) {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-md",
    large: "text-lg",
  };

  return (
    <div>
      <label
        htmlFor={label}
        className="ui-block ui-pb-2 ui-text-sm ui-font-medium ui-text-gray-900 "
      >
        {label}
      </label>
      <select
        id={label}
        className={`ui-bg-white ui-border ui-border-yellow-200 ui-p-2 ui-text-yellow-950 ui-rounded-md ui-block ui-w-full ${sizeClasses[size]}`}
        required={required}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
