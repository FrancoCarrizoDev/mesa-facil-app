interface CheckboxProps {
  id: string;
  children: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  children,
  checked = false,
  onChange,
  id,
}: CheckboxProps): JSX.Element {
  return (
    <div className="ui-flex ui-items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-border-gray-300 ui-rounded focus:ui-ring-blue-500"
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="ui-ms-2 ui-text-sm ui-font-medium ui-text-gray-900"
      >
        {children}
      </label>
    </div>
  );
}
