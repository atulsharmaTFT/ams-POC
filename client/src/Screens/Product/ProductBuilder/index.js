import React, { useEffect, useState } from "react";
import styles from "./ProductBuilder.module.scss";
import RadioButton from "../../../components/RadioButton";
import InputField from "../../../components/InputField";
import DateTimePicker from "../../../components/DatePicker/DateTimePicker";
import MultiselectDropdown from "../../../components/MultiSelectDropdown/MultiselectDropdown";
import CheckBox from "../../../components/CheckBox/CheckBox";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { useForm } from "react-hook-form";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import { useParams } from "react-router-dom";
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

  const {
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      staticName: name ? name : "",
      staticPrice: price ? price : 0,
      staticTag: tag ? tag : "",
      staticPurchaseDate: purchaseDate
        ? new Date(purchaseDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      // staticImage: null,
    },
  });

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

  const params = useParams();

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
        handleRadioChange(data?.[variable]?.option, field);
        break;
      case "checkbox":
        data?.[variable]?.forEach((item) => {
          if (item.checked) {
            handleCheckBoxClick(item.option, field);
          }
        });
        break;
      case "multiSelect":
        handleOptionChange(
          data?.[variable],
          { action: "select-option" },
          "multiSelect",
          variable,
          field
        );
        break;
      case "slider":
      case "dropdown":
        handleOptionChange(
          data?.[variable],
          { action: "select-option" },
          "dropdown",
          variable,
          field
        );
        break;
      case "date":
        if (data?.[variable]) {
          handleInputChange(data?.[variable], variable, field.type, field);
        }
        break;
      case "number":
        handleInputChange(data?.[variable], variable, field.type, field);
        break;
      case "text":
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
    console.log(options);
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
    console.log("data from here", data);
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
            handleChange={(selectedValue, action) =>
              handleOptionChange(
                selectedValue,
                action,
                field?.type,
                field?.variable,
                field
              )
            }
            selected={field?.value}
            className={styles.inputOverride}
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
                field?.variable,
                field
              )
            }
            selected={field?.value}
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
            fieldName={field.name}
            defaultValue={field.value}
            placeholder={field.placeholder}
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
      case "text":
        return (
          <InputField
            type="text"
            key={field._id}
            defaultValue={field.value}
            fieldName={field.name}
            placeholder={field.placeholder}
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
        <button type="submit">{buttonName}</button>
      </form>
    </div>
  );
};

export default React.memo(ProductBuilder);
