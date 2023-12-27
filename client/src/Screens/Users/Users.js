import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css";
import classes from "./Users.module.scss";
import CSVUpload from "../../components/CSVUploader/CSVUploader";
import AddNewUser from "./AddNewUser/AddNewUser";
import Employee from "./AddNewUser/Employee/Employee";
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
  function handleShowForm() {
    setShowForm(!showForm);
  }
  const buttons = [
    {
      label: 'View',
      onClick: (employee) => console.log('View employee:', employee),
    },
    {
      label: 'Delete',
      onClick: (employee) => console.log('Delete employee:', employee),
    },
    {
      label: 'Edit',
      onClick: (employee) => console.log('Edit employee:', employee),
    },
  ];
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
        {!showForm && <Employee  data={employeeData} buttons={buttons}/>}
       
      </div>
    </div>
  );
}

export default Users;
