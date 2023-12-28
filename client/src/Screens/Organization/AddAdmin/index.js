import React, { useEffect, useState } from "react";
import classes from "./addAdmin.module.scss";
import InputField from "../../../components/FormHook/InputField";
import { useForm } from "react-hook-form";
import { FormProvider } from "../../../components/FormHook";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";

const AddAdmin = () => {
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

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getOrganizationLoading,
      isSuccess: isGetOrganizationSuccess,
      data: getOrganizationResponse,
      isError: isGetOrganizationError,
      error: getOrganizationError,
    },
    callService: getOrganizationService,
    resetServiceState: resetGetOrganizationState,
  } = useAdminApiService(adminServices.getAllOrganizations);

  const {
    state: {
      loading: addOrganizationAdminLoading,
      isSuccess: isAddOrganizationAdminSuccess,
      data: addOrganizationAdminResponse,
      isError: isAddOrganizationAdminError,
      error: addOrganizationAdminError,
    },
    callService: addOrganizationAdminService,
    resetServiceState: resetAddOrganizationAdminState,
  } = useAdminApiService(adminServices.addOrganizationAdmin);

  useEffect(() => {
    if (isGetOrganizationError && getOrganizationError) {
      console.log(getOrganizationError, "Error");
    }
    if (getOrganizationResponse && isGetOrganizationSuccess) {
      console.log(getOrganizationResponse);
      getOrganizationResponse?.data.forEach((item) => {
        item.isSelected = false;
      });
      setData(getOrganizationResponse?.data);
    }
  }, [
    isGetOrganizationSuccess,
    getOrganizationResponse,
    isGetOrganizationError,
    getOrganizationError,
    isAddOrganizationAdminSuccess,
    addOrganizationAdminResponse,
    isAddOrganizationAdminError,
    addOrganizationAdminError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getOrganizationService();
      }
    };

    checkAdmin();
  }, []);

  const handleItemClick = (item) => {
    data.forEach((x) => {
      if (x.id === item.id) {
        x.isSelected = true;
      } else {
        x.isSelected = false;
      }
    });
    setSelectedItem(item);
    reset();
  };

  const formHandler = async (data) => {
    data["organizationId"] = selectedItem?._id;
    console.log(data);

    await addOrganizationAdminService(data);
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
          {data.length > 0 &&
            data.map((item, index) => (
              <li
                className={
                  item.isSelected
                    ? `${classes.card} ${classes.selected}`
                    : `${classes.card}`
                }
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
                <p>Domain: {selectedItem?.domainCategory?.name}</p>
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
                  key={"name"}
                  type="text"
                  fieldName={"name"}
                  placeholder={"Enter name"}
                  error={errors?.["name"]}
                  defaultValue={getValues("name")}
                  inputOverrideClassName={classes.inputOverride}
                  overrideErrorClassName={classes.overrideErrorClass}
                  containerOverrideClassName={classes.inputContainer}
                />
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
              </FormProvider>
            </div>
          </div>
        ) : (
          <NoDataComponent />
        )}
      </div>
    </div>
  );
};

export default AddAdmin;
