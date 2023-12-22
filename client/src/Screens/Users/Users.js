import React, { useState } from "react";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import classes from "./Users.module.scss";
import CSVUpload from "../../components/CSVUploader/CSVUploader";
import AddNewUser from "./AddNewUser/AddNewUser";
const dummyData = [
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
  function handleShowForm() {
    setShowForm(!showForm);
  }
  return (
    <div className={classes.users}>
      <div className={classes.addActions}>
        <CSVUpload onUpload={handleUpload} />
      </div>
      <div className={classes.userTable}>
        {showForm?<h1>Add New User</h1>:<h1>Employee Table</h1>}
        <button className={classes.addUser} onClick={handleShowForm}>
          Add New User
        </button>
        {showForm&&<AddNewUser/>}
        {!showForm && <EmployeeTable data={dummyData} />}
      </div>
    </div>
  );
}

export default Users;
