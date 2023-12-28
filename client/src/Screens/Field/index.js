import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import adminServices from "../../helper/adminServices";
import useAdminApiService from "../../helper/useAdminApiService";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
  { Header: "Type", accessor: "type" },
];

const Field = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getFieldsLoading,
      isSuccess: isGetFieldsSuccess,
      data: getFieldsResponse,
      isError: isGetFieldsError,
      error:getFieldsError,
    },
    callService: getFieldsService,
    resetServiceState: resetGetFieldsState,
  } = useAdminApiService(adminServices.getField);

  useEffect(() => {
    if (isGetFieldsError && getFieldsError) {
      console.log(getFieldsError, "Error");
    }
    if (isGetFieldsSuccess && getFieldsResponse) {
      setData(getFieldsResponse?.data);
    }
  }, [
    isGetFieldsSuccess,
    getFieldsResponse,
    isGetFieldsError,
    getFieldsError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getFieldsService();
      }
    };

    checkAdmin();
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div>
      <button
        style={{
          marginTop: "16px",
          padding: "8px",
          fontSize: "16px",
        }}
        onClick={() => navigate("/newField")} // Add your logic here
      >
        Add New Field
      </button>
      {/* Render the table */}
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
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Field;
