import React, { useState, useEffect, useRef } from "react";

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
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    onMonthChange(month);
    setShowModal(false);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    onYearChange(year);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentDate = new Date(selectedYear, selectedMonth - 1);
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="month-picker">
      {!showModal && (
        <div
          className="date-picker-icon"
          onClick={() => setShowModal(!showModal)}
        >
          Month Picker
        </div>
      )}
      {showModal && (
        <div ref={modalRef} className="month-picker-modal">
          <div className="date-picker-header">{formattedDate}</div>
          <div className="year-selector">
            <button
              className="arrowBtn"
              onClick={() => handleYearChange(selectedYear - 1)}
            >
              &lt;
            </button>
            <span>{selectedYear}</span>
            <button
              className="arrowBtn"
              onClick={() =>
                handleYearChange(
                  selectedYear === new Date().getFullYear()
                    ? selectedYear
                    : selectedYear + 1
                )
              }
            >
              &gt;
            </button>
          </div>
          <div className="month-grid">
            {months.map((month) => (
              <div
                key={month}
                className={`month-option ${
                  month === selectedMonth ? "selected" : ""
                }`}
                onClick={() => handleMonthChange(month)}
              >
                {new Date(selectedYear, month - 1).toLocaleString("default", {
                  month: "short",
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
