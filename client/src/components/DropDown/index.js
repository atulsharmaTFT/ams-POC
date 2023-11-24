import React, { useState } from 'react';

const Dropdown = ({title, options, selectedOption, setSelectedOption}) => {
  // State to manage the selected option


  // Function to handle option selection
  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">{title}</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelect}>
        <option value="">Select...</option>
        {options.map((option)=> <option value={option?.name}>{option?.name}</option>)}
        
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;
