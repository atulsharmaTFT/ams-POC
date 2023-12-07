import React from "react";
import classes from "./DateTimePicker.module.scss";
function DateTimePicker({overrideClassName, inputClassOverride, onChange, selected, defaultValue, type, label, labelClassName }) {
  // const handleDateTimeChange = (event) => {
  //   setDateTime(new Date(event.target.value).toISOString().split('T')[0]);
  // };
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
        // value={selected}
        defaultValue={defaultValue}
        className={inputClassOverride}
        onChange={onChange}
      />
    </div>
  );
}

export default DateTimePicker;
