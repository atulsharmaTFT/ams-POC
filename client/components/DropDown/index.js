import React, { useState } from 'react';

const Dropdown = ({options}) => {
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle option selection
  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelect}>
        <option value="">Select...</option>
        {options.map((option)=> <option value={option?.id}>{option?.name}</option>)}
        
      </select>
      {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
  );
};

export default Dropdown;
