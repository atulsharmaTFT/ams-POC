import React from "react";
import classes from "./DateTimePicker.module.scss";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import moment from "moment";
function DateTimePicker({
  overrideClassName,
  inputClassOverride,
  fieldName,
  onChange,
  selected,
  defaultValue,
  type,
  label,
  labelClassName,
  overrideErrorClassName,
  error,
}) {
  const { control } = useFormContext();
  const min = new Date().toISOString().slice(0, 16);
  return (
    <div className={`${classes.container} ${overrideClassName}`}>
      {label && (
        <div className={`${classes.label} ${labelClassName}`}>{label}</div>
      )}
      <Controller
        control={control}
        name={fieldName}
        shouldUnregister={false}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              type="date"
              min={min}
              value={field?.value ? moment(field?.value).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")}
              className={` ${inputClassOverride}${error ? classes.errorBorder : ''}`}
              onChange={(e) => field.onChange(e.target.value)}
              {...field}
            />
            <ErrorMessage
              error={error?.message}
              overrideErrorClassName={overrideErrorClassName}
            />
          </>
        )}
      />
    </div>
  );
}

export default DateTimePicker;
