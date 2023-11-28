import React from "react";

function CheckBox({ value, title, isChecked, onChange }) {
  const customTextStyle={
    display:"flex", 
    justifyContent:'space-between',
    padding:5,
  }
  return (
    <div style={customTextStyle}>
      <label for={value}>{title}</label>
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={onChange}
      />
      
    </div>
  );
}

export default CheckBox;
