import React from "react";
import classes from "./DateTimePicker.module.scss";
function DateTimePicker({ inputClassOverride, setDateTime, selected, type }) {
  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };
  const min = new Date().toISOString().slice(0, 16);
  return (
    <div className={classes.container}>
      <input
        type={type || "datetime-local"}
        id="datetime"
        name="datetime"
        min={min}
        value={selected}
        className={inputClassOverride}
        onChange={handleDateTimeChange}
      />
    </div>
  );
}

export default DateTimePicker;
