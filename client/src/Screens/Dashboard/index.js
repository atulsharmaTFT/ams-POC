// Import necessary dependencies
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';

// Dummy data for the table
const data = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 25, city: 'San Francisco' },
  // Add more dummy data as needed
];

// Columns configuration for the table
const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Age', accessor: 'age' },
  { Header: 'City', accessor: 'city' },
  // Add more columns as needed
];

// Component that renders the table and the "Add New Field" button
const Dashboard = () => {
  // Create an instance of useTable hook with data and columns
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const navigate = useNavigate();

  return (
    <div>
        {/* Render the "Add New Field" button */}
        <button
        style={{
          marginTop: '16px',
          padding: '8px',
          fontSize: '16px',
        }}
        onClick={() => navigate('/newField')} // Add your logic here
      >
        Add New Field
      </button>
      {/* Render the table */}
      <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: '2px solid black',
                    background: '#f2f2f2',
                    padding: '8px',
                    textAlign: 'left',
                  }}
                >
                  {column.render('Header')}
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
                      border: '1px solid black',
                      padding: '8px',
                    }}
                  >
                    {cell.render('Cell')}
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

export default Dashboard;
