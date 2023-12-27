import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";
import PopUp from "../../components/PopUp";

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

  const {
    state: {
      loading: createNewDomainLoading,
      isSuccess: isCreateNewDomainSuccess,
      data: createNewDomainResponse,
      isError: isCreateNewDomainError,
      error: createNewDomainError,
    },
    callService: createNewDomainService,
    resetServiceState: resetCreateNewDomainState,
  } = useAdminApiService(adminServices.addDomain);

  useEffect(() => {
    if (isGetAllDomainsError && getAllDomainsError) {
      console.log(getAllDomainsError, "Error");
    }
    if (isGetAllDomainsSuccess && getAllDomainsResponse) {
      setData(getAllDomainsResponse?.data);
    }
    if (isCreateNewDomainSuccess && createNewDomainResponse) {
      console.log(createNewDomainResponse);
      // fetchData();
    }
    if (isCreateNewDomainError && createNewDomainError) {
      console.log(getAllDomainsError, "Error");
    }
  }, [
    isGetAllDomainsSuccess,
    getAllDomainsResponse,
    getAllDomainsError,
    isGetAllDomainsError,
    isCreateNewDomainSuccess,
    createNewDomainResponse,
    isCreateNewDomainError,
    createNewDomainError,
  ]);

  // const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getAllDomainsService();
    };
    fetchData();
  }, []); // Run the effect only once on mount

  const handleSubmit = async (item) => {
    console.log(item);
    const obj = {
      name: item,
    };

    await createNewDomainService(obj);
    await getAllDomainsService();
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div>
      {openModal && (
        <PopUp
          title="Example Modal"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={(item) => handleSubmit(item)}
        />
      )}
      <button
        style={{
          marginTop: "16px",
          padding: "8px",
          fontSize: "16px",
        }}
        onClick={() => setOpenModal(true)} // Add your logic here
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
