import React, { useEffect, useState } from "react";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";
import PopUp from "../../components/PopUp";
import CustomTable from "../../components/CustomTable";
import Button from "../../components/Button/Button";
import classes from "./Domain.module.scss";

const headers = ["S.no", "Name", "Created At"];
const columnWidths = [
  { width: "100px" },
  { width: "800px" },
  { width: "120px" },
];

const Domain = () => {
  const {
    state: {
      loading: getAllDomainsLoading,
      isSuccess: isGetAllDomainsSuccess,
      data: getAllDomainsResponse,
      isError: isGetAllDomainsError,
      error: getAllDomainsError,
    },
    callService: getAllDomainsService,
    resetServiceState: resetGetAllDomainsState,
  } = useAdminApiService(adminServices.getAllDomains);

  const {
    state: {
      loading: createNewDomainLoading,
      isSuccess: isCreateNewDomainSuccess,
      data: createNewDomainResponse,
      isError: isCreateNewDomainError,
      error: createNewDomainError,
    },
    callService: createNewDomainService,
    resetServiceState: resetCreateNewDomainState,
  } = useAdminApiService(adminServices.addDomain);

  useEffect(() => {
    if (isGetAllDomainsError && getAllDomainsError) {
      console.log(getAllDomainsError, "Error");
    }
    if (isGetAllDomainsSuccess && getAllDomainsResponse) {
      setData(getAllDomainsResponse?.data);
    }
    if (isCreateNewDomainSuccess && createNewDomainResponse) {
      console.log(createNewDomainResponse);
      // fetchData();
    }
    if (isCreateNewDomainError && createNewDomainError) {
      console.log(getAllDomainsError, "Error");
    }
  }, [
    isGetAllDomainsSuccess,
    getAllDomainsResponse,
    getAllDomainsError,
    isGetAllDomainsError,
    isCreateNewDomainSuccess,
    createNewDomainResponse,
    isCreateNewDomainError,
    createNewDomainError,
  ]);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getAllDomainsService();
    };
    fetchData();
  }, []);

  const handleSubmit = async (item) => {
    console.log(item);
    const obj = {
      name: item,
    };

    await createNewDomainService(obj);
    await getAllDomainsService();
  };
  return (
    <div className={classes.container}>
      {openModal && (
        <PopUp
          title="Example Modal"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={(item) => handleSubmit(item)}
        />
      )}
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
          buttonText={"Add New Domain Category"}
          onClick={() => setOpenModal(true)}
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
export default Domain;
