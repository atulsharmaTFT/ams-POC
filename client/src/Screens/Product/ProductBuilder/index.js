import React, { useEffect, useState } from "react";
import styles from "./ProductBuilder.module.scss";
import RadioButton from "../../../components/RadioButton";
import InputField from "../../../components/InputField";
import DateTimePicker from "../../../components/DatePicker/DateTimePicker";
import MultiselectDropdown from "../../../components/MultiSelectDropdown/MultiselectDropdown";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { getSchema, staticSchema } from "../../../helper/yupSchemaBuilder";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";

const ProductBuilder = ({ fields, productId }) => {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [formData, setFormData] = useState({});
  let schema = getSchema(fields);
  schema = {...schema, ...staticSchema}
  // console.log(schema, "Schema");
  const validatorSchema = schema && Yup.object().shape(schema);
  const {
    handleSubmit,
    trigger,
    register,
    setValue,
    getValues,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      staticName: "",
      staticPrice: 0,
      staticTag: "",
      staticPurchaseDate: new Date().toISOString().split("T")[0],
      // staticImage: null,
    },
    resolver: validatorSchema && yupResolver(validatorSchema),
    mode:"all",
  });
  console.log(errors, getValues(), "errors");


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
  }, [
    isAddNewAssetSuccess,
    addNewAssetResponse,
    isAddNewAssetError,
    addNewAssetError,
  ]);

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

  const handleRadioChange = (e, idx, field) => {
    const data = field.radioOptions
      .map((item) => {
        if (item.option === e.target.value) {
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

  const handleInputChange = (e, name, type) => {
    if (type === "date") {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: new Date(e.target.value).toISOString().split("T")[0],
        };
      });
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: e.target.value,
        };
      });
    }
  };
  const handleOptionChange = (options, action, type, name) => {
    if (type === "dropdown") {
      setFormData((prev) => {
        return {
          ...prev,
          [name]: options,
        };
      });
    }
    if (type === "multiSelect") {
      if (action.action === "select-option") {
        setSelectedOptions(options);
      }
      if (action.action === "remove-value") {
        const filterOption = selectedOptions.filter(
          (elem) => elem?.value !== action?.removedValue?.value
        );
        setSelectedOptions(filterOption);
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
        if (item.option === e.target.value) {
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
    // console.log("data from here", data);
    console.log("formData", formData);
    const finalData = {
      name: data?.staticName,
      tag: data?.staticTag,
      price: data?.staticPrice,
      purchaseDate: data?.staticPurchaseDate,
      productId: productId,
      data: {
        ...formData,
      },
    };

    console.log(finalData, "FinalData");
    await addNewAssetService(finalData);
    console.log("test");
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
                  onChange={(e) => handleRadioChange(e, index, field)}
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
                onChange={(e) => handleCheckBoxClick(e, field)}
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
            handleChange={(selectedValue, action) =>
              handleOptionChange(
                selectedValue,
                action,
                field?.type,
                field?.variable
              )
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
            key={field?._id}
            category={field?.placeholder}
            data={field?.dropdownOptions}
            handleChange={(selectedValue, action) =>
              handleOptionChange(
                selectedValue,
                action,
                field?.type,
                field?.variable
              )
            }
            selected={dropDownOptions?.[0]}
            className={styles.inputOverride}
          />
        );
      case "date":
        return (
          <DateTimePicker
            type="date"
            key={field?._id}
            // selected={selectedDateTime}
            // setDateTime={setSelectedDateTime}
            onChange={(event) =>
              handleInputChange(event, field?.variable, field?.type)
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
            register={()=>register(field?.variable)}
            placeholder={field?.placeholder}
            control={control}
            // onChange={(event) =>
            //   handleInputChange(event, field?.variable, field?.type)
            // }
            error={errors?.[field?.variable]?.message}
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
            register={()=>register(field?.variable)}
            control={control}
            error={errors?.[field?.variable]?.message}
            placeholder={field.placeholder}
            // onChange={(event) =>
            //   handleInputChange(event, field?.variable, field?.type)
            // }
            inputOverrideClassName={styles.inputOverride}
            overrideErrorClassName={styles.overrideErrorClass}
            containerOverrideClassName={styles.inputContainer}
          />
        );
      default:
        return null;
    }
  };
  if (fields?.length <= 0) return <p>loading</p>;

  return (
    <div className={styles["product-builder"]}>
      <form onSubmit={handleSubmit(formHandler)}>
        <div className={styles.fieldsContainer}>
          <div className={styles.container}>
            <InputField
              type="text"
              key="name"
              label="Enter Name"
              fieldName="staticName"
              placeholder="Enter Name"
              register={()=>register("staticName")}
              control={control}
              error={errors?.staticPrice?.message}
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
              fieldName="staticTag"
              placeholder="Enter Tag"
              label="Enter Tag"
              register={()=>register("staticTag")}
              control={control}
              error={errors?.staticPrice?.message}
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
              fieldName="staticPrice"
              placeholder="Enter Price"
              defaultValue={getValues("staticPrice")}
              label="Enter Price"
              register={()=>register("staticPrice")}
              control={control}
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
              defaultValue={getValues("staticPurchaseDate")}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default React.memo(ProductBuilder);
