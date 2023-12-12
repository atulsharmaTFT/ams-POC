import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Tag", accessor: "tag" },
  { Header: "Purchase Date", accessor: "purchaseDate" },
  { Header: "Created At", accessor: "createdAt" },
  { Header: "In Inventory", accessor: "isInInventory" },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Assets = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const {
    state: {
      loading: getAllAssetsLoading,
      isSuccess: isGetAllAssetsSuccess,
      data: getAllAssetsResponse,
      isError: isGetAllAssetsError,
      error: getAllAssetsError,
    },
    callService: getAllAssetsService,
    resetServiceState: resetGetAllAssetsState,
  } = useAdminApiService(adminServices.getAllAssets);

  const {
    state: {
      loading: deleteExistingAssetsLoading,
      isSuccess: isDeleteExistingAssetsSuccess,
      data: deleteExistingAssetsResponse,
      isError: isDeleteExistingAssetsError,
      error: deleteExistingAssetsError,
    },
    callService: deleteExistingAssetsService,
    resetServiceState: resetDeleteExistingAssetsState,
  } = useAdminApiService(adminServices.deleteExistingAsset);
 
  const {
    state: {
      loading: moveExistingAssetToInventoryLoading,
      isSuccess: isMoveExistingAssetToInventorySuccess,
      data: moveExistingAssetToInventoryResponse,
      isError: isMoveExistingAssetToInventoryError,
      error: moveExistingAssetToInventoryError,
    },
    callService: moveExistingAssetToInventoryService,
    resetServiceState: resetMoveExistingAssetToInventoryState,
  } = useAdminApiService(adminServices.moveToInventory);

  useEffect(() => {
    if (isGetAllAssetsError && getAllAssetsError) {
      console.log(getAllAssetsError, "Error");
    }
    if (isGetAllAssetsSuccess && getAllAssetsResponse) {
      // console.log(getAllAssetsResponse, "Response");
      // console.log(getAllAssetsLoading);
      setData(getAllAssetsResponse.assets);
    }
  }, [
    isGetAllAssetsSuccess,
    getAllAssetsResponse,
    isGetAllAssetsError,
    getAllAssetsError,
    isDeleteExistingAssetsSuccess,
    deleteExistingAssetsResponse,
    isDeleteExistingAssetsError,
    deleteExistingAssetsError,
  ]);

  useEffect(() => {
    getAllAssets();
  }, []);

  const getAllAssets = async () => {
    const queryParams = `page=1&limit=10`;
    await getAllAssetsService(queryParams);
  };

  const handleViewData = (data) => {
    console.log(data);
    navigate(`/viewAsset/${data._id}`);
    // navigate(`/viewProductDetails/${data._id}`);
  };

  const handleEditData = (data) => {
    navigate(`/editAsset/${data._id}`);
  };

  const handleMoveData = async(data) => {
    console.log(data);
    await moveExistingAssetToInventoryService(data._id);
    getAllAssets();
  };

  const handleDeleteData = async (data) => {
    // navigate(`/editAsset/${data._id}`);
    console.log(data);
    await deleteExistingAssetsService(data._id);
    getAllAssets();
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data });

  return (
    <div>
      {!getAllAssetsLoading && (
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
                            onClick={() => handleViewData(row.original)}
                            style={{ marginRight: "5px" }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEditData(row.original)}
                            style={{ marginRight: "5px" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleMoveData(row.original)}
                            style={{ marginRight: "5px" }}
                          >
                            Move
                          </button>
                          <button
                            onClick={() => handleDeleteData(row.original)}
                          >
                            Delete
                          </button>
                        </td>
                      );
                    } else if (
                      cell.column.Header === "Purchase Date" ||
                      cell.column.Header === "Created At"
                    ) {
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
                    } else if (cell.column.Header === "In Inventory") {
                      // Add a specific check for the "isInInventory" column
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                          }}
                        >
                          {JSON.stringify(cell.value)}
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
      )}
    </div>
  );
};

export default Assets;
