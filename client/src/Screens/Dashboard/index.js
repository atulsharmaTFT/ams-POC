import React, { useEffect, useState } from "react";
import FormBuilder from "./FormBuilder";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";

const Dashboard = () =>{

  const {
    state: {
      loading: createFieldsLoading,
      isSuccess: isCreateFieldsSuccess,
      data: createFieldsResponse,
      isError: isCreateFieldsError,
      error: createFieldsError,
    },
    callService: createFieldsServices,
    resetServiceState: resetCreateFieldsState,
  } = useAdminApiService(adminServices.createFields);
  useEffect(()=>{
    if(isCreateFieldsError && createFieldsError){
      console.log(createFieldsError, "Error")
    }
    if(isCreateFieldsSuccess && createFieldsResponse){
      console.log(createFieldsResponse, "Response")
    }
  })
  const handleFormSubmit = async(fields) => {
    console.log('Form submitted with fields:', fields);
    switch (fields?.type) {
      case 'Radio':
        // setPayload();
          
        break;
      case 'Dropdown':
        // setPayload(prevState => ({
        //       ...prevState,
        //       dropdownOptions: [...prevState.dropdownOptions, ...option.trim()] 
        //     }));
          
        break;
      case 'multiSelect':
          // setPayload(prevState => ({
          //     ...prevState,
          //     multiSelectOptions: [...prevState.multiSelectOptions, ...option.trim()] 
          //   }));
      case 'Number':
            let payload = {
              type: fields?.type, 
              variable: fields?.variable , 
              name:fields?.name , 
              defaultValue: fields?.defaultValue , 
              enabled: fields?.enabled,
              required: fields?.required,
              minLength: fields?.minLength,
              maxLength: fields?.maxLength,
            };
            await createFieldsServices(payload)
        break;
      default: 
      break;
    }
  }
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