import React, { useState } from 'react';

const App = () => {
  const initialFormState = {
    userName: '',
    contact: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e, variable) => {
    const { value } = e.target;
    setFormData({ ...formData, [variable]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const formConfig = {
    Name: {
      variable: 'userName',
      type: 'string',
    },
    Contact: {
      variable: 'contact',
      type: 'number',
    },
  };

  return (
    <div>
      <h2>{`Create ${formConfig.Name.variable}`}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formConfig).map((key) => {
          const { variable, type } = formConfig[key];
          return (
            <div key={variable}>
              <label htmlFor={variable}>{key}:</label>
              {type === 'DropDown' ? (
                <select id={variable} onChange={(e) => handleChange(e, variable)}>
                  <option value="">Select...</option>
                  {formData.userArray.map((item) => (
                    <option key={item.variable} value={item.variable}>
                      {item.key}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  id={variable}
                  value={formData[variable]}
                  onChange={(e) => handleChange(e, variable)}
                />
              )}
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
