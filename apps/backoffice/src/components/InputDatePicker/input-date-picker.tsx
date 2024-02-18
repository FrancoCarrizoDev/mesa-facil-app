import React from "react";
import DatePicker from "../DatePicker/date-picker";

interface InputDatePickerProps {
  label: string;
  required: boolean | undefined;
  error: boolean | undefined;
  errorText?: string;
  selectedDate: Date | null | undefined;
  filterDate?: (date: Date) => boolean;
  filterTime?: (date: Date) => boolean;
  minDate: Date | null | undefined;
  maxDate: Date | null | undefined;
  onChange: (date: Date | null) => void;
  placeholderText: string | undefined;
}

export default function InputDatePicker({
  label,
  required = false,
  error = false,
  errorText,
  selectedDate,
  filterDate,
  filterTime,
  maxDate,
  minDate,
  onChange,
  placeholderText,
}: InputDatePickerProps): JSX.Element {
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
      <DatePicker
        selectedDate={selectedDate}
        filterDate={filterDate}
        filterTime={filterTime}
        maxDate={maxDate}
        minDate={minDate}
        onChange={onChange}
        placeholderText={placeholderText}
      />
    </div>
  );
}
