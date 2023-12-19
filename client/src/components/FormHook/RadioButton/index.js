// RadioButton.js

import React from "react";
import classes from './RadioButton.module.scss';
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const RadioButton = ({ label,value, checked, onChange,fieldName,overrideErrorClassName }) => {
  const { control } = useFormContext();
  return (
 
      <Controller
     name={fieldName}
     control={control}
     render={({ field, fieldState: { error } }) => (
      <>
      <div className={classes.radioInput}>
      <input
        type="radio"
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value}>{label}</label>
      </div>
      <ErrorMessage
        error={error}
        overrideErrorClassName={overrideErrorClassName}
      />
      </>
  )}
    />
  );
};

export default RadioButton;
