import React from "react";
import EmployeeTable from "../../components/EmployeeTable/EmployeeTable";

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

function Users() {
  return (
    <div>
      <h1>Employee Table</h1>
      <EmployeeTable data={dummyData} />
    </div>
  );
}

export default Users;
