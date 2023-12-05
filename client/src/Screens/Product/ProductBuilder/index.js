import React from "react";
import styles from "./ProductBuilder.module.scss";
const ProductBuilder = ({ fields }) => {
  console.log(fields);
  return (
    <div className={styles["product-builder"]}>
      <h2>{fields.name}</h2>
      {fields.fields.map((field) => (
        <div key={field._id}>
          <label>{field.name}:</label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
};

const renderField = (field) => {
  switch (field.type) {
    case "radio":
      return (
        <div>
          {field.radioOptions.map((option, index) => (
            <label key={index}>
              <input type="radio" name={field.variable} value={option} />
              {option}
            </label>
          ))}
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
        <input
          type="range"
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
      return <input type="date" />;
    case "number":
      return <input type="number" />;
    // Add cases for other field types as needed
    default:
      return null;
  }
};

export default ProductBuilder;
