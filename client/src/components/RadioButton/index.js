// RadioButton.js

import React from "react";

const RadioButton = ({ label, value, checked, onChange }) => {

  return (
    <div>
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
