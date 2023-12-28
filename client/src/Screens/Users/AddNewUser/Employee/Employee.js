import React from 'react'
import { useTable } from 'react-table';

const Employee = ({data , buttons}) => {
    const columns = React.useMemo(
        () => [
          { Header: 'Employee ID', accessor: 'employeeId' },
          { Header: 'Name', accessor: 'fullName' },
          { Header: 'Email', accessor: 'email' },
          { Header: 'Manager Name', accessor: 'managerName' },
          { Header: 'Designation', accessor: 'designation' },
          { Header: 'Department', accessor: 'department' },
          { Header: 'Joining Date', accessor: 'joiningDate' },
          {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
              <div  style={{ display: 'flex', gap: '2px' }}>
                {buttons.map((button, index) => (
                  <button key={index} onClick={() => button.onClick(row.original)}>
                    {button.label}
                  </button>
                ))}
              </div>
            ),
          },
        ],
        [buttons]
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data });
    
      return (
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
      );
    };


export default Employee