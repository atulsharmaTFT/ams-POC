import React, { useCallback, useEffect, useState } from "react";
import styles from "./ProductBuilder.module.scss";
import RadioButton from "../../../components/FormHook/RadioButton";
import InputField from "../../../components/FormHook/InputField"
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
const ProductBuilder = ({
  fields,
  productId,
  name,
  purchaseDate,
  price,
  tag,
  buttonName,
  data,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const NewJson = {
  //   _id: "6579b3750140ea218d2e22b3",
  //   name: "asdasdas",
  //   tag: "123123",
  //   price: 123126,
  //   purchaseDate: "2023-12-13T18:30:00.000+00:00",
  //   productId: "657884c06043b2bee01ea78a",
  //   data: {
  //   supportedOperatingSystem: [
  //     {value: "3", label:"MacOsx"},
  //     {value: "4", label:"Rhel"}
  //   ],
  //   ramMemory: {value: "1",label:"512MB"},
  //   ramType: {value: "1",label:"DDR1"},
  //   storage: {value: "2",label:"256GB"},
  //     model: "MAaA",
  //     brandName: "Majsdnkja"
  // },
  //     isInInventory: false,
  //     isArchived: false,
  //     createdAt: "2023-12-13T13:36:53.874+00:00",
  //     updatedAt: "2023-12-13T13:36:53.874+00:00"
    }
  
  let schema = getSchema(fields);
  schema = { ...schema, ...staticSchema };
  const validatorSchema = !!schema && Yup.object().shape(schema);
  let defaultValues ={}
  function setDefaultValues(schema){
    try{
    Object.keys(schema).forEach((key)=>{
      try{
        defaultValues[key] = NewJson?.[key]?? NewJson?.data?.[key]
      }catch(e){
        console.log(e, "error creating Key Values")
      }
    })
    return defaultValues
    }
    catch(e){
      console.log(e)
    }
  }
  const DEFAULT_DATA_VALUE = !!schema && setDefaultValues(schema);
  const methods = useForm({
    shouldUnregister: false,
    defaultValues: !!validatorSchema && !!schema && DEFAULT_DATA_VALUE,
    resolver: validatorSchema && yupResolver(validatorSchema),
    mode: "all",
  });
  const { handleSubmit, trigger, watch,setValue, getValues,formState:{errors} } = methods;

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

  const params = useParams()

  const acceptedFileTypes = [
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml", // .xlsx worksheet
  ];

  // let dropzoneCss = {
  //   dropzone: {
  //     overflow: "hidden",
  //     minHeight: "60px",
  //     marginTop: "20px",
  //     borderRadius: "8px",
  //     border: "1px solid #cdcdcd",
  //     backgroundColor: "#fff",
  //   },
  //   inputLabelWithFiles: {
  //     display: "none",
  //   },
  //   inputLabel: {
  //     fontSize: "18px",
  //     fontWeight: "500",
  //     color: "#777",
  //   },
  //   preview: {
  //     padding: "15px",
  //   },
  // };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      fields.forEach((item) => {
        setDynamicData(item);
      });
    }
  }, []);
  const setDynamicData = (field) => {
    let variable = field?.variable;
    switch (field?.type) {
      case "radio":
        handleRadioChange(data[variable].option, field);
        break;
      case "checkbox":
        data[variable].forEach((item) => {
          if (item?.checked) {
            handleCheckBoxClick(item.option, field);
          }
        });
        break;
      case "multiSelect":
        handleOptionChange(
          data[variable],
          { action: "select-option" },
          "multiSelect",
          variable,
          field
        );
        break;
      case "slider":
      case "dropdown":
        handleOptionChange(
          data[variable],
          { action: "select-option" },
          "dropdown",
          variable,
          field
        );
        break;
      case "date":
        handleInputChange(data[variable], variable, field.type, field);
        break;
      case "number":
        handleInputChange(data[variable], variable, field.type, field);
        break;
      case "text":
        handleInputChange(data[variable], variable, field.type, field);
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
    if (type === "date") {
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
    if (type === "dropdown") {
      // setDropDownOptions(options);
      field.value = options;
      setFormData((prev) => {
        return {
          ...prev,
          [name]: options,
        };
      });
    }
    if (type === "multiSelect") {
      if (action.action === "select-option") {
        // setSelectedOptions(options);
        field.value = options;
      }
      if (action.action === "remove-value") {
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
    const finalData = {
      name: data?.staticName,
      tag: data?.staticTag,
      price: data?.staticPrice,
      purchaseDate: data?.staticPurchaseDate,
      productId: productId,
      data: data,
    };
    delete finalData.data.staticName;
    delete finalData.data.staticTag;
    delete finalData.data.staticPrice;
    delete finalData.data.staticPurchaseDate;
    console.log(finalData,"finalData")
    if (buttonName === "Submit") {
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
    if (name === "staticPurchaseDate") {
      setValue(name, new Date(event.target.value).toISOString().split("T")[0]);
    } else {
      setValue(name, event.target.value);
    }
  };
  const renderField = useCallback((field) => {
    switch (field?.type) {
      case "radio":
        return (
          <div className={styles.flex}>
            {field?.radioOptions.map((option, index) => {
              return (
                <RadioButton
                  key={option.option}
                  label={option.option}
                  value={option.option}
                  checked={option?.checked}
                  name={field.variable}
                  onChange={(e) => handleRadioChange(e.target.value, field)}
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
                key={option?.option}
                value={option?.option}
                title={option?.option}
                isChecked={option?.checked}
                onChange={(e) => handleCheckBoxClick(e.target.value, field)}
              />
            ))}
          </div>
        );
      case "multiSelect":
        return (
          <MultiselectDropdown
            isMulti={true}
            key={field?._id}
            category={field?.placeholder}
            data={field?.multiSelectOptions}
            handleChange={(selectedValue, action) =>{
              setValue(field?.variable,selectedValue);
              methods.clearErrors(field?.variable);
            }}
            error={errors?.[field?.variable]?.message}
            selected={getValues(field?.variable)}
            fieldName={field?.variable}
            className={styles.inputOverride}
          />
        );
      case "dropdown":
        return (
          <MultiselectDropdown
            isMulti={false}
            key={field?._id}
            fieldName={field?.variable}
            category={field?.placeholder}
            data={field?.dropdownOptions}
            handleChange={(selectedValue, action) =>{
              setValue(field?.variable,selectedValue);
              methods.clearErrors(field?.variable);
            }}
            error={errors?.[field?.variable]?.message}
            selected={getValues(field?.variable)}
            className={styles.inputOverride}
          />
        );
      case "slider":
        return (
          <InputField
            key={field._id}
            type="range"
            fieldName={field?.name}
            placeholder={field.placeholder}
            // onChange={handleInputChange}
            inputOverrideClassName={styles.inputOverride}
            overrideErrorClassName={styles.overrideErrorClass}
            containerOverrideClassName={styles.inputContainer}
            min={field?.sliderOptions.min}
            max={field?.sliderOptions.max}
            step={field?.sliderOptions.step}
          />
        );
      case "date":
        return (
          <DateTimePicker
            type="date"
            key={field?._id}
            defaultValue={field.value}
            // setDateTime={setSelectedDateTime}
            onChange={(event) =>
              handleInputChange(
                event.target.value,
                field?.variable,
                field?.type,
                field
              )
            }
            inputOverrideClassName={styles.inputContainer}
            overrideClassName={styles.inputOverride}
          />
        );
      case "number":
        return (
          <InputField
            key={field._id}
            type="number"
            fieldName={field?.variable}
            
            placeholder={field?.placeholder}
        
            // onChange={(event) =>
            //   handleInputChange(event, field?.variable, field?.type)
            // }
            error={errors?.[field?.variable]?.message}
            defaultValue={field?.value}
            // onChange={(event) =>
            //   handleInputChange(
            //     event.target.value,
            //     field?.variable,
            //     field?.type,
            //     field
            //   )
            // }
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
            fieldName={field?.variable}
            error={errors?.[field?.variable]?.message}
            placeholder={field?.placeholder}
            // onChange={(event) =>
            //   handleInputChange(event, field?.variable, field?.type)
            // }
            defaultValue={field.value}
            onChange={(event) =>
              handleInputChange(
                event.target.value,
                field?.variable,
                field?.type,
                field
              )
            }
            inputOverrideClassName={styles.inputOverride}
            overrideErrorClassName={styles.overrideErrorClass}
            containerOverrideClassName={styles.inputContainer}
          />
        );
      default:
        return null;
    }
  },[fields, errors, setValue]);
  if (fields?.length <= 0) return <p>loading</p>;
  return (
    <div className={styles["product-builder"]}>
      {/* <form onSubmit={handleSubmit(formHandler)}> */}
      <FormProvider  
       methods={methods}
       buttonName={buttonName}
       onSubmit={handleSubmit(formHandler)}
        >
        <div className={styles.fieldsContainer}>
          <div className={styles.container}>
            <InputField
              type="text"
              key="name"
              label="Enter Name"
              fieldName="name"
              placeholder="Enter Name"
              error={errors?.staticName?.message}
              defaultValue={getValues("staticName")}
              onChange={(event) =>
                handleStaticInputHandler(event, "staticName")
              }
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
          </div>
          <div className={styles.container}>
            <InputField
              type="text"
              key="tag"
              fieldName="tag"
              placeholder="Enter Tag"
              label="Enter Tag"
          
              error={errors?.staticTag?.message}
              defaultValue={getValues("staticTag")}
              onChange={(event) => handleStaticInputHandler(event, "staticTag")}
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
          </div>
          <div className={styles.container}>
            <InputField
              type="number"
              key="number"
              fieldName="price"
              placeholder="Enter Price"
              defaultValue={getValues("staticPrice")}
              label="Enter Price"
              error={errors?.staticPrice?.message}
              onChange={(event) =>
                handleStaticInputHandler(event, "staticPrice")
              }
              inputOverrideClassName={styles.inputOverride}
              overrideErrorClassName={styles.overrideErrorClass}
              containerOverrideClassName={styles.inputContainer}
            />
          </div>
          <div className={styles.container}>
            <DateTimePicker
              key="date"
              type="date"
              label="Enter Purchase Date"
              fieldName="purchaseDate"
              defaultValue={getValues("purchaseDate")}
              onChange={(event) =>
                handleStaticInputHandler(event, "staticPurchaseDate")
              }
              inputOverrideClassName={styles.inputContainer}
              overrideClassName={styles.inputOverride}
            />
          </div>
          {/* <div className={styles.dropZone}>
          <Dropzone
            key="file"
            onChangeStatus={handleChangeStatus1}
            accept={acceptedFileTypes.join(",")}
            styles={dropzoneCss}
            multiple={false}
          />
        </div> */}
        </div>
        <div className={styles.fieldsContainer}>
          {/* <span>Dynamic Fields</span> */}
          {fields?.length > 0 &&
            fields?.map((field) => {
              return (
                <div className={styles.container} key={field._id}>
                  <label>{field?.name}:</label>
                  {renderField(field)}
                </div>
              );
            })}
        </div>
        {/* <button type="submit">{buttonName}</button> */}
      {/* </form> */}
      </FormProvider>
    </div>
  );
};

export default React.memo(ProductBuilder);
