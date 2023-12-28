import React, { useState } from "react";
import classes from "./addAdmin.module.scss";
import InputField from "../../../components/FormHook/InputField";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../../components/FormHook";

const  AddAdmin = () => {
  const [selectedItem, setSelectedItem] = useState(null);
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
  const listItems = [
    {
      name: "TFT",
      id: "1",
      email: "support@gmail.com",
      phone: "1212112121",
      website: "www.tftus.com",
      address: "Gurgaon",
      domainCategoryId: "IT",
    },
    {
      name: "Google",
      id: "2",
      email: "support@gmail.com",
      phone: "1212112123",
      website: "www.tftus.com",
      address: "Gurgaon",
      domainCategoryId: "Ecomeerce",
    },
    {
      name: "TCS",
      id: "3",
      email: "support@gmail.com",
      phone: "1212112124",
      website: "www.tftus.com",
      address: "Gurgaon",
      domainCategoryId: "Furniture",
    },
  ];
  const handleItemClick = (item) => {
    setSelectedItem(item);
    reset();
  };
  const formHandler = async (data) => {
    console.log(data, "data");
  };


function NoDataComponent() {
  return (
    <div className={classes.noData}>
      <h3>Please select organisation !</h3>
    </div>
  );
}

  return (
    <div className={classes.container}>
      <div className={classes.leftPanel}>
        <h2>Organization List</h2>
        <ul>
          {listItems.map((item, index) => (
            <li
              className={classes.card}
              key={index}
              onClick={() => handleItemClick(item)}
            >
              {item?.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.rightPanel}>
        {selectedItem ? (
          <div>
            <div className={classes.details}>
              <h2>Details of {selectedItem?.name}</h2>
              <div>
                <p>Name: {selectedItem?.name}</p>
                <p>Email: {selectedItem?.email}</p>
                <p>Address: {selectedItem?.address}</p>
                <p>Domain: {selectedItem?.domainCategoryId}</p>
              </div>
            </div>
            <div className={classes.details}>
              <h2>Add Admin for Organisation</h2>
              <FormProvider
                methods={methods}
                buttonName={"Submit"}
                onSubmit={handleSubmit(formHandler)}
                overrideClassName={classes.addBtn}
              >
                <InputField
                  key={"email"}
                  type="text"
                  fieldName={"email"}
                  placeholder={"Enter email"}
                  error={errors?.["email"]}
                  defaultValue={getValues("email")}
                  inputOverrideClassName={classes.inputOverride}
                  overrideErrorClassName={classes.overrideErrorClass}
                  containerOverrideClassName={classes.inputContainer}
                />
                <InputField
                  key={"password"}
                  type="password"
                  fieldName={"password"}
                  placeholder={"Enter password"}
                  error={errors?.["password"]}
                  defaultValue={getValues("password")}
                  inputOverrideClassName={classes.inputOverride}
                  overrideErrorClassName={classes.overrideErrorClass}
                  containerOverrideClassName={classes.inputContainer}
                />
              </FormProvider>
            </div>
          </div>
        ) : <NoDataComponent/>}
      </div>
    </div>
  );
}

export default AddAdmin;
