import React from "react";
import { useForm } from "react-hook-form";
import classes from "./AddNewUser.module.scss";
import { FormProvider } from "../../../components/FormHook";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import MultiselectDropdown from "../../../components/FormHook/MultiSelectDropdown/MultiselectDropdown";
import { useNavigate } from "react-router-dom";

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
      <div style={{flex:1, display:'flex', flexDirection:"row", justifyContent:'space-between', alignItems:'center'}}>
      <MdOutlineArrowBackIosNew onClick={()=>navigate(-1)} size={"25px"}/>
      <h1>Add User Details</h1>
      <div/>
      </div>
      <FormProvider
        methods={methods}
        buttonName={"Submit"}
        onSubmit={handleSubmit(onSubmit)}
        overrideClassName={classes.addBtn}
      >
        {/* Role Assing */}
        <p>Select User</p>
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
        />
        <p>Select Role for User</p>
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
      </FormProvider>
    </div>
  );
}

export default AddNewUser;
