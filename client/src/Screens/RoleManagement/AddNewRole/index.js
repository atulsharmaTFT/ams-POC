import React from "react";
import classes from "./newRole.module.scss";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../../components/FormHook";
import InputField from "../../../components/FormHook/InputField";
import CheckBox from "../../../components/FormHook/CheckBox/CheckBox";

const AddNewRole = () => {
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

  const formHandler = (data) => {
    console.log(data, "form Data");
  };
  const headers = ["Actions", "Read", "Create", "Modify", "Delete"];
  const permissions = [
    {
      action: "Asset Management",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "Request Return",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "User Management",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "Fields",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "Fields Groups",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "Templates",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "Domain/Category",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "Role Management",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
    {
      action: "Reports Management",
      permission: {isReadAllowed: false ,isCreateAllowed: false , isModifyAllowed: false , isDeleteAllowed: false}
    },
  ];
  const [permissionList, setPermissionList] = React.useState(permissions);
  const handlePermissionChange = (index, permissionType) => {
    const updatedPermissions = [...permissionList];
    updatedPermissions[index].permission[permissionType] = !updatedPermissions[index].permission[permissionType];
    setPermissionList(updatedPermissions);
  };
console.log(permissionList,"List")
  return (
    <div className={classes.container}>
      <FormProvider
        methods={methods}
        buttonName={"Submit"}
        onSubmit={handleSubmit(formHandler)}
        overrideClassName={classes.addBtn}
      >
        <InputField
          key={"role"}
          type="text"
          fieldName={"role"}
          placeholder={"Enter role name"}
          error={errors?.["role"]}
          defaultValue={getValues("role")}
          inputOverrideClassName={classes.inputOverride}
          overrideErrorClassName={classes.overrideErrorClass}
          containerOverrideClassName={classes.inputContainer}
        />
        <h3>Access Control - Permisson Management</h3>
        <div className={classes.accessControl}>
          <div>
            <div className={classes.headerRow}>
              {headers.map((header, index) => (
                <div key={index} style={{flex:1,display:'flex', justifyContent:index == 0 ? "flex-start":'center', alignItems:index == 0 ? "flex-start":'center'}}>{header}</div>
              ))}
            </div>
            <div style={{ height: "10px" }} />
            <div className={classes.dataRow}>
              {permissionList.map((item, index) => (
                <div className={classes.permissionControl}
                >
                <div key={index} style={{width:"440px"}}>{item?.action}</div>
                {Object.keys(item.permission).map((inputs)=>{
                     return <input
                     type="checkbox"
                     checked={item.permission?.[inputs]}
                     onChange={() => handlePermissionChange(index, inputs)}
                     className={classes.check}
                   />
                })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default AddNewRole;
