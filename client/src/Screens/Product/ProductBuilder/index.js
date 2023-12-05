import React, { useState } from "react";
import styles from "./ProductBuilder.module.scss";
import RadioButton from "../../../components/RadioButton";
import InputField from "../../../components/InputField";
import DateTimePicker from "../../../components/DatePicker/DateTimePicker";
const ProductBuilder = ({ fields }) => {
  const [selectedDateTime, setSelectedDateTime] = useState("");

  console.log(fields);
  return (
    <div className={styles["product-builder"]}>
      <h2>{fields.name}</h2>
      {fields.fields.map((field) => (
        <div className={styles.container} key={field._id}>
          <label>{field.name}:</label>
          {renderField(field, selectedDateTime, setSelectedDateTime)}
        </div>
      ))}
    </div>
  );
};

const handleRadioChange = (e) => {
  console.log(e.target.value);
};
const handleInputChange = (e) => {
  console.log(e.target.value);
};

const renderField = (field, selectedDateTime, setSelectedDateTime) => {
  switch (field.type) {
    case "radio":
      return (
        <div className={styles.flex}>
          {field.radioOptions.map((option, index) => {
            // {console.log(option)}
            return (
              <RadioButton
                key={option.option}
                label={option.option}
                value={option.option}
                checked={option.checked}
                name={field.variable}
                onChange={handleRadioChange}
              />
            );
          })}
        </div>
      );
    case "checkbox":
      return (
        <div>
          {field.checkboxOptions.map((option, index) => (
            <label key={index}>
              <input type="checkbox" name={field.variable} value={option} />
              {option}
            </label>
          ))}
        </div>
      );
    case "multiSelect":
      return (
        <select multiple>
          {field.multiSelectOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "slider":
      return (
        // <input
        //   type="range"
        // min={field.sliderOptions.min}
        // max={field.sliderOptions.max}
        // step={field.sliderOptions.step}
        // />
        <InputField
          key={field._id}
          type="range"
          fieldName={field.name}
          placeholder={field.placeholder}
          onChange={handleInputChange}
          inputOverrideClassName={styles.inputOverride}
          overrideErrorClassName={styles.overrideErrorClass}
          containerOverrideClassName={styles.inputContainer}
          min={field.sliderOptions.min}
          max={field.sliderOptions.max}
          step={field.sliderOptions.step}
        />
      );
    case "dropdown":
      return (
        <select>
          {field.dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    case "date":
      // return <input type="date" />;
      return (
        <DateTimePicker
          type="date"
          selected={selectedDateTime}
          setDateTime={setSelectedDateTime}
        />
      );
    case "number":
      return (
        <InputField
          key={field._id}
          type="number"
          fieldName={field.name}
          placeholder={field.placeholder}
          onChange={handleInputChange}
          inputOverrideClassName={styles.inputOverride}
          overrideErrorClassName={styles.overrideErrorClass}
          containerOverrideClassName={styles.inputContainer}
        />
      );
    case "text":
      return (
        <InputField
          type="text"
          key={field._id}
          fieldName={field.name}
          placeholder={field.placeholder}
          onChange={handleInputChange}
          inputOverrideClassName={styles.inputOverride}
          overrideErrorClassName={styles.overrideErrorClass}
          containerOverrideClassName={styles.inputContainer}
        />
      );
    // Add cases for other field types as needed
    default:
      return null;
  }
};

export default ProductBuilder;
