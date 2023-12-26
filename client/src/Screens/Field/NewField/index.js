import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import FormBuilder from "../FormBuilder";
import adminServices from "../../../helper/adminServices";
import { toCamelCase } from "../../../helper/commonHelpers";
import { v4 as uuidv4 } from "uuid";
import constants from "../../../helper/constantKeyword/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error("Something went wrong");
    }
    if (isCreateFieldsSuccess && createFieldsResponse) {
      resetCreateFieldsState();
      toast.success("Successfully created")
    }
  });

  const handleFormSubmit = async (fields) => {
    console.log(fields, "fields here");
    const validationObject = {
      isRequired: fields.isRequired || false,
      min: fields.minLength || 0,
      max: fields.maxLength || 0,
      validationType: fields?.validationType
        ? toCamelCase(fields.validationType)
        : fields.type.toLowerCase() || null,
    };
    // { validationType: null, isRequired: false, min: 0, max: 0 }
    let payload = {};
    switch (fields?.type) {
      case constants.radio:
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          radioOptions: fields?.radioOptions,
          validations: validationObject,
        };
        await createFieldsServices(payload);
        break;
      case constants.dropdown:
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          dropdownOptions: fields?.dropdownOptions,
          validations: validationObject,
        };
        await createFieldsServices(payload);
        break;
      case constants.checkbox:
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          checkboxOptions: fields?.checkboxOptions,
          validations: validationObject,
        };
        await createFieldsServices(payload);
        break;
      case toCamelCase(constants.multiselect):
        payload = {
          type: fields?.type,
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          description: fields?.description,
          name: fields?.name,
          multiSelectOptions: fields?.multiSelectOptions,
          validations: validationObject,
        };
        await createFieldsServices(payload);
        break;
      case constants.text:
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          name: fields?.name,
          description: fields?.description,
          placeholder: fields?.placeholder,
          validations: validationObject,
        };
        await createFieldsServices(payload);
        break;
      case constants.number:
        payload = {
          type: fields?.type.toLowerCase(),
          variable: `${toCamelCase(fields?.name)}_${uuidv4()}`,
          name: fields?.name,
          description: fields?.description,
          placeholder: fields?.placeholder,
          validations: validationObject,
        };
        await createFieldsServices(payload);
        break;
      case constants.date:
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
          validations: {
            validationType: fields?.validationType
              ? fields.validationType
              : fields.type.toLowerCase() || null,
            isRequired: fields.isRequired || false,
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
