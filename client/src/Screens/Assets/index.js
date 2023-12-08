import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

const columns = [
  { Header: "Sno.", accessor: "sno", Cell: ({ row }) => row.index + 1 },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Tag", accessor: "tag" },
  { Header: "Purchase Date", accessor: "purchaseDate" },
  { Header: "Created At", accessor: "createdAt" },
  {
    Header: "Action",
    accessor: "action",
  },
];

const dummyData = {
  assets: [
    {
      _id: "65718b2f16ea919280f15693",
      name: "Product Name",
      tag: "ProductTag",
      price: 9.99,
      purchaseDate: "2023-12-06T00:00:00.000Z",
      productId: "65718a3616ea919280f15685",
      data: {
        f4: {
          option: "YES",
          checked: true,
        },
        f1: [
          {
            option: "j",
            checked: true,
          },
          {
            option: "l",
            checked: true,
          },
        ],
        f2: {
          label: "DDR3",
          value: "123",
        },
        f3: [
          {
            label: "DElLHI",
            value: "13",
          },
          {
            label: "NOIDA",
            value: "2",
          },
          {
            label: "GGN",
            value: "123",
          },
        ],
        f5: "2023-04-09T00:00:00.000Z",
      },
      createdAt: "2023-12-07T09:06:55.808Z",
      updatedAt: "2023-12-07T09:06:55.808Z",
      fields: [
        {
          name: "f4",
          variable: "f4",
          _id: "656f0e67a8621cf579011293",
          type: "radio",
        },
        {
          name: "f1",
          variable: "f1",
          _id: "656f0ed1a8621cf579011295",
          type: "checkbox",
        },
        {
          name: "f2",
          variable: "f2",
          _id: "656f0f36a8621cf579011297",
          type: "dropdown",
        },
        {
          name: "f3",
          variable: "f3",
          _id: "656f0f96a8621cf579011299",
          type: "multiSelect",
        },
        {
          name: "f5",
          variable: "f5",
          _id: "6571890c16ea919280f1567f",
          type: "date",
        },
      ],
    },
    {
      _id: "6571a5f7dc50e7b95592be6b",
      name: "Product Name",
      tag: "Productag",
      price: 9.99,
      purchaseDate: "2023-12-06T00:00:00.000Z",
      productId: "65718a3616ea919280f15685",
      data: {
        f4: {
          option: "YES",
          checked: true,
        },
        f1: [
          {
            option: "j",
            checked: true,
          },
          {
            option: "l",
            checked: true,
          },
        ],
        f2: {
          label: "DDR3",
          value: "123",
        },
        f3: [
          {
            label: "DElLHI",
            value: "13",
          },
          {
            label: "NOIDA",
            value: "2",
          },
          {
            label: "GGN",
            value: "123",
          },
        ],
        f5: "2023-04-09T00:00:00.000Z",
      },
      createdAt: "2023-12-07T11:01:11.855Z",
      updatedAt: "2023-12-07T11:01:11.855Z",
      fields: [
        {
          name: "f4",
          variable: "f4",
          _id: "656f0e67a8621cf579011293",
          type: "radio",
        },
        {
          name: "f1",
          variable: "f1",
          _id: "656f0ed1a8621cf579011295",
          type: "checkbox",
        },
        {
          name: "f2",
          variable: "f2",
          _id: "656f0f36a8621cf579011297",
          type: "dropdown",
        },
        {
          name: "f3",
          variable: "f3",
          _id: "656f0f96a8621cf579011299",
          type: "multiSelect",
        },
        {
          name: "f5",
          variable: "f5",
          _id: "6571890c16ea919280f1567f",
          type: "date",
        },
      ],
    },
    {
      _id: "6572090f2fb93d7a47ca02e4",
      name: "Product Name",
      tag: "Product_tag",
      price: 9.99,
      purchaseDate: "2023-12-06T00:00:00.000Z",
      productId: "6571be62141ece2d8d27b280",
      data: {
        f5: [
          {
            label: "DElLHI",
            value: "13",
          },
          {
            label: "NOIDA",
            value: "2",
          },
          {
            label: "GGN",
            value: "123",
          },
        ],
        f6: [
          {
            label: "DElLHI",
            value: "13",
          },
          {
            label: "NOIDA",
            value: "2",
          },
          {
            label: "GGN",
            value: "123",
          },
        ],
      },
      createdAt: "2023-12-07T18:03:59.061Z",
      updatedAt: "2023-12-07T18:03:59.061Z",
      fields: [
        {
          name: "f5",
          variable: "f5",
          _id: "6571ba6c141ece2d8d27b278",
          type: "multiSelect",
        },
        {
          name: "f6",
          variable: "f6",
          _id: "6571ba74141ece2d8d27b27a",
          type: "multiSelect",
        },
      ],
    },
  ],
  total: 3,
  limit: 10,
  totalPages: 1,
  currentPage: 1,
};

const Assets = () => {
  const navigate = useNavigate();

  const handleViewData = (data) => {
    navigate(`/viewProductDetails/${data._id}`);
  };

  const handleEditData = (data) => {
    navigate(`/editProductDetails/${data._id}`);
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: dummyData.assets });

  return (
    <div>
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
                          onClick={() => handleViewData(row.original)}
                          style={{ marginRight: "8px" }}
                        >
                          View
                        </button>
                        <button onClick={() => handleEditData(row.original)}>
                          Edit
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

export default Assets;
