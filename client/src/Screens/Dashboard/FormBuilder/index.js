import React, { useState } from "react";
import { Capitalize } from "../../../helper/commonHelpers";
import SlideSwitch from "../../../components/Switch";
import classes from "./form.module.scss";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Button from "../../../components/Button/Button";
export const fieldDetails = [
  {
    elementType: "Text",
    elementAttributes: ["placeholder", "defaultValue"],
  },
  {
    elementType: "Number",
    elementAttributes: ["placeholder", "defaultValue", "minimum", "maximum"],
  },
  {
    elementType: "Date",
    elementAttributes: ["maxDate", "minDate"],
    inputType: "date",
  },
  {
    elementType: "Radio",
    elementAttributes: ["label", "options"],
  },
  {
    elementType: "Dropdown",
    elementAttributes: ["label", "options"],
  },
  {
    elementType: "CheckBox",
    elementAttributes: ["label", "options", "defaultValue"],
  },
];
const optionsObject = {
  name: "",
  variable: "",
  type: "",
  // "text",
  // "radio",
  // "checkbox",
  // "dropdown",
  // "date",
  // "toggle",
  // "multiSelect",
  // "slider",
  enabled: true,
  required: false,
  maxLength: 10,
  minLength: 0,
  description: "",
  radioOptions: [],
  checkboxLabel: "",
  checkboxDefault: false,
  dropdownOptions: [],
  dateOptions: {
    format: "YYYY-MM-DD",
    minDate: "",
    maxDate: "",
  },
  toggleDefault: false,
  multiSelectOptions: [],
  sliderOptions: {
    min: 0,
    max: 10,
    step: 2,
  },
};
const FormBuilder = ({ onFormSubmit }) => {
  const [selectedField, setSelectedField] = useState("");
  const [fieldAttributes, setFieldAttributes] = useState({});
  const [newOption, setNewOption] = useState(optionsObject);
  const [option, setOption]= useState("")
  const handleFieldSelect = (elementType) => {
    setSelectedField(elementType);
    setFieldAttributes({});
    setNewOption({ ...newOption, type: elementType });
  };

  const handleAttributeChange = (attribute, value) => {
    setFieldAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  const handleAddOption = () => {
    if (option.trim() !== "") {
      const optionsArray = Array.isArray(fieldAttributes.options)
        ? fieldAttributes.options
        : [];
      handleAttributeChange("options", [...optionsArray, option.trim()]);
      setOption("");
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = fieldAttributes["options"].filter(
      (_, i) => i !== index
    );
    handleAttributeChange("options", updatedOptions);
  };

  const handleAddField = () => {
    if (selectedField) {
      const newField = {
        type: selectedField,
        attributes: { ...fieldAttributes },
      };
      onFormSubmit([newField]);
      setSelectedField("");
      setFieldAttributes({});
      setNewOption("");
    }
  };
  const customTextStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: 5,
  };
  const inputStyle = {
    padding: 5,
    width: 300,
  };
  console.log(newOption, "newOption");
  return (
    <div>
      <h2>Create Fields</h2>
      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <div style={customTextStyle}>
          <label>Name:</label>
          <input
            style={inputStyle}
            type="text"
            value={newOption?.name}
            onChange={(e) =>
              setNewOption({ ...newOption, name: e.target.value })
            }
          />
        </div>
        <div style={customTextStyle}>
          <label>Field Type:</label>
          <select
            value={selectedField}
            onChange={(e) => handleFieldSelect(e.target.value)}
            style={inputStyle}
          >
            <option value="">Select Field</option>
            {fieldDetails.map((field) => (
              <option key={field.elementType} value={field.elementType}>
                {field.elementType}
              </option>
            ))}
          </select>
        </div>
        <CheckBox
          title={"Required"}
          isChecked={newOption?.required}
          onChange={() =>
            setNewOption({ ...newOption, required: !newOption?.required })
          }
        />
        <CheckBox
          title={"Enabled"}
          isChecked={newOption?.enabled}
          onChange={() =>
            setNewOption({ ...newOption, enabled: !newOption?.enabled })
          }
        />
        {/* <SlideSwitch label={"Required"} checked={newOption?.required} onChange={()=> setNewOption({...newOption, required: !newOption?.required})}/> */}
      </div>

      {selectedField && (
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h3>Add attributes for {selectedField}</h3>
          {fieldDetails
            .find((field) => field.elementType === selectedField)
            ?.elementAttributes.map((attribute) => (
              <div key={attribute} style={customTextStyle}>
                <label>{Capitalize(attribute)}:</label>
                {attribute === "options" ? (
                  <div>
                    {fieldAttributes[attribute]?.map((option, index) => (
                      <div key={index}>
                        <span>{option}</span>
                        <button onClick={() => handleRemoveOption(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      value={option}
                      style={inputStyle}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <button onClick={handleAddOption}>Add Option</button>
                  </div>
                ) : (
                  <input
                    type={
                      fieldDetails.find(
                        (field) => field.elementType === selectedField
                      )?.inputType || "text"
                    }
                    style={inputStyle}
                    value={fieldAttributes[attribute] || ""}
                    onChange={(e) =>
                      handleAttributeChange(attribute, e.target.value)
                    }
                  />
                )}
              </div>
            ))}
          {/* <button onClick={handleAddField}>Create Field</button> */}
          <Button
            type="submit"
            overrideClassName={classes.createBtn}
            buttonText={"Create field"}
            onClick={handleAddField}
            loading={false}
          />
        </div>
      )}
    </div>
  );
};

export default FormBuilder;
