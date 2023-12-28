import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import classes from "./Users.module.scss";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { RiFileExcel2Line } from "react-icons/ri";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/CustomTable";
import UploadExcelComponent from "./Helper/UploadExcelComponent";
import { AppRoutes } from "../../constants/app.routes";
import SearchBar from "../../components/SearchBar";
const employeeData = [
  {
    employeeId: "1343",
    fullName: "ABC",
    email: "abc@tftus.com",
    managerName: "ManagerXYZ",
    designation: "Software Trainee",
    department: "Development",
    joiningDate: "31-07-2023",
  },
  {
    employeeId: "1343",
    fullName: "ABC",
    email: "abc@tftus.com",
    managerName: "ManagerXYZ",
    designation: "Software Trainee",
    department: "Development",
    joiningDate: "31-07-2023",
  },
  {
    employeeId: "1343",
    fullName: "ABC",
    email: "abc@tftus.com",
    managerName: "ManagerXYZ",
    designation: "Software Trainee",
    department: "Development",
    joiningDate: "31-07-2023",
  },
];

function Users() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const handleUpload = (file) => {
    console.log("Uploaded CSV file:", file);
  };

  function handleShowModal(type) {
    if(type === "1") setShowModal(!showModal);
  }
  function handleSampleFile() {
    const url = require("../../assets/sampleFile.xlsx");
    window.open(url, "_blank");
  }
  const headers = [
    "Employee Id",
    "Full Name",
    "Email",
    "Manager Name",
    "Designation",
    "Department",
    "Joining Date",
  ];
  const columnWidths = [
    { width: "100px" },
    { width: "100px" },
    { width: "120px" },
    { width: "150px" },
    { width: "150px" },
    { width: "100px" },
    { width: "120px" },
  ];
  function handleAddNewUser() {
    navigate(AppRoutes.ADD_USER)
  }
  const onView = (row) => {
    console.log("View", row);
  };

  const onEdit = (row) => {
    console.log("Edit", row);
  };

  const onDelete = (row) => {
    console.log("Delete", row);
  };
  const handleSearch = () => {
    console.log("handleSearch", searchValue);
  };
  return (
    <div className={classes.container}>
      <Modal
        modalHeaderClassName={classes.hideModalHeader}
        modalBodyClassName={classes.modalBody}
        show={showModal}
        title={"Upload User Data"}
        onClose={()=>handleShowModal("1")}
      >
        <UploadExcelComponent
          handleSampleFile={handleSampleFile}
          handleUpload={handleUpload}
          downloadClass={classes.addBtn}
        />
      </Modal>
      <div
        style={{
          flex: 1,
          flexDirection: "row",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SearchBar
        searchTerm={searchValue}
        setSearchTerm={setSearchValue}
        handleSearch={handleSearch}
        />
        <Button
          overrideClassName={classes.excelBtn}
          buttonText={"Upload Excel"}
          onClick={()=>handleShowModal("1")}
          icon={<RiFileExcel2Line size={"25px"}/>}
          loading={false}
        />
        <Button
          type="submit"
          overrideClassName={classes.addNewUser}
          buttonText={"Add User"}
          icon={<FaUserPlus size={"25px"} />}
          onClick={handleAddNewUser}
          loading={false}
        />
      </div>
      <CustomTable
        data={employeeData}
        headers={headers}
        columnWidths={columnWidths}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

export default Users;
