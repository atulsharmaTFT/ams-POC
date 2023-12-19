import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import FormBuilder from "../FormBuilder";
import adminServices from "../../../helper/adminServices";
import { toCamelCase } from "../../../helper/commonHelpers";
import { v4 as uuidv4 } from "uuid";

const NewField = () => {
  const navigate = useNavigate();

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
  useEffect(() => {
    if (isCreateFieldsError && createFieldsError) {
      resetCreateFieldsState();
    }
    if (isCreateFieldsSuccess && createFieldsResponse) {
      resetCreateFieldsState();
    }
  },[]);

  const handleFormSubmit = async (fields) => {
    let payload = {};
    switch (fields?.type) {
      case "Radio":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          radioOptions: fields?.radioOptions,
        };
        await createFieldsServices(payload);
        break;
      case "Dropdown":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          dropdownOptions: fields?.dropdownOptions,
        };
        await createFieldsServices(payload);
        break;
      case "CheckBox":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          checkboxOptions: fields?.checkboxOptions,
        };
        await createFieldsServices(payload);
        break;
      case "multiSelect":
        payload = {
          type: fields?.type,
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          multiSelectOptions: fields?.multiSelectOptions,
        };
        await createFieldsServices(payload);
        break;
      case "Text":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          name: fields?.name,
          description: fields?.description,
          placeholder: fields?.placeholder,
        };
        await createFieldsServices(payload);
        break;
      case "Number":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          name: fields?.name,
          description: fields?.description,
          placeholder: fields?.placeholder,
        };
        await createFieldsServices(payload);
        break;
      case "Date":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          name: fields?.name,
          description: fields?.description,
          dateOptions: {
            minDate: fields?.minDate,
            maxDate: fields?.maxDate,
            format: "YYYY-MM-DD",
          },
        };
        await createFieldsServices(payload);
        break;
      default:
        break;
    }
  };
  return (
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
      <FormBuilder onFormSubmit={handleFormSubmit} />
    </div>
  );
};
export default NewField;
