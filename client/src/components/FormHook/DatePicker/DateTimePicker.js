import React from "react";
import classes from "./DateTimePicker.module.scss";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import moment from "moment"
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
      defaultValue={control?.defaultValues?.fieldName}
      render={({ field, fieldState: { error } }) => ( */}
      <>
      <input
        type="date"
        id="datetime"
        name="datetime"
        min={min}
        // value={moment(field?.value).format("YYYY-MM-DD")}
        // defaultValue={moment(field?.value).format("YYYY-MM-DD")}
        value={moment(selected).format("YYYY-MM-DD")}
        defaultValue={moment(defaultValue).format("YYYY-MM-DD")}
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
