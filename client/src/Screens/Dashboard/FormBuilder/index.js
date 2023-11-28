import React, { useState } from 'react';


export const fieldDetails= [
  {
    elementType: 'Input',
    elementAttributes: ['placeholder', 'label', 'defaultValue'],
  },
  {
    elementType: 'Date',
    elementAttributes: ['maxDate', 'minDate'],
    inputType: 'date',
  },
  {
    elementType: 'Radio',
    elementAttributes: ['label', 'options'],
  },
  {
    elementType: 'Dropdown',
    elementAttributes: ['label', 'options'],
  },
];


const FormBuilder= ({ onFormSubmit }) => {
  const [selectedField, setSelectedField] = useState('');
  const [fieldAttributes, setFieldAttributes] = useState({});
  const [newOption, setNewOption] = useState('');

  const handleFieldSelect = (elementType) => {
    setSelectedField(elementType);
    setFieldAttributes({});
    setNewOption('');
  };

  const handleAttributeChange = (attribute , value) => {
    setFieldAttributes((prevAttributes) => ({ ...prevAttributes, [attribute]: value }));
  };

const handleAddOption = () => {
    if (newOption.trim() !== '') {
      const optionsArray = Array.isArray(fieldAttributes.options) ? fieldAttributes.options : [];
      handleAttributeChange('options', [...optionsArray, newOption.trim()]);
      setNewOption('');
    }
  };
  

  const handleRemoveOption = (index) => {
    const updatedOptions = (fieldAttributes['options']).filter((_, i) => i !== index);
    handleAttributeChange('options', updatedOptions);
  };

  const handleAddField = () => {
    if (selectedField) {
      const newField = {
        type: selectedField,
        attributes: { ...fieldAttributes },
      };
      onFormSubmit([newField]);
      setSelectedField('');
      setFieldAttributes({});
      setNewOption('');
    }
  };

  return (
    <div>
      <h2>Form Builder</h2>
      <div>
        <label>Select Field Type:</label>
        <select value={selectedField} onChange={(e) => handleFieldSelect(e.target.value)}>
          <option value="">Select Field</option>
          {fieldDetails.map((field) => (
            <option key={field.elementType} value={field.elementType}>
              {field.elementType}
            </option>
          ))}
        </select>
      </div>

      {selectedField && (
        <div>
          <h3>Attributes for {selectedField}</h3>
          {fieldDetails
            .find((field) => field.elementType === selectedField)
            ?.elementAttributes.map((attribute) => (
              <div key={attribute}>
                <label>{attribute}:</label>
                {attribute === 'options' ? (
                  <div>
                    {(fieldAttributes[attribute])?.map((option, index) => (
                      <div key={index}>
                        <span>{option}</span>
                        <button onClick={() => handleRemoveOption(index)}>Remove</button>
                      </div>
                    ))}
                    <input
                      type="text"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                    />
                    <button onClick={handleAddOption}>Add Option</button>
                  </div>
                ) : (
                  <input
                    type={
                      fieldDetails.find((field) => field.elementType === selectedField)?.inputType || 'text'
                    }
                    value={fieldAttributes[attribute] || ''}
                    onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                  />
                )}
              </div>
            ))}
          <button onClick={handleAddField}>Add Field</button>
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
