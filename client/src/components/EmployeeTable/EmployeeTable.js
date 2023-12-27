import React from "react";
import { useTable } from "react-table";
import classes from "./EmployeeTable.module.scss";

const EmployeeTable = ({ data }) => {
  const columns = [
    { Header: "Employee ID", accessor: "employeeId" },
    { Header: "Name", accessor: "fullName" },
    { Header: "Email", accessor: "email" },
    { Header: "Manager Name", accessor: "managerName" },
    { Header: "Designation", accessor: "designation" },
    { Header: "Department", accessor: "department" },
    { Header: "Joining Date", accessor: "joiningDate" },
    {
      Header: "Action",
      accessor: "action",
    },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table
      {...getTableProps()}
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "2px solid black",
                  background: "#f2f2f2",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                if (cell.column.Header === "Action") {
                  // return <td {...cell.getCellProps()}>{`${row.original.img} ${cell.render("Cell")}`}</td>
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      <button
                        // onClick={() => handleViewData(row.original)}
                        style={{ marginRight: "5px" }}
                      >
                        View
                      </button>
                      <button
                        // onClick={() => handleEditData(row.original)}
                        style={{ marginRight: "5px" }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={
                          () => {}
                          // handleDeleteData(row.original)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  );
                } else {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
