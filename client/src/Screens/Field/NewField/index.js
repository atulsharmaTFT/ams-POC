import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import FormBuilder from "../FormBuilder";
import adminServices from "../../../helper/adminServices";
import { toCamelCase } from "../../../helper/commonHelpers";

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
  });

  const handleFormSubmit = async (fields) => {
    console.log(fields, "fielsd here");
    const validationObject = {
        isRequired: fields.isRequired || false,
        min: fields.minLength || 0,
        max: fields.maxLength || 0,
        validationType: fields.validationType || null,
      }
      // { validationType: null, isRequired: false, min: 0, max: 0 }
    let payload = {};
    switch (fields?.type) {
      case "Radio":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: toCamelCase(fields?.name),
          description: fields?.description,
          name: fields?.name,
          radioOptions: fields?.radioOptions,
          validations: validationObject
        };
        await createFieldsServices(payload);
        break;
      case "Dropdown":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: toCamelCase(fields?.name),
          description: fields?.description,
          name: fields?.name,
          dropdownOptions: fields?.dropdownOptions,
          validations: validationObject
        };
        await createFieldsServices(payload);
        break;
      case "CheckBox":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: toCamelCase(fields?.name),
          description: fields?.description,
          name: fields?.name,
          checkboxOptions: fields?.checkboxOptions,
          validations: validationObject
        };
        await createFieldsServices(payload);
        break;
      case "multiSelect":
        payload = {
          type: fields?.type,
          variable: toCamelCase(fields?.name),
          description: fields?.description,
          name: fields?.name,
          multiSelectOptions: fields?.multiSelectOptions,
          validations: validationObject
        };
        await createFieldsServices(payload);
        break;
      case "Text":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: toCamelCase(fields?.name),
          name: fields?.name,
          description: fields?.description,
          placeholder: fields?.placeholder,
          validations: validationObject
        };
        await createFieldsServices(payload);
        break;
      case "Number":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: toCamelCase(fields?.name),
          name: fields?.name,
          description: fields?.description,
          placeholder: fields?.placeholder,
          validations: validationObject
        };
        await createFieldsServices(payload);
        break;
      case "Date":
        payload = {
          type: fields?.type.toLowerCase(),
          variable: toCamelCase(fields?.name),
          name: fields?.name,
          description: fields?.description,
          dateOptions: {
            minDate: fields?.minDate,
            maxDate: fields?.maxDate,
            format: "YYYY-MM-DD",
          },
          validations: validationObject
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
