import React, { useState } from "react";
import CustomTable from "../../components/CustomTable";
import classes from "./roleManagement.module.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants/app.routes";
import SearchBar from "../../components/SearchBar";

const RoleManagement = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const data = [
    { name: "Manager", users: "28", permissions: "All", createdBy: "Admin" },
    { name: "It", users: "35", permissions: "5", createdBy: "Admin" },
    { name: "Sales", users: "8", permissions: "6", createdBy: "Admin" },
    { name: "Employees", users: "103", permissions: "4", createdBy: "Admin" },
    { name: "Sales", users: "10", permissions: "6", createdBy: "Admin" },
    {
      name: "Human Resource",
      users: "10",
      permissions: "6",
      createdBy: "Admin",
    },
  ];

  const headers = ["Roles", "Users", "Permissions Allowed", "Created By"];

  const columnWidths = [
    { width: "200px" },
    { width: "200px" },
    { width: "200px" },
    { width: "300px" },
  ];
  const onView = (row) => {
    console.log("View", row);
  };

  const onEdit = (row) => {
    console.log("Edit", row);
  };

  const onDelete = (row) => {
    console.log("Delete", row);
  };
  const handleAddNewrole = () => {
    navigate(AppRoutes.NEW_ROLE);
  };
  const handleSearch = () => {
    console.log(searchValue, "searched Value");
  };
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
        <SearchBar
          searchTerm={searchValue}
          setSearchTerm={setSearchValue}
          handleSearch={handleSearch}
        />
        <Button
          type="submit"
          overrideClassName={classes.addBtn}
          buttonText={"New role"}
          onClick={handleAddNewrole}
          loading={false}
        />
      </div>
      <CustomTable
        data={data}
        headers={headers}
        columnWidths={columnWidths}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};
export default RoleManagement;
