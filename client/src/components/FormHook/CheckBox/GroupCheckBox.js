import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import classes from "./checkbox.module.scss"
function GroupCheckBox({ name, options, onChange, defaultValue }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {options.map((option, index) => (
        <div className={classes.checkboxContainer} key={index}>
          <Controller
            name={`${name}[${index}].checked`}
            control={control}
            defaultValue={option?.checked}
            shouldUnregister={false}
            render={({ field }) => (
              <>
                <input
                  type="checkbox"
                  id={option?.option}
                  checked={field.value}
                  className={classes.customCheckbox}
                  {...field}
                />
                <label className={classes.customLabel}>{option?.option}</label>
              </>
            )}
          />
          <Controller
            name={`${name}[${index}].option`}
            control={control}
            defaultValue={option?.option}
            render={({ field }) => <input type="hidden" {...field} />}
          />
        </div>
      ))}
      {errors[name]?.message?.length > 0 && (
        <ErrorMessage error={errors[name]?.message} />
      )}
    </div>
  );
}

export { GroupCheckBox };
