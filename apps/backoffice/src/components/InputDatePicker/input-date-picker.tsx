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
  minDate?: Date | null;
  maxDate?: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText: string | undefined;
  readonly showTimeSelect?: boolean;
  readonly timeIntervals?: number;
  readonly dateFormat?: string;
  readonly peekNextMonth?: boolean;
  readonly showMonthDropdown?: boolean;
  readonly showYearDropdown?: boolean;
  readonly dropdownMode?: "scroll" | "select";
}

export default function InputDatePicker({
  label,
  required = false,
  error = false,
  errorText,
  selectedDate,
  filterDate,
  filterTime,
  maxDate = null,
  minDate = null,
  onChange,
  placeholderText,
  showTimeSelect,
  timeIntervals,
  dateFormat,
  peekNextMonth,
  showMonthDropdown,
  showYearDropdown,
  dropdownMode,
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
        showTimeSelect={showTimeSelect}
        timeIntervals={timeIntervals}
        dateFormat={dateFormat}
        peekNextMonth={peekNextMonth}
        showMonthDropdown={showMonthDropdown}
        showYearDropdown={showYearDropdown}
        dropdownMode={dropdownMode}
      />
    </div>
  );
}
