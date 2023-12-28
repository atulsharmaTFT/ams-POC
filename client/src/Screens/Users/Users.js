import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import classes from "./Users.module.scss";
import CSVUpload from "../../components/CSVUploader/CSVUploader";
import AddNewUser from "./AddNewUser/AddNewUser";
import Employee from "./AddNewUser/Employee/Employee";
import { FaUserPlus } from "react-icons/fa6";
import { RiFileExcel2Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi2";


import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/CustomTable";
import UploadExcelComponent from "./Helper/UploadExcelComponent";
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
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleUpload = (file) => {
    console.log("Uploaded CSV file:", file);
  };

  function handleShowForm() {
    setShowForm(!showForm);
  }
  function handleShowModal() {
    setShowModal(!showModal);
  }
  function handleSampleFile() {
    const url = require("../../assets/sampleFile.xlsx");
    window.open(url, "_blank");
  }
  const buttons = [
    {
      label: "View",
      onClick: (employee) => console.log("View employee:", employee),
    },
    {
      label: "Delete",
      onClick: (employee) => console.log("Delete employee:", employee),
    },
    {
      label: "Edit",
      onClick: (employee) => console.log("Edit employee:", employee),
    },
  ];
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
    console.log("Hello handleAddNewUser");
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
  return (
    <div className={classes.container}>
      <Modal
        modalHeaderClassName={classes.hideModalHeader}
        modalBodyClassName={classes.modalBody}
        show={showModal}
        title={"Upload User Data"}
        onClose={handleShowModal}
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
        <Button
          overrideClassName={classes.assignBtn}
          buttonText={"Assign Roles"}
          onClick={handleAddNewUser}
          icon={<HiOutlineUserGroup size={"25px"}/>}
          loading={false}
        />
        <Button
          overrideClassName={classes.excelBtn}
          buttonText={"Upload Excel"}
          onClick={handleShowModal}
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
