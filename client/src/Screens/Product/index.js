import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
  { Header: "Action", accessor: "action" },
];

const Product = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/products");
        const apiData = await response.json();
        console.log(apiData);
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddData = (data) => {
    navigate(`/addProductDetails/${data._id}`);
  };

  const handleEditData = (data) => {
    navigate(`/editProductfields/${data._id}`);
  };

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
        onClick={() => navigate("/newProduct")} // Add your logic here
      >
        Add New Product
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
                          style={{
                            padding: "6px 10px",
                            fontSize: "14px",
                            cursor: "pointer",
                            marginRight: "5px",
                          }}
                          onClick={() => handleAddData(row.original)}
                        >
                          Add Data
                        </button>
                        <button
                          style={{
                            padding: "6px 10px",
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditData(row.original)}
                        >
                          Edit Data
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
    </div>
  );
};
export default Product;
