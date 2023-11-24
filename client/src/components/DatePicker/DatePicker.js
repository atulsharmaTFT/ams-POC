import React from "react";

function DatePicker({ title, onChange }) {
  return (
    <div>
      <label for={title}>{title}</label>
      <input type="date" name={title} onChange={onChange} />
    </div>
  );
}

export default DatePicker;
