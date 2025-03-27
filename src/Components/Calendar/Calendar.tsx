import styles from "./styles.module.css";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  minDate: Date;
}

export const Calendar = ({ selectedDate, onDateChange, minDate }: CalendarProps) => {
  const handleDateChange = (date: any) => {
    const newDate = date ? date.toDate() : null;
    onDateChange(newDate);
  };

  return (
    <>
      <DatePicker
        className={styles.datePicker}
        onChange={handleDateChange}
        placeholder="Выберите дату"
        format="DD/MM/YYYY"
        value={selectedDate ? dayjs(selectedDate) : null} // Преобразуем Date в Dayjs
        disabledDate={(current) => current && current.isBefore(dayjs(minDate), 'day')} // Сравниваем Dayjs с Dayjs
      />
    </>
  );
};
