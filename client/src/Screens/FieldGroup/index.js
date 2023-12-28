import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";
import CustomTable from "../../components/CustomTable";
import Button from "../../components/Button/Button";
import classes from "./FieldGroup.module.scss"
import { AppRoutes } from "../../constants/app.routes";

const FieldGroup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getFieldGroupsLoading,
      isSuccess: isGetFieldGroupsSuccess,
      data: getFieldGroupsResponse,
      isError: isGetFieldGroupsError,
      error: getFieldGroupsError,
    },
    callService: getFieldGroupsService,
    resetServiceState: resetGetFieldGroupsState,
  } = useAdminApiService(adminServices.getFieldGroups);

  useEffect(() => {
    if (isGetFieldGroupsError && getFieldGroupsError) {
      console.log(getFieldGroupsError, "Error");
    }
    if (isGetFieldGroupsSuccess && getFieldGroupsResponse) {
      setData(getFieldGroupsResponse?.data);
    }
  }, [
    isGetFieldGroupsSuccess,
    getFieldGroupsResponse,
    isGetFieldGroupsError,
    getFieldGroupsError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getFieldGroupsService();
      }
    };

    checkAdmin();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8001/field-groups");
  //       const apiData = await response.json();
  //       let newD = apiData?.map((item)=>{
  //         const names = item?.fields?.map((name)=> {return name?.name})
  //         console.log(names,"names")
  //         return {groupName: item?.name , fieldsCount: item?.fields?.length, fieldsName:names.join(',') }
  //       })
  //       setData(newD);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Run the effect only once on mount
const headers = ["Group Name", "Count" , "Fields Name"]
const columnWidths=[
  {width: "350px"},
  {width: "200px"},
  {width: "400px"}
]
console.log(data,"data")
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
          buttonText={"Add Field Group"}
          onClick={() => navigate(AppRoutes.FIELDGROUP)}
          loading={false}
        />
      </div>
      {/* Render the table */}
      <CustomTable
        data={data}
        headers={headers}
        columnWidths={columnWidths}
        showActions={false}
      />
    </div>
  );
};
export default FieldGroup;
