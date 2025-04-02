import styles from "./styles.module.css";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  minDate: Date;
  maxDate?: Date;
}

export const Calendar = ({ selectedDate, onDateChange, minDate, maxDate }: CalendarProps) => {
  const handleDateChange = (date: Dayjs | null) => {
    onDateChange(date ? date.toDate() : null);
  };

  return (
    <DatePicker
      className={styles.datePicker}
      onChange={handleDateChange}
      placeholder="Выберите дату"
      format="DD/MM/YYYY"
      value={selectedDate ? dayjs(selectedDate) : null}
      disabledDate={(current) =>
        Boolean(current && (current.isBefore(dayjs(minDate), "day") || (maxDate && current.isAfter(dayjs(maxDate), "day"))))
      }
    />
  );
};