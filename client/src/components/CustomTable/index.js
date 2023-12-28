import React from "react";
import classes from "./table.module.scss";
import { FaEye } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
function CustomTable({
  data,
  headers,
  columnWidths,
  onView,
  onEdit,
  onDelete,
  onAdd,
  showActions = true
}) {
  return (
    <div className={classes.customTable}>
      <div className={classes.headerRow}>
        {headers.map((header, index) => (
          <div key={index} style={{ width: columnWidths[index].width }}>
            {header}
          </div>
        ))}
        {showActions && <div className={classes.actionItem}>Actions</div>}
      </div>
      {data.map((row, rowIndex) => (
        <div className={classes.dataRow} key={rowIndex}>
          {Object.keys(row).map((key, cellIndex) => (
            <div
              key={cellIndex}
              style={{ width: columnWidths[cellIndex].width }}
            >
              {row?.[key]}
            </div>
          ))}

          {showActions && <div className={classes.actionItem}>
            {onView && (
              <span>
                <FaEye
                  size={"25px"}
                  onClick={() => onView(row)}
                  style={{ padding: "10px", borderRadius: "10px" }}
                />
              </span>
            )}
            {onAdd && (
              <span>
                <FaPlusSquare
                  size={"25px"}
                  onClick={() => onAdd(row)}
                  style={{ padding: "10px", borderRadius: "10px" }}
                />
              </span>
            )}
            {onEdit && (
              <span>
                <MdEditSquare
                  size={"25px"}
                  onClick={() => onEdit(row)}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    color: "#098",
                  }}
                />
              </span>
            )}
            {onDelete && (
              <span>
                <AiFillDelete
                  size={"25px"}
                  onClick={() => onDelete(row)}
                  style={{
                    padding: "10px",
                    borderRadius: "10px",
                    color: "red",
                  }}
                />
              </span>
            )}
          </div>}
        </div>
      ))}
    </div>
  );
}

export default CustomTable;
