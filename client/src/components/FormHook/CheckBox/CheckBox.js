import React from "react";
import classes from "./checkbox.module.scss"
import { Controller, useFormContext } from "react-hook-form";

function CheckBox({ value, title, isChecked, onChange,fieldName }) {
  // const {control}=useFormContext()
  const customTextStyle={
    display:"flex", 
    justifyContent:'space-between',
    padding:5,
  }
  return (
    <div className={classes.checkboxContainer} style={customTextStyle}>
      <label htmlFor={value}>{title}</label>

      {/* <Controller
      control={control}
      name={fieldName}
      rules={{ required: true }}
      render={({field,fieldState: { error } }) => (
      
        <>
     <input
        type="checkbox"
        id={value}
        value={value}
        checked={isChecked}
        onChange={onChange}
        className={classes.customCheckbox}
        {...field}
      />
      </>
      )}
      /> */}
      <input
        type="checkbox"
        id={value}
        value={value}
        checked={isChecked}
        onChange={onChange}
        className={classes.customCheckbox}
      />
    </div>
  );
}

export default CheckBox;
