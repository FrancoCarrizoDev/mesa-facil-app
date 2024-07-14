import React, { useState, useRef, useEffect } from "react";

interface AutocompleteProps<T> {
  items: T[];
  onSelect: (value: T | undefined) => void;
  selectKey: keyof T;
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
  selectKey,
}: AutocompleteProps<T>): JSX.Element {
  const [showList, setShowList] = useState(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={autocompleteRef}>
      <label
        className="ui-block ui-mb-2 ui-text-sm ui-font-medium ui-text-gray-900 "
        htmlFor={label}
      >
        {label}
        {required ? <span className="ui-text-red-600 ui-ms-1">*</span> : null}
        {Boolean(error) && (
          <span className=" ui-text-sm  ui-text-red-600 ui-font-medium">
            {errorText}
          </span>
        )}
      </label>
      <div className="relative">
        <input
          autoComplete="new-password"
          className="ui-block ui-w-full  ui-py-1 ui-px-2 ui-text-gray-900 ui-transition-all  ui-rounded-lg  ui-border ui-border-gray-200  ui-sm:text-xs focus:ui-transition-all focus:ui-outline focus:ui-outline-gray-400"
          onBlur={() => {
            setTimeout(() => {
              setShowList(false);
            }, 200);
            const selectedItem = items.find(
              (item) => item[selectKey] === value
            );
            onSelect(selectedItem);
          }}
          onChange={onChange}
          onFocus={() => {
            setShowList(true);
          }}
          placeholder={placeholder}
          type="text"
          value={value}
        />
        {showList ? (
          <ul className="ui-bg-white ui-absolute ui-z-10 ui-min-w-[240px] ui-text-gray-900 ui-transition-all  ui-rounded-lg  ui-border ui-border-gray-200  ui-sm:text-xs focus:ui-transition-all focus:ui-outline focus:ui-outline-gray-400">
            {items.length ? (
              items.map((item) => (
                <li
                  className="ui-cursor-pointer ui-py-1 ui-px-2 ui-text-gray-900 ui-transition-all ui-rounded-lg hover:ui-bg-gray-100 focus:ui-gray-100"
                  key={item[selectKey] as string}
                  onClick={() => {
                    onSelect(item);
                    setShowList(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSelect(item);
                      setShowList(false);
                    }
                  }}
                  role="presentation"
                >
                  {item[displayProperty] as string}
                </li>
              ))
            ) : (
              <li className="ui-cursor-pointer ui-py-1 ui-px-2 ui-text-gray-900 ui-transition-all ui-rounded-lg hover:ui-bg-gray-100">
                No results
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
