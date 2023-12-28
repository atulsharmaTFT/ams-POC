import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import adminServices from "../../helper/adminServices";
import useAdminApiService from "../../helper/useAdminApiService";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Address", accessor: "address" },
  { Header: "Domain Category", accessor: "domainCategory.name" },
  { Header: "Phone", accessor: "phone" },
  { Header: "Website", accessor: "website" },
];

const Organization = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getOrganizationLoading,
      isSuccess: isGetOrganizationSuccess,
      data: getOrganizationResponse,
      isError: isGetOrganizationError,
      error: getOrganizationError,
    },
    callService: getOrganizationService,
    resetServiceState: resetGetOrganizationState,
  } = useAdminApiService(adminServices.getAllOrganizations);

  useEffect(() => {
    if (isGetOrganizationError && getOrganizationError) {
      console.log(getOrganizationError, "Error");
    }
    if (getOrganizationResponse && isGetOrganizationSuccess) {
      console.log(getOrganizationResponse);
      setData(getOrganizationResponse?.data);
    }
  }, [
    isGetOrganizationSuccess,
    getOrganizationResponse,
    isGetOrganizationError,
    getOrganizationError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getOrganizationService();
      }
    };

    checkAdmin();
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div>
      <button
        style={{
          marginTop: "16px",
          padding: "8px",
          fontSize: "16px",
        }}
        onClick={() => navigate("/newOrganization")} // Add your logic here
      >
        Add New Organization
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

export default Organization;
