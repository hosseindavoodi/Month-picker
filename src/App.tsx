import { useState } from "react";
import MonthPicker from "./Components/MonthPicker";
import "./App.css";

function App() {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const currentDate = new Date(selectedYear, selectedMonth - 1);
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    month: "short",
  });
  return (
    <div className="App">
      <MonthPicker
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />
      <p>
        {formattedDate} - {selectedYear}
      </p>
    </div>
  );
}

export default App;
