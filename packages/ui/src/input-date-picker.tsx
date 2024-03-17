import DatePicker from "./date-picker";

interface InputDatePickerProps {
  readonly label: string;
  readonly required: boolean | undefined;
  readonly error: boolean | undefined;
  readonly errorText?: string;
  readonly selectedDate: Date | null | undefined;
  readonly filterDate?: (date: Date) => boolean;
  readonly filterTime?: (date: Date) => boolean;
  readonly minDate?: Date | null;
  readonly maxDate?: Date | null;
  readonly onChange: (date: Date | null) => void;
  readonly placeholderText: string | undefined;
  readonly showTimeSelect?: boolean;
  readonly timeIntervals?: number;
  readonly dateFormat?: string;
  readonly peekNextMonth?: boolean;
  readonly showMonthDropdown?: boolean;
  readonly showYearDropdown?: boolean;
  readonly dropdownMode?: "scroll" | "select";
  readonly disabled?: boolean;
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
  disabled,
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
        disabled={disabled}
      />
    </div>
  );
}
