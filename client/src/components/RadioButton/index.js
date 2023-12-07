// RadioButton.js

import React from "react";
import classes from './RadioButton.module.scss';

const RadioButton = ({ label,value, checked, onChange }) => {

  console.log(checked)
  return (
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
  );
};

export default RadioButton;
