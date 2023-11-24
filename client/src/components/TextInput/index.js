import React, { useState } from 'react';

const TextInput = ({ label, onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    // If you want to pass the updated value to a parent component, use the onChange prop
    if (onChange) {
      onChange(inputValue);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
