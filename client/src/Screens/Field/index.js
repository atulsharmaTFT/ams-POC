import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminServices from "../../helper/adminServices";
import useAdminApiService from "../../helper/useAdminApiService";
import classes from "./Field.module.scss"
import CustomTable from "../../components/CustomTable";
import Button from "../../components/Button/Button";

const headers = ["Sno","Name","Type"];
const columnWidths = [
  { width: "100px" },
  { width: "800px" },
  { width: "120px" },
]

const Field = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getFieldsLoading,
      isSuccess: isGetFieldsSuccess,
      data: getFieldsResponse,
      isError: isGetFieldsError,
      error:getFieldsError,
    },
    callService: getFieldsService,
    resetServiceState: resetGetFieldsState,
  } = useAdminApiService(adminServices.getField);

  useEffect(() => {
    if (isGetFieldsError && getFieldsError) {
      console.log(getFieldsError, "Error");
    }
    if (isGetFieldsSuccess && getFieldsResponse) {
      setData(getFieldsResponse?.data);
    }
  }, [
    isGetFieldsSuccess,
    getFieldsResponse,
    isGetFieldsError,
    getFieldsError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getFieldsService();
      }
    };

    checkAdmin();
  }, []);
  const fieldData = data.map(({ _id, name,type},index) => ({
    index:index+1,
    name,
    type,
  }));
  return (
    <div className={classes.container}>
    <div
      style={{
        flex: 1,
        flexDirection: "row",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        type="submit"
        overrideClassName={classes.addBtn}
        buttonText={" Add New Field"}
          onClick={()=>navigate("/newField")}
        loading={false}
      />
    </div>
      {/* Render the table */}
      <CustomTable
        data={fieldData}
        headers={headers}
        columnWidths={columnWidths}
        showActions={false}
      />
    </div>
  );
};
export default Field;
