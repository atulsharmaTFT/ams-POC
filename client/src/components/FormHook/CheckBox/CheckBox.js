import React from "react";
import classes from "./checkbox.module.scss"

function CheckBox({ value, title, isChecked, onChange }) {
  const customTextStyle={
    display:"flex", 
    justifyContent:'space-between',
    padding:5,
  }
  return (
    <div className={classes.checkboxContainer} style={customTextStyle}>
      <label htmlFor={value}>{title}</label>
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
