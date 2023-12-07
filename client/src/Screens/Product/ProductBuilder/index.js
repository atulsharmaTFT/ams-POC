import React, { useState } from "react";
import styles from "./ProductBuilder.module.scss";
import RadioButton from "../../../components/RadioButton";
import InputField from "../../../components/InputField";
import DateTimePicker from "../../../components/DatePicker/DateTimePicker";
import MultiselectDropdown from "../../../components/MultiSelectDropdown/MultiselectDropdown";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getSchema } from "../../../helper/yupSchemaBuilder";
const ProductBuilder = ({ fields }) => {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [formData, setFormData] = useState({
    selectedOptions: [],
    dropDownOptions: [],
    selectedDateTime: "",
    radioOptions: [""],
  });

  const acceptedFileTypes = [
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", // .xlsx worksheet
  ];

  let dropzoneCss = {
    dropzone: {
      overflow: "hidden",
      minHeight: "60px",
      marginTop: "20px",
      borderRadius: "8px",
      border: "1px solid #cdcdcd",
      backgroundColor: "#fff",
    },
    inputLabelWithFiles: {
      display: "none",
    },
    inputLabel: {
      fontSize: "18px",
      fontWeight: "500",
      color: "#777",
    },
    preview: {
      padding: "15px",
    },
  };

  const handleRadioChange = (e, idx) => {
    let selected = e.target.value;
    const element = fields?.filter((elem) => elem?.type === "radio");
    const newData = element?.[0]?.radioOptions?.map((elm) => {
      if (elm?.option === selected) {
        elm.checked = true;
      } else {
        elm.checked = false;
      }
      return elm;
    });
    setFormData((prev) => ({ ...prev, radioOptions: newData }));
  };
  const handleInputChange = (e) => {
    console.log(e.target.value);
  };
  const handleOptionChange = (options, action, type) => {
    if (type === "dropdown") {
      console.log(options, action, "DropDown");
      setDropDownOptions(options);
    }
    if (type === "multiSelect") {
      console.log(options, action, "MultiSelect");
      if (action.action === "clear") {
        setSelectedOptions([]);
      }
      if (action.action === "select-option") {
        setSelectedOptions(options);
      }
      if (action.action === "remove-value") {
        const filterOption = selectedOptions.filter(
          (elem) => elem?.value !== action?.removedValue?.value
        );
        setSelectedOptions(filterOption);
      }
    }
  };
  const handleCheckBoxClick = (e) => {
    console.log(e.target.value, "check");
  };

  const handleChangeStatus1 = ({ file }, status) => {
    const fileType = file?.type;
    const validFileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-et",
    ];
    // if (status === "done")
    // if (status === "removed")
  };
  const renderField = (field) => {
    switch (field?.type) {
      case "radio":
        return (
          <div className={styles.flex}>
            {field.radioOptions.map((option, index) => {
              return (
                <RadioButton
                  key={option.option}
                  label={option.option}
                  value={option.option}
                  checked={option?.checked}
                  name={field.variable}
                  onChange={(e) => handleRadioChange(e, index)}
                />
              );
            })}
          </div>
        );
      case "checkbox":
        return (
          <div>
            {field.checkboxOptions.map((option, index) => (
              <CheckBox
                value={option?.option}
                title={option?.option}
                isChecked={option?.checked}
                onChange={handleCheckBoxClick}
              />
            ))}
          </div>
        );
      case "multiSelect":
        return (
          <MultiselectDropdown
            isMulti={true}
            category={field?.placeholder}
            data={field?.multiSelectOptions}
            handleChange={(selectedValue, action) =>
              handleOptionChange(selectedValue, action, field?.type)
            }
            selected={selectedOptions}
            className={styles.inputOverride}
          />
        );
      case "slider":
        return (
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
          <MultiselectDropdown
            isMulti={false}
            category={field?.placeholder}
            data={field?.dropdownOptions}
            handleChange={(selectedValue, action) =>
              handleOptionChange(selectedValue, action, field?.type)
            }
            selected={dropDownOptions?.[0]}
            className={styles.inputOverride}
          />
        );
      case "date":
        return (
          <DateTimePicker
            type="date"
            selected={selectedDateTime}
            setDateTime={setSelectedDateTime}
            inputOverrideClassName={styles.inputContainer}
            overrideClassName={styles.inputOverride}
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
      default:
        return null;
    }
  };
  console.log(formData, "fieldsaaaaa");
  if (fields?.length <= 0) return <p>loading</p>;
  const sch=getSchema(fields);
  return (
    <div className={styles["product-builder"]}>
      <div>
        <InputField
          type="text"
          key="name"
          label="Enter Name"
          fieldName="staticName"
          placeholder="Enter Name"
          onChange={handleInputChange}
          inputOverrideClassName={styles.inputOverride}
          overrideErrorClassName={styles.overrideErrorClass}
          containerOverrideClassName={styles.inputContainer}
        />
      </div>
      <div>
        <InputField
          type="text"
          key="tag"
          fieldName="staticTag"
          placeholder="Enter Tag"
          label="Enter Tag"
          onChange={handleInputChange}
          inputOverrideClassName={styles.inputOverride}
          overrideErrorClassName={styles.overrideErrorClass}
          containerOverrideClassName={styles.inputContainer}
        />
      </div>
      <div>
        {/* <label>Enter Price</label> */}
        <InputField
          type="number"
          key="number"
          fieldName="staticPrice"
          placeholder="Enter Price"
          label="Enter Price"
          onChange={handleInputChange}
          inputOverrideClassName={styles.inputOverride}
          overrideErrorClassName={styles.overrideErrorClass}
          containerOverrideClassName={styles.inputContainer}
        />
      </div>
      <div>
        {/* <label>Enter Purchase Date</label> */}
        <DateTimePicker
          type="date"
          label="Enter Purchase Date"
          selected={selectedDateTime}
          setDateTime={setSelectedDateTime}
          inputOverrideClassName={styles.inputContainer}
          overrideClassName={styles.inputOverride}
        />
      </div>
      <div className={styles.dropZone}>
        <Dropzone
          onChangeStatus={handleChangeStatus1}
          accept={acceptedFileTypes.join(",")}
          styles={dropzoneCss}
          multiple={false}
        />
      </div>
      {/* <h2>{fields.name}</h2> */}
      {fields?.fields.length > 0 &&
        fields?.fields.map((field) => {
          const {valitdations}=fields.fields;
          
          return (
            <div className={styles.container} key={field._id}>
              <label>{field?.name}:</label>
              {renderField(field)}
            </div>
          );
        })}
    </div>
  );
};

export default React.memo(ProductBuilder);
