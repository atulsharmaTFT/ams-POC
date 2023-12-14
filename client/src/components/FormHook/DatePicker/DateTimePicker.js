import React from "react";
import classes from "./DateTimePicker.module.scss";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
function DateTimePicker({overrideClassName, inputClassOverride, fieldName,onChange, selected, defaultValue, type, label, labelClassName,overrideErrorClassName, error }) {
  const { control } = useFormContext();
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
      {/* <Controller
     name={fieldName}
     control={control}
     defaultValue={defaultValue}
     render={({ field, fieldState: { error } }) => ( */}
      <>
      <input
        type="date"
        id="datetime"
        name="datetime"
        min={min}
        value={selected}
        defaultValue={defaultValue}
        className={inputClassOverride}
        onChange={onChange}
      />
      <ErrorMessage
        error={error}
        overrideErrorClassName={overrideErrorClassName}
      />
      </>
     {/* )}
     /> */}
    </div>
  );
}

export default DateTimePicker;
