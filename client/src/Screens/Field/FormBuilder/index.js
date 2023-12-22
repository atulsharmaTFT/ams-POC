import React, { useState } from "react";
import { Capitalize, toCamelCase } from "../../../helper/commonHelpers";
// import SlideSwitch from "../../../components/Switch";
import classes from "./form.module.scss";
import CheckBox from "../../../components/FormHook/CheckBox/CheckBox";
import Button from "../../../components/Button/Button";
import constants from "../../../helper/constantKeyword/constants";
import { getValidationList } from "../../../helper/validationHelper";


export const fieldDetails = [
  {
    elementType: constants.text,
    elementAttributes: [constants.placeholder.toLowerCase(), toCamelCase(constants.minLength), toCamelCase(constants.maxLength)],
  },
  {
    elementType: constants.number,
    elementAttributes: [constants.placeholder.toLowerCase(), toCamelCase(constants.minLength), toCamelCase(constants.maxLength)],
  },
  {
    elementType: constants.date,
    elementAttributes: [constants.maxDate, constants.minDate],
    inputType: constants.date.toLowerCase(),
  },
  {
    elementType: constants.radio,
    elementAttributes: [constants.options],
  },
  {
    elementType: constants.dropdown,
    elementAttributes: [constants.options],
  },
  {
    elementType: constants.checkbox,
    elementAttributes: [constants.options],
  },
  {
    elementType: constants.multiselect,
    elementAttributes: [constants.options],
  },
];
const optionsObject = {
  name: "",
  variable: "",
  type: "",
  minLength: 0,
  maxLength: 0,
  validationType: null,
  isRequired: false,
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
  const [newOption, setNewOption] = useState(optionsObject);
  const [option, setOption] = useState("");

  const getOptionType = () => {
    if (selectedField) {
      switch (selectedField) {
        case constants.radio:
          return constants.radioOptions;
          break;
        case constants.dropdown:
          return constants.dropdownOptions;
          break;
        case constants.checkbox:
          return constants.checkboxOptions;
          break;
        case constants.multiselect:
          return constants.multiSelectOptions;
          break;
        default:
          return Object.keys(newOption).find((key) => key === selectedField);
          break;
      }
    }
  };
  const keyType = getOptionType();
  const handleFieldSelect = (elementType) => {
    setSelectedField(elementType);
    setNewOption({ ...newOption, type: elementType });
  };
  const handleValidationSelect = (elementType) => {
    setNewOption({ ...newOption, validationType: elementType });
  };

  const handleAttributeChange = (attribute, value) => {
    setNewOption((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: value,
    }));
  };

  const handleAddOption = () => {
    if (option.trim() !== "") {
      let type = newOption.type;
      switch (type) {
        case constants.radio:
          setNewOption((prevState) => ({
            ...prevState,
            radioOptions: [
              ...prevState.radioOptions,
              { option: option.trim(), checked: false },
            ],
          }));
          setOption("");
          break;
        case constants.checkbox:
          setNewOption((prevState) => ({
            ...prevState,
            checkboxOptions: [
              ...prevState.checkboxOptions,
              { option: option.trim(), checked: false },
            ],
          }));
          setOption("");
          break;
        case constants.dropdown:
          setNewOption((prevState) => ({
            ...prevState,
            dropdownOptions: [
              ...prevState.dropdownOptions,
              {
                value: (prevState.dropdownOptions?.length + 1).toString(),
                label: option.trim(),
              },
            ],
          }));
          setOption("");
          break;
        case toCamelCase(constants.multiselect):
          setNewOption((prevState) => ({
            ...prevState,
            multiSelectOptions: [
              ...prevState.multiSelectOptions,
              {
                value: (prevState.multiSelectOptions?.length + 1).toString(),
                label: option.trim(),
              },
            ],
          }));
          setOption("");

          break;
        default:
          break;
      }
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = newOption[keyType].filter((_, i) => i !== index);
    handleAttributeChange(keyType, updatedOptions);
  };

  function disabledState(fieldType) {
    if (
      fieldType === constants.radio ||
      fieldType === constants.dropdown ||
      fieldType === constants.checkbox ||
      fieldType === constants.multiselect
      ||fieldType===constants.date
    )
      return true;
    return false;
  }

  const handleAddField = () => {
    if (selectedField) {
      const payload = newOption;
      onFormSubmit(payload);
      setNewOption(optionsObject);
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
console.log(selectedField,"selectedField");
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
                {field.elementType.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <CheckBox
          title={"Validation Required"}
          isChecked={newOption?.isRequired}
          onChange={() =>
            setNewOption({
              ...newOption,
              isRequired: !newOption?.isRequired,
            })
          }
        />

        <div style={customTextStyle}>
          <label>Validation Type:</label>
          <select
            value={newOption?.validationType}
            onChange={(e) => handleValidationSelect(e.target.value)}
            style={inputStyle}
            disabled={disabledState(selectedField)}
          >
            <option value="">Select Field</option>
            {getValidationList(selectedField)?.map((field) => (
              <option key={field.elementType} value={field.elementType}>
                {field.elementType.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedField && (
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h3>Add attributes for {selectedField}</h3>
          {fieldDetails
            .find((field) => field.elementType === selectedField)
            ?.elementAttributes.map((attribute) => (
              <div key={attribute} style={customTextStyle}>
                <label>{Capitalize(attribute)}:</label>
                {attribute === constants.options? (
                  <div>
                    {newOption[keyType]?.map((option, index) => (
                      <div key={index} className={classes.options}>
                        <span>
                          {keyType === constants.radioOptions ||
                          keyType === constants.checkboxOptions
                            ? option?.option
                            : keyType === constants.dropdownOptions ||
                              keyType === constants.multiSelectOptions
                            ? option?.label
                            : option}
                        </span>
                        <Button
                          type="button"
                          overrideClassName={classes.removeBtn}
                          buttonText={"Remove"}
                          onClick={() => handleRemoveOption(index)}
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
