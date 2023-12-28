import React from "react";
import { useForm } from "react-hook-form";
import classes from "./AddNewUser.module.scss";
import { FormProvider } from "../../../components/FormHook";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import MultiselectDropdown from "../../../components/FormHook/MultiSelectDropdown/MultiselectDropdown";
import { useNavigate } from "react-router-dom";
import InputField from "../../../components/FormHook/InputField";
import DateTimePicker from "../../../components/FormHook/DatePicker/DateTimePicker";

function AddNewUser() {
  const navigate = useNavigate();
  const methods = useForm({
    shouldUnregister: false,
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
  console.log(errors);
  const onSubmit = (data) => {
    console.log("data", data);
    reset();
  };
  const Roles = [
    { label: "Manager", value: "Manager" },
    { label: "Read Only", value: "Read Only" },
  ];
  const Users = [
    { label: "Ganesh", value: "Ganesh" },
    { label: "Gaitoned", value: "Gaitonde" },
    { label: "Hercules", value: "Hercules" },
    { label: "Ashwathama", value: "Ashwathama" },
  ];
  return (
    <div className={classes.container}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MdOutlineArrowBackIosNew onClick={() => navigate(-1)} size={"25px"} />
        <h1>Add User Details</h1>
        <div />
      </div>
      <FormProvider
        methods={methods}
        buttonName={"Submit"}
        onSubmit={handleSubmit(onSubmit)}
        overrideClassName={classes.addBtn}
      >
        {/* Role Assing */}
        {/* <p>Select User</p>
        <MultiselectDropdown
          isMulti={false}
          key={"user"}
          category={"Please select user"}
          data={Users}
          handleChange={(selectedValue, action) => {
            setValue("user", selectedValue);
            methods.clearErrors("user");
          }}
          error={errors?.["user"]?.message}
          selected={getValues("user")}
          fieldName={"user"}
          className={classes.inputOverride}
        /> */}

        <InputField
          type="text"
          key={"empId"}
          label={"Employee ID"}
          labelClassName={classes.formLabels}
          fieldName={"empId"}
          error={errors?.empId?.message}
          placeholder={"Enter Employee ID"}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />

        <InputField
          type="text"
          key={"empName"}
          label={"Employee Name"}
          fieldName={"empName"}
          labelClassName={classes.formLabels}
          error={errors?.empName?.message}
          placeholder={"Enter Full Name"}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />

        <InputField
          type="text"
          key={"empEmail"}
          label={"Email"}
          fieldName={"empEmail"}
          labelClassName={classes.formLabels}
          error={errors?.empEmail?.message}
          placeholder={"Enter Email"}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />

        <InputField
          type="text"
          key={"mangName"}
          label={"Manager Name"}
          labelClassName={classes.formLabels}
          fieldName={"mangName"}
          error={errors?.mangName?.message}
          placeholder={"Enter Manager Name"}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />

        <InputField
          type="text"
          key={"mangEmail"}
          fieldName={"mangEmail"}
          label={"Enter Manager Email"}
          error={errors?.mangEmail?.message}
          labelClassName={classes.formLabels}
          placeholder={"Enter Manager Email"}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />
        <p className={classes.formLabels}>Select Role for User</p>
        <MultiselectDropdown
          isMulti={true}
          key={"roles"}
          
          category={"Please select role"}
          data={Roles}
          handleChange={(selectedValue, action) => {
            setValue("roles", selectedValue);
            methods.clearErrors("roles");
          }}
          error={errors?.["roles"]?.message}
          selected={getValues("roles")}
          fieldName={"roles"}
          className={classes.inputOverride}
        />
        <InputField
          type="text"
          key={"designation"}
          fieldName={"designation"}
          label={"Enter Designation"}
          error={errors?.designation?.message}
          labelClassName={classes.formLabels}
          placeholder={"Enter Designation"}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />
        <InputField
          type="text"
          key={"department"}
          fieldName={"department"}
          label={"Enter Department"}
          error={errors?.department?.message}
          labelClassName={classes.formLabels}
          placeholder={"Enter Department"}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />
        <DateTimePicker
          key="joiningDate"
          label="Enter Joining Date"
          labelClassName={classes.formLabels}
          fieldName="joiningDate"
          defaultValue={getValues("purchaseDate")}
          inputOverrideClassName={classes.inputContainer}
          overrideClassName={classes.inputOverride}
        />
      </FormProvider>
    </div>
  );
}

export default AddNewUser;
