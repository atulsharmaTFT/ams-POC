import React from "react";
import classes from "./DateTimePicker.module.scss";
function DateTimePicker({overrideClassName, inputClassOverride, setDateTime, selected, type, label, labelClassName }) {
  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };
  const min = new Date().toISOString().slice(0, 16);
  return (
    <div className={`${classes.container} ${overrideClassName}`}>
       {label && (
        <div className={`${classes.label} ${labelClassName}`}>
          {label}
        </div>
      )}
      <input
        type="date"
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
