import React from "react";

function CheckBox({ value, title, isChecked, onChange }) {
  return (
    <div>
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      <label for={value}>{title}</label>
    </div>
  );
}

export default CheckBox;
