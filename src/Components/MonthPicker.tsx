import React, { useState, ChangeEvent } from "react";

interface MonthPickerProps {
  onMonthChange: (selectedMonth: number) => void;
  onYearChange: (selectedYear: number) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
  onMonthChange,
  onYearChange,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const month = Number(e.target.value);
    setSelectedMonth(month);
    onMonthChange(month);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    setSelectedYear(year);
    onYearChange(year);
  };

  return (
    <div className="month-picker">
      <select value={selectedMonth} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {new Date(selectedYear, month - 1).toLocaleString("default", {
              month: "long",
            })}
          </option>
        ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default MonthPicker;
