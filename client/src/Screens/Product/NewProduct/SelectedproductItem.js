import React from "react";
import classes from "./NewProduct.module.scss";

const SelectedproductItem = ({ selectedItems, handleRemoveItem,handleDragStart, handleDragEnter, onDragEnd,}) => {
  return (
    <div>
      <div>
        <h2>Selected Items Container</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr
                key={item._id}
                className={classes.inputBody}
                onDragStart={(e) => handleDragStart(e, item._id)}
                onDragEnter={(e) => handleDragEnter(e, item._id)}
                onDragEnd={onDragEnd}
                draggable
              >
                <td className={classes.nameCell}>{item.name}</td>
                <td className={classes.buttonCell}>
                  <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectedproductItem;
