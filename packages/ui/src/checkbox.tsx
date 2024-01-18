interface CheckboxProps {
  children: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
  children,
  checked = false,
  onChange,
}: CheckboxProps): JSX.Element {
  return (
    <div className="flex items-center">
      <input
        id="link-checkbox"
        type="checkbox"
        checked={checked}
        className="ui-w-4 ui-h-4 ui-text-blue-600 ui-bg-gray-100 ui-border-gray-300 ui-rounded ui-focus:ring-blue-500 "
        onChange={onChange}
      />
      <label
        htmlFor="link-checkbox"
        className="ui-ms-2 ui-text-sm ui-font-medium ui-text-gray-900"
      >
        {children}
      </label>
    </div>
  );
}
