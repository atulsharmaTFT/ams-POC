import React, { useState } from "react";
import { Capitalize } from "../../../helper/commonHelpers";
import SlideSwitch from "../../../components/Switch";
import classes from "./form.module.scss";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Button from "../../../components/Button/Button";
export const fieldDetails = [
  {
    elementType: "Text",
    elementAttributes: ["placeholder"],
  },
  {
    elementType: "Number",
    elementAttributes: ["placeholder"],
  },
  {
    elementType: "Date",
    elementAttributes: ["maxDate", "minDate"],
    inputType: "date",
  },
  {
    elementType: "Radio",
    elementAttributes: ["options"],
  },
  {
    elementType: "Dropdown",
    elementAttributes: ["options"],
  },
  {
    elementType: "CheckBox",
    elementAttributes: ["options"],
  },
  {
    elementType: "multiSelect",
    elementAttributes: ["options"],
  },
];
const optionsObject = {
  name: "",
  variable: "",
  type: "",
  description: "",
  radioOptions: [],
  checkboxOptions: [],
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
  const [option, setOption] = useState("");

  const getOptionType = () =>{
    if(selectedField){
    switch (selectedField) {
        case 'Radio':
           return 'radioOptions'
          break;
        case 'Dropdown':
            return "dropdownOptions"
          break;
        case 'CheckBox':
            return "checkboxOptions"
          break;
        case 'multiSelect':
            return "multiSelectOptions"
          break;
        default:
            return Object.keys(newOption).find((key)=> key === selectedField) 
        break;
      }
    }
  }
  const keyType= getOptionType();
  const handleFieldSelect = (elementType) => {
    setSelectedField(elementType);
    setFieldAttributes({});
    setNewOption({ ...newOption, type: elementType });
  };

  const handleAttributeChange = (attribute, value) => {
    setNewOption((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  const handleAddOption = () => {
    if (option.trim() !== "") {
        let type = newOption.type
    switch (type) {
        case 'Radio':
            setNewOption(prevState => ({
                ...prevState,
                radioOptions: [...prevState.radioOptions, option.trim()] 
              }));
            setOption("");
          break;
        case 'CheckBox':
            setNewOption(prevState => ({
                ...prevState,
                checkboxOptions: [...prevState.checkboxOptions, option.trim()] 
              }));
            setOption("");
          break;
        case 'Dropdown':
            setNewOption(prevState => ({
                ...prevState,
                dropdownOptions: [...prevState.dropdownOptions, option.trim()] 
              }));
            setOption("");
          break;
        case 'multiSelect':
            setNewOption(prevState => ({
                ...prevState,
                multiSelectOptions: [...prevState.multiSelectOptions, option.trim()] 
              }));
            setOption("");
       
          break;
        default: 
        break;
      }
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = newOption[keyType].filter(
      (_, i) => i !== index
    );
    handleAttributeChange(keyType, updatedOptions);
  };

  const handleAddField = () => {
    if (selectedField) {
      const payload = newOption
      onFormSubmit(payload);
      setFieldAttributes({});
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
          <label>Description:</label>
          <input
            style={inputStyle}
            type="text"
            value={newOption?.description}
            onChange={(e) =>
              setNewOption({ ...newOption, description: e.target.value })
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
        {/* <CheckBox
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
        /> */}
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
                    {newOption[keyType]?.map((option, index) => (
                      <div key={index} className={classes.options}>
                        <span>{option}</span>
                        <Button
                          type="button"
                          overrideClassName={classes.removeBtn}
                          buttonText={"Remove"}
                          onClick={()=>handleRemoveOption(index)}
                          loading={false}
                        />
                      </div>
                    ))}
                    <input
                      type="text"
                      value={option}
                      style={inputStyle}
                      onChange={(e) => setOption(e.target.value)}
                    />
                    <Button
                      type="submit"
                      overrideClassName={classes.addBtn}
                      buttonText={"Add option"}
                      onClick={handleAddOption}
                      loading={false}
                    />
                  </div>
                ) : (
                  <input
                    type={
                      fieldDetails.find(
                        (field) => field.elementType === selectedField
                      )?.inputType || "text"
                    }
                    style={inputStyle}
                    value={newOption[attribute] || ""}
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
