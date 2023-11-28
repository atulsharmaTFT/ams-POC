import React, { useState } from "react";
import Dropdown from "../../components/DropDown";
import RadioButton from "../../components/RadioButton";
import TextInput from "../../components/TextInput";
import CheckBox from "../../components/CheckBox/CheckBox";
import FileUploader from "../../components/FileUploader/FileUploader";
import DateTimePicker from "../../components/DatePicker/DateTimePicker";
import MultiselectDropdown from "../../components/MultiSelectDropdown/MultiselectDropdown";
import { options, fieldOption } from "../../helper/constants";
import FormBuilder from "./FormBuilder";

const Dashboard = () =>{
    const [selectedOption, setSelectedOption] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    variable: "",
    type: selectedOption,
    fieldType: selectedField,
    required: false,
  });
  const handleChange = (e, variable) => {
    const { value } = e.target;
    setFormData({ ...formData, [variable]: value });
  };
  const [dataSet, setData] = useState({
    ram: "",
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      type: selectedOption,
      fieldType: selectedField,
    });
    console.log("Form submitted:", formData);
  };
  const fetchData = {
    fieldType: "Text",
    name: "ram",
    required: false,
    type: "String",
    variable: "ram",
  };

  function handleData (e, variable){
    setData(...dataSet, {[variable]:e.target.value})
  }
  const handleFormSubmit = (fields) => {
    console.log('Form submitted with fields:', fields);
  };
    return(
        <div
        style={{
          display: "flex",
          flex: 1,
          padding: "1rem",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <FormBuilder onFormSubmit={handleFormSubmit}/>
        {/* <h2>{`Create Fields`}</h2>
        <form
          style={{
            display: "flex",
            flex: 1,
            padding: "1rem",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
        >
          <label>Enter Field name</label>
          <input
            type={"text"}
            value={formData?.name}
            onChange={(e) => handleChange(e, "name")}
          />
          <label>Enter variable name</label>
          <input
            type={"text"}
            value={formData?.variable}
            onChange={(e) => handleChange(e, "variable")}
          />
          <Dropdown
            key={selectedOption[0]?.name}
            title={"Type"}
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <Dropdown
            key={selectedField[0]?.name}
            title={"Field Type"}
            options={fieldOption}
            selectedOption={selectedField}
            setSelectedOption={setSelectedField}
          />
          <MultiselectDropdown/>
          <RadioButton label={"string"} value={"abc"} checked={false} onChange={(e)=>console.log(e)}
        />
      
      <TextInput label="TextInput"/>
       
  
        <p>Selected Option: {selectedOption}</p>
          <CheckBox value={"abcd"} title={"Ram"} isChecked={true}/>
          <FileUploader title={"upload"}/>
          <DateTimePicker/>
          <button type="submit">Submit</button>
        </form>
  
        <div>
            {fetchData?.fieldType === "Text" && (
               <>
               <label>{fetchData?.name}</label>
               <input
                 type={fetchData?.fieldType}
                 value={""}
                 onChange={(e) => handleData(e, fetchData?.name)}
               />
               </>
            )}
        </div> */}
      </div>
    )
}

export default Dashboard