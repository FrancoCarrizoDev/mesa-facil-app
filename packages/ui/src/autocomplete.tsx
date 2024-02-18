interface AutocompleteProps<T> {
  items: T[];
  onSelect: (value: T) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  error?: boolean;
  errorText?: string;
  displayProperty: keyof T;
  placeholder?: string;
}

export default function Autocomplete<T>({
  items,
  onSelect,
  value,
  onChange,
  label,
  required = false,
  error = false,
  errorText,
  displayProperty,
  placeholder = "",
}: AutocompleteProps<T>): JSX.Element {
  return (
    <div>
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
        className="ui-block ui-w-full  ui-py-1 ui-px-2 ui-text-gray-900 ui-transition-all  ui-rounded-lg  ui-border ui-border-gray-200  ui-sm:text-xs focus:ui-transition-all focus:ui-outline focus:ui-outline-yellow-400"
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        value={value}
      />
      <ul className="ui-bg-white ui-block ui-w-full  ui-text-gray-900 ui-transition-all  ui-rounded-lg  ui-border ui-border-gray-200  ui-sm:text-xs focus:ui-transition-all focus:ui-outline focus:ui-outline-yellow-400">
        {items.map((item, i) => (
          <li
            className="ui-cursor-pointer ui-py-1 ui-px-2 ui-text-gray-900 ui-transition-all ui-rounded-lg hover:ui-bg-gray-100"
            key={i}
            onClick={() => {
              onSelect(item);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSelect(item);
              }
            }}
            role="presentation"
          >
            {item[displayProperty] as string}
          </li>
        ))}
      </ul>
    </div>
  );
}
