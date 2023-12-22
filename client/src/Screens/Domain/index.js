import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
  { Header: "Created At", accessor: "createdAt" },
];

const Domain = () => {
  const {
    state: {
      loading: getAllDomainsLoading,
      isSuccess: isGetAllDomainsSuccess,
      data: getAllDomainsResponse,
      isError: isGetAllDomainsError,
      error: getAllDomainsError,
    },
    callService: getAllDomainsService,
    resetServiceState: resetGetAllDomainsState,
  } = useAdminApiService(adminServices.getAllDomains);

  useEffect(() => {
    if (isGetAllDomainsError && getAllDomainsError) {
      console.log(getAllDomainsError, "Error");
    }
    if (isGetAllDomainsSuccess && getAllDomainsResponse) {
      // console.log(getAllAssetsResponse, "Response");
      // console.log(getAllAssetsLoading);
      setData(getAllDomainsResponse?.data);
    }
  }, [
    isGetAllDomainsSuccess,
    getAllDomainsResponse,
    getAllDomainsError,
    isGetAllDomainsError,
  ]);

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllDomainsService();
    };

    fetchData();
  }, []); // Run the effect only once on mount

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
        Add New Domain Category
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
                {row.cells.map((cell) => {
                  console.log(cell);
                  if (cell.column.Header === "Created At") {
                    const formattedDate = new Date(cell.value)
                      .toISOString()
                      .split("T")[0];
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          border: "1px solid black",
                          padding: "8px",
                        }}
                      >
                        {formattedDate}
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
    </div>
  );
};
export default Domain;
