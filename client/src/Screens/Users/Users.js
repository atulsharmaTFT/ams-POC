import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import classes from "./Users.module.scss";
import CSVUpload from "../../components/CSVUploader/CSVUploader";
import AddNewUser from "./AddNewUser/AddNewUser";
import Employee from "./AddNewUser/Employee/Employee";
import Modal from "../../components/Modal/Modal";
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
const handleUpload = (file) => {
  console.log("Uploaded CSV file:", file);
};

function Users() {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
  return (
    <div className={classes.users}>
      <div className={classes.addActions}>
        <Modal
          modalHeaderClassName={classes.hideModalHeader}
          modalBodyClassName={classes.modalBody}
          show={showModal}
          title={"Import CSV"}
          onClose={handleShowModal}
        >
          <CSVUpload onUpload={handleUpload} />
          <p>instructions</p>
          <button onClick={handleSampleFile}>download</button>
          <button>Submit</button>
        </Modal>
        <button className={classes.addUser} onClick={handleShowModal}>
          {"Import CSV"}
        </button>
      </div>
      <div className={classes.userTable}>
        {showForm ? <h1>Add New User</h1> : <h1>Employee Table</h1>}
        <button className={classes.addUser} onClick={handleShowForm}>
          {showForm ? "View Table" : "Add New User"}
        </button>

        {showForm && <AddNewUser />}
        {!showForm && <Employee data={employeeData} buttons={buttons} />}
      </div>
    </div>
  );
}

export default Users;
