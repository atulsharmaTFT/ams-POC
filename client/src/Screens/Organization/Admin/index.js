import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import adminServices from "../../../helper/adminServices";
import useAdminApiService from "../../../helper/useAdminApiService";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Type", accessor: "type" },
  { Header: "Organization Name", accessor: "organization.name" },
  { Header: "Organization ID", accessor: "organization.id" },
];

const Admin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getOrganizationsAdminLoading,
      isSuccess: isGetOrganizationsAdminSuccess,
      data: getOrganizationsAdminResponse,
      isError: isGetOrganizationsAdminError,
      error: getOrganizationsAdminError,
    },
    callService: getOrganizationsAdminService,
    resetServiceState: resetGetOrganizationsAdminState,
  } = useAdminApiService(adminServices.getAllOrganizationsAdmin);

  useEffect(() => {
    if (isGetOrganizationsAdminError && getOrganizationsAdminError) {
      console.log(getOrganizationsAdminError, "Error");
    }
    if (getOrganizationsAdminResponse && isGetOrganizationsAdminSuccess) {
      console.log(getOrganizationsAdminResponse);
      const formattedData = getOrganizationsAdminResponse.data.map((entry, index) => ({
        sno: index + 1,
        name: entry.name,
        email: entry.email,
        type: entry.type,
        organization: {
          name: entry.organization.name,
          id: entry.organization.id,
        },
      }));
      setData(formattedData);
    }
  }, [
    isGetOrganizationsAdminSuccess,
    getOrganizationsAdminResponse,
    isGetOrganizationsAdminError,
    getOrganizationsAdminError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getOrganizationsAdminService();
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
        onClick={() => navigate("/add-organizations-admin")} // Add your logic here
      >
        Add New Organization Admin
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

export default Admin;
