import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { es } from "@repo/common/date";

registerLocale("es", es);
interface DatePickerProps {
  readonly selectedDate: Date | null | undefined;
  readonly onChange: (date: Date | null) => void;
  readonly minDate: Date | null | undefined;
  readonly maxDate: Date | null | undefined;
  readonly placeholderText: string | undefined;
  readonly filterDate?: (date: Date) => boolean;
  readonly filterTime?: (time: Date) => boolean;
  readonly showTimeSelect?: boolean;
  readonly timeIntervals?: number;
  readonly dateFormat?: string;
  readonly dropdownMode?: "scroll" | "select";
  readonly peekNextMonth?: boolean;
  readonly showMonthDropdown?: boolean;
  readonly showYearDropdown?: boolean;
  readonly disabled?: boolean;
}

export default function DatePicker({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  filterDate,
  filterTime,
  placeholderText,
  showTimeSelect = false,
  timeIntervals = 15,
  dateFormat = "MMMM d, yyyy HH:mm",
  peekNextMonth = false,
  showMonthDropdown = false,
  showYearDropdown = false,
  dropdownMode = "scroll",
  disabled = false,
}: DatePickerProps): JSX.Element {
  return (
    <ReactDatePicker
      calendarStartDay={1}
      className="w-full ui-py-1 ui-px-2 fullborder border bg-lemon-50 border-lemon-200 text-gray-500 rounded-md placeholder:text-gray-500 placeholder:text-sm py-1 px-2 normal-case"
      dateFormat={dateFormat}
      disabled={disabled}
      dropdownMode={dropdownMode}
      filterDate={filterDate}
      filterTime={filterTime}
      locale="es"
      maxDate={maxDate}
      minDate={minDate}
      onChange={onChange}
      peekNextMonth={peekNextMonth}
      placeholderText={placeholderText}
      selected={selectedDate}
      showMonthDropdown={showMonthDropdown}
      showTimeSelect={showTimeSelect}
      showYearDropdown={showYearDropdown}
      timeIntervals={timeIntervals}
      wrapperClassName="w-full"
    />
  );
}
