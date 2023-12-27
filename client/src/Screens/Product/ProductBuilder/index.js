import React, { useCallback, useEffect, useState } from "react";
import styles from "./ProductBuilder.module.scss";
import RadioButton from "../../../components/FormHook/RadioButton";
import InputField from "../../../components/FormHook/InputField";
import DateTimePicker from "../../../components/FormHook/DatePicker/DateTimePicker";
import MultiselectDropdown from "../../../components/FormHook/MultiSelectDropdown/MultiselectDropdown";
import CheckBox from "../../../components/FormHook/CheckBox/CheckBox";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getSchema, staticSchema } from "../../../helper/yupSchemaBuilder";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import { useParams } from "react-router-dom";
import { FormProvider } from "../../../components/FormHook";
import { GroupCheckBox } from "../../../components/FormHook/CheckBox/GroupCheckBox";
import GroupRadioButton from "../../../components/FormHook/RadioButton/GroupRadioButton";
import constants from "../../../helper/constantKeyword/constants";
import { toCamelCase } from "../../../helper/commonHelpers";
import messages from "../../../helper/constantKeyword/messages";
import moment from "moment";
const ProductBuilder = ({
  fields,
  productId,
  name,
  purchaseDate,
  price,
  tag,
  buttonName,
  data,
  formTitile
}) => {
  const [formData, setFormData] = useState({});

  let schema = getSchema(fields);

  schema = { ...schema, ...staticSchema };
  const validatorSchema = !!schema && Yup.object().shape(schema);
  let defaultValues = {};

  // function findFieldType(variableName) {
  //   const field = fields.find((item) => item.variable === variableName);
  //   return field ? field.type : null;
  // }

  function setDefaultValues(schema) {
    try {
      let values = { data, name, purchaseDate, price, tag };
      Object.keys(schema).forEach((key) => {
        try {
          // const type = findFieldType(key)
          // if(type === null){
          //   if(key === 'purchaseDate'){
          //     console.log(key,"key")
          //       if(!!values?.[key]){
          //         return defaultValues[key] = moment(values[key]).format("YYYY-MM-DD").toString()
          //       }
          //       else {
          //         return defaultValues[key] = moment().format("YYYY-MM-DD").toString()
          //       }
          //     }
          //     else  return defaultValues[key] = values?.[key] ?? values?.data?.[key];
          // }
          // else if(type === 'date'){
          //   if(!!values?.data?.[key]){
          //     return defaultValues[key] = moment(values?.data?.[key]).format("YYYY-MM-DD").toString()
          //   }
          //   else {
          //     return defaultValues[key] = moment().format("YYYY-MM-DD").toString()
          //   }
          // }
          // else return defaultValues[key] = values?.[key] ?? values?.data?.[key];
          defaultValues[key] = values?.[key] ?? values?.data?.[key];
        } catch (e) {
          console.log(e, "error creating Key Values");
        }
      });
      return defaultValues;
    } catch (e) {
      console.log(e);
    }
  }
  const DEFAULT_DATA_VALUE =!!schema &&  setDefaultValues(schema);
  const methods = useForm({
    shouldUnregister: false,
    defaultValues: !!validatorSchema && !!schema && DEFAULT_DATA_VALUE,
    resolver: validatorSchema && yupResolver(validatorSchema),
    mode: "all",
  });
  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  const {
    state: {
      loading: addNewAssetLoading,
      isSuccess: isAddNewAssetSuccess,
      data: addNewAssetResponse,
      isError: isAddNewAssetError,
      error: addNewAssetError,
    },
    callService: addNewAssetService,
    resetServiceState: resetAddNewAssetState,
  } = useAdminApiService(adminServices.addAsset);

  const {
    state: {
      loading: updateExistingAssetLoading,
      isSuccess: isUpdateExistingAssetSuccess,
      data: updateExistingAssetResponse,
      isError: isUpdateExistingAssetError,
      error: updateExistingAssetError,
    },
    callService: updateExistingAssetService,
    resetServiceState: resetUpdateExistingAssetState,
  } = useAdminApiService(adminServices.updateExistingAsset);
  console.log(errors, DEFAULT_DATA_VALUE, "errors");
  useEffect(() => {
    if (isAddNewAssetError && addNewAssetError) {
      console.log(addNewAssetError, "Error");
      // resetGetProductByIdState();
    }
    if (isAddNewAssetSuccess && addNewAssetResponse) {
      console.log(addNewAssetResponse, "Response");
      // setTimeout(()=>setLoading(false), 1000)
      // resetGetProductByIdState();
    }
    if (isUpdateExistingAssetError && updateExistingAssetError) {
      console.log(updateExistingAssetError, "Error");
    }
    if (isUpdateExistingAssetSuccess && updateExistingAssetResponse) {
      console.log(updateExistingAssetResponse, "Response");
    }
  }, [
    isAddNewAssetSuccess,
    addNewAssetResponse,
    isAddNewAssetError,
    addNewAssetError,
    isUpdateExistingAssetSuccess,
    updateExistingAssetResponse,
    isUpdateExistingAssetError,
    updateExistingAssetError,
  ]);

  const params = useParams();

  const acceptedFileTypes = [
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", // .xlsx worksheet
  ];

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      fields.forEach((item) => {
        setDynamicData(item);
      });
    }
  }, []);
  // useEffect(()=>{
  //   // Setting Purchase date for in case of update
  //   setValue('purchaseDate', moment(purchaseDate?? "").format("YYYY-MM-DD"))
  // },[])
  const setDynamicData = (field) => {
    let variable = field?.variable;
    switch (field?.type) {
      case constants.radio.toLowerCase():
        handleRadioChange(data?.[variable]?.option, field);
        break;
      case constants.checkbox.toLowerCase():
        data?.[variable]?.forEach((item) => {
          if (item.checked) {
            handleCheckBoxClick(item.option, field);
          }
        });
        break;
      case toCamelCase(constants.multiselect):
        handleOptionChange(
          data?.[variable],
          { action: messages.selectOption },
          toCamelCase(constants.multiselect),
          variable,
          field
        );
        break;
      case "slider":
      case constants.dropdown.toLowerCase():
        handleOptionChange(
          data?.[variable],
          { action: messages.selectOption },
          constants.dropdown.toLowerCase(),
          variable,
          field
        );
        break;
      case constants.date.toLowerCase():
        if (data?.[variable]) {
          handleInputChange(data?.[variable], variable, field.type, field);
        }
        break;
      case constants.number.toLowerCase():
        handleInputChange(data?.[variable], variable, field.type, field);
        break;
      case constants.text.toLowerCase():
        handleInputChange(data?.[variable], variable, field.type, field);
        break;
      default:
        return null;
    }
  };

  const handleRadioChange = (e, field) => {
    const data = field.radioOptions
      .map((item) => {
        if (item.option === e) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      })
      .filter((ele) => {
        if (ele.checked === true) {
          return ele;
        }
      });

    setFormData((prev) => {
      return {
        ...prev,
        [field.variable]: data[0],
      };
    });
  };

  const handleInputChange = (e, name, type, field) => {
    if (type === constants.date.toLowerCase()) {
      // setSelectedDate(new Date(e).toISOString().split("T")[0]);
      field.value = new Date(e).toISOString().split("T")[0];
      setFormData((prev) => {
        return {
          ...prev,
          [name]: new Date(e).toISOString().split("T")[0],
        };
      });
    } else {
      field.value = e;
      setFormData((prev) => {
        return {
          ...prev,
          [name]: e,
        };
      });
    }
  };
  const handleOptionChange = (options, action, type, name, field) => {
    if (type === constants.dropdown.toLowerCase()) {
      // setDropDownOptions(options);
      field.value = options;
      setFormData((prev) => {
        return {
          ...prev,
          [name]: options,
        };
      });
    }
    if (type === toCamelCase(constants.multiselect)) {
      if (action.action === messages.selectOption) {
        // setSelectedOptions(options);
        field.value = options;
      }
      if (action.action === messages.removeValue) {
        // const filterOption = selectedOptions.filter(
        //   (elem) => elem?.value !== action?.removedValue?.value
        // );
        // setSelectedOptions(filterOption);
        field.value = options;
      }
      // const labels = options.map((item) => {
      //   return item.label;
      // });

      setFormData((prev) => {
        return {
          ...prev,
          [name]: options,
        };
      });
    }
  };
  const handleCheckBoxClick = (e, field) => {
    const data = field.checkboxOptions
      .map((item) => {
        if (item.option === e) {
          item.checked = !item.checked;
        }
        return item;
      })
      .filter((ele) => {
        if (ele.checked === true) {
          return ele;
        }
      });

    setFormData((prev) => {
      return {
        ...prev,
        [field.variable]: data,
      };
    });
  };
  const formHandler = async (data) => {
    let newData = getValues();
    let finalData = {
      name: newData?.name,
      tag: newData?.tag,
      price: newData?.price,
      purchaseDate: newData?.purchaseDate,
      productId: productId,
      data: newData,
    };
    delete finalData.data.name;
    delete finalData.data.tag;
    delete finalData.data.price;
    delete finalData.data.staticPurchaseDate;
    delete finalData.data.purchaseDate;
    delete finalData.data.image
    Object.keys(finalData.data).forEach((key) => {
      if (finalData.data[key] === undefined) {
        finalData.data[key] = null;
      }
    });
    if (buttonName === "Submit") {
      console.log(finalData,"finalData")
      await addNewAssetService(finalData);
    } else {
      await updateExistingAssetService(params.id, finalData);
    }
  };

  // const handleChangeStatus1 = ({ file }, status) => {
  //   const fileType = file?.type;
  //   const validFileTypes = [
  //     "application/vnd.ms-excel",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     "application/vnd.ms-et",
  //   ];
  // };

  const handleStaticInputHandler = (event, name) => {
    if (name === "purchaseDate") {
      setValue(name, new Date(event.target.value).toISOString().split("T")[0]);
    } else {
      setValue(name, event.target.value);
    }
  };
  const renderField = useCallback(
    (field) => {
      switch (field?.type) {
        case constants.radio.toLowerCase():
          return (
            <GroupRadioButton
              options={field?.radioOptions}
              name={field.variable}
              defaultValue={getValues(field.variable)}
              />
          );
        case constants.checkbox.toLowerCase():
          return (
            <GroupCheckBox
              options={field.checkboxOptions}
              name={field.variable}
              defaultValue={getValues(field?.variable)}
            />
          );
        case toCamelCase(constants.multiselect):
          return (
            <MultiselectDropdown
              isMulti={true}
              key={field?._id}
              category={field?.placeholder}
              data={field?.multiSelectOptions}
              handleChange={(selectedValue, action) => {
                setValue(field?.variable, selectedValue);
                methods.clearErrors(field?.variable);
              }}
              error={errors?.[field?.variable]?.message}
              selected={getValues(field?.variable)}
              fieldName={field?.variable}
              className={styles.inputOverride}
            />
          );
        case constants.dropdown.toLowerCase():
          return (
            <MultiselectDropdown
              isMulti={false}
              key={field?._id}
              fieldName={field?.variable}
              category={field?.placeholder}
              data={field?.dropdownOptions}
              handleChange={(selectedValue, action) => {
                setValue(field?.variable, selectedValue);
                methods.clearErrors(field?.variable);
              }}
              error={errors?.[field?.variable]?.message}
              selected={getValues(field?.variable)}
              className={styles.inputOverride}
            />
          );
        case constants.slider:
          return (
            <InputField
              key={field._id}
              type="range"
              fieldName={field?.name}
              placeholder={field.placeholder}
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
              min={field?.sliderOptions.min}
              max={field?.sliderOptions.max}
              step={field?.sliderOptions.step}
            />
          );
        case constants.date.toLowerCase():
          return (
            <DateTimePicker
              // type="date"
              key={field?._id}
              defaultValue={field.value}
              fieldName={field?.variable}
              inputOverrideClassName={styles.inputContainer}
              overrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
            />
          );
        case constants.number.toLowerCase():
          return (
            <InputField
              key={field._id}
              type="number"
              fieldName={field?.variable}
              placeholder={field?.placeholder}
              error={errors?.[field?.variable]?.message}
              defaultValue={field?.value}
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
          );
        case constants.text.toLowerCase():
          return (
            <InputField
              type="text"
              key={field._id}
              fieldName={field?.variable}
              error={errors?.[field?.variable]?.message}
              placeholder={field?.placeholder}
              defaultValue={field.value}
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
          );
        default:
          return null;
      }
    },
    [fields, errors, setValue]
  );
  console.log(fields,"Fields")
  if (fields?.length <= 0) return <p>loading</p>;
  return (
    <div className={styles["product-builder"]}>
      <h1 className={styles.titleContainer}> Add Details</h1>
      <FormProvider
        methods={methods}
        buttonName={buttonName}
        onSubmit={handleSubmit(formHandler)}
      >
        <div style={{padding:"10px"}}>
            <InputField
              type="text"
              key="name"
              label="Enter Name"
              fieldName="name"
              placeholder="Enter Name"
              error={errors?.name?.message}
              defaultValue={getValues("name")}
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
            <InputField
              type="text"
              key="tag"
              fieldName="tag"
              placeholder="Enter Tag"
              label="Enter Tag"
              error={errors?.tag?.message}
              defaultValue={getValues("tag")}
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
            <InputField
              type="number"
              key="number"
              fieldName="price"
              placeholder="Enter Price"
              defaultValue={getValues("price")}
              label="Enter Price"
              error={errors?.price?.message}
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
            <DateTimePicker
              key="purchaseDate"
              label="Enter Purchase Date"
              fieldName="purchaseDate"
              defaultValue={getValues("purchaseDate")}
              inputOverrideClassName={styles.inputContainer}
              overrideClassName={styles.inputOverride}
            />
            </div>
          <h1 className={styles.titleContainer}>{formTitile.toUpperCase() +" Details"}</h1>
          {fields?.length > 0 &&
            fields?.map((field) => {
              return (
                <div style={{padding:"10px"}} key={field._id}>
                  <label className={styles.labelClass}>{field?.name}:</label>
                  {renderField(field)}
                </div>
              );
            })}
      </FormProvider>
    </div>
  );
};

export default React.memo(ProductBuilder);
