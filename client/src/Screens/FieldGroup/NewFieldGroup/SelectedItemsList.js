import React from 'react'
import classes from "./NewFieldGroup.module.scss";
import InputField from '../../../components/FormHook/InputField';


const SelectedItemsList = ({ selectedItems, handleDragStart, handleDragEnter, onDragEnd, handleRemoveItem }) => {
    const renderInputBasedOnType = (item) => {
        switch (item.type) {
          case 'text':
            return <input type="text" placeholder={item.validations.validationType} readOnly/>;
            case 'number':
            return <input type="number" placeholder={item.validations.validationType}/>;
          case 'date':
            return <input type="date" />;
          case 'checkbox':
            return renderCheckbox(item.checkboxOptions);
          case 'dropdown':
            return renderDropdown(item.dropdownOptions);
          case 'multiSelect':
            return renderMultiselect(item.multiSelectOptions);
          case 'radio':
            return renderRadio(item.radioOptions);
          default:
            return <span>{item.type}</span>; 
        }
      };
      
      const renderCheckbox = (checkboxOptions) => (
        <div className={classes.checkboxContainer}>
          {checkboxOptions.map((checkbox) => (
            <div className={classes.checkboxItem}>
              <label key={checkbox.id}>{checkbox.option}</label>
              <input type="checkbox" checked={checkbox.checked} readOnly />
            </div>
          ))}
        </div>
      );
      
      const renderDropdown = (options) => (
        <select>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      
      const renderMultiselect = (multiSelectOptions) => (
        <div>
       <select>
          {multiSelectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
        
      );
      const renderRadio = (radioOptions) => (
        <div>
          {radioOptions.map((option) => (
            <label key={option.id}>
              <input type="radio" name="radioGroup" value={option.value} />
              {option.label}
            </label>
          ))}
        </div>
      );
    return (
      <div>
        <h2>Selected Items Container</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item,index) => (
              <tr
              className={classes.inputBody}
                key={item._id}
                onDragStart={(e) => handleDragStart(e, item._id)}
                onDragEnter={(e) => handleDragEnter(e, item._id)}
                onDragEnd={onDragEnd}
                draggable
              >
                <td>{index+1}</td>
                <td className={classes.nameCell}>{item.name}</td>
                <td className={classes.typeCell}>{renderInputBasedOnType(item)}</td>
                <td className={classes.buttonCell}>
                  <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
 
  

export default SelectedItemsList