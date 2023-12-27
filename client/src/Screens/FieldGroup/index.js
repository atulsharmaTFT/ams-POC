import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
];

const FieldGroup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getFieldGroupsLoading,
      isSuccess: isGetFieldGroupsSuccess,
      data: getFieldGroupsResponse,
      isError: isGetFieldGroupsError,
      error: getFieldGroupsError,
    },
    callService: getFieldGroupsService,
    resetServiceState: resetGetFieldGroupsState,
  } = useAdminApiService(adminServices.getFieldGroups);

  useEffect(() => {
    if (isGetFieldGroupsError && getFieldGroupsError) {
      console.log(getFieldGroupsError, "Error");
    }
    if (isGetFieldGroupsSuccess && getFieldGroupsResponse) {
      setData(getFieldGroupsResponse?.data);
    }
  }, [
    isGetFieldGroupsSuccess,
    getFieldGroupsResponse,
    isGetFieldGroupsError,
    getFieldGroupsError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getFieldGroupsService();
      }
    };

    checkAdmin();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8001/field-groups");
  //       const apiData = await response.json();
  //       setData(apiData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Run the effect only once on mount

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
        onClick={() => navigate("/newFieldGroup")} // Add your logic here
      >
        Add New FieldGroup
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
export default FieldGroup;
