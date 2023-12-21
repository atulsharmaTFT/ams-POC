import React, { useEffect, useRef, useState } from "react";
import classes from "./NewFieldGroup.module.scss";
import { toCamelCase } from "../../../helper/commonHelpers";
import SelectedItemsList from "./SelectedItemsList";
import { FormProvider } from "../../../components/FormHook";


const NewFieldGroup = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/fields");
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createFieldGroup = async () => {
    try {
      let userIds = [];
      let indexedUserIdsArray = [];
      selectedItems.forEach((item) => {
        userIds.push(item._id);
      });
      selectedItems.forEach((item, index) => {
        indexedUserIdsArray.push({ index: index, Id: item._id });
      });
      const obj = {
        name: userName,
        variable: toCamelCase(userName),
        fields: userIds,
        indexedFieldsIds: indexedUserIdsArray,
      };

      const response = await fetch("http://localhost:8001/field-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need
        },
        body: JSON.stringify(obj),
      });

      const apiData = await response.json();
      if (apiData) {
        setSelectedItems([]);
        setUserName("");
        setSearchTerm("");
        setSearchResults([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const isItemSelected = (item) =>
    selectedItems.some((selectedItem) => selectedItem._id === item._id);

  const handleRemoveItem = (itemToRemove) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item._id !== itemToRemove._id
    );
    setSelectedItems(updatedSelectedItems);
  };
  const handleDragStart = (e, id) => {
    dragItem.current = id;
   };
   const handleDragEnter = (e, id) => {
    dragOverItem.current = id;
   };
   const onDragEnd = () => {
    const copySelectItems = [...selectedItems];
    const draggedItem = copySelectItems.find(item => item._id === dragItem.current);
    const draggedIndex = copySelectItems.findIndex(item => item._id === dragItem.current);
    if (draggedItem && dragOverItem.current) {
      const dropIndex = copySelectItems.findIndex(item => item._id === dragOverItem.current);
      [copySelectItems[draggedIndex], copySelectItems[dropIndex]] = [copySelectItems[dropIndex], copySelectItems[draggedIndex]];
    }
  
    dragItem.current = null;
    dragOverItem.current = null;
    setSelectedItems(copySelectItems);
  };
  return data ? (
    <div className={classes.mainContainer}>
    <div className={classes.container}>
      <div className={classes.fieldGroupContainer}>
      <div className={classes.userInputContainer}>
        <h2>FieldGroupName</h2>
        <input
          type="text"
          placeholder="Enter field group name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {/* First Container */}
      <div className={classes.searchContainer}>
        <h2>Search Container</h2>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <h3>Search Results</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result._id}>
                <td>{result.name}</td>
                <td>{result.type}</td>
                <button
                  className={isItemSelected(result) ? classes.disabled : ""}
                  onClick={() => handleAddItem(result)}
                  disabled={isItemSelected(result)}
                >
                  Add
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* <ul>
          {searchResults.map((result) => (
            <li key={result._id}>
              {result.name} - {result.type}
              <button className={isItemSelected(result) ? classes.disabled : ''} onClick={() => handleAddItem(result)} disabled={isItemSelected(result)}>Add</button>
            </li>
          ))}
        </ul> */}
      </div>
      </div>

      {/* Second Container */}
       <div className={classes.selectedItemsContainer}>
        <SelectedItemsList
        selectedItems={selectedItems}
        handleDragStart={handleDragStart}
        handleDragEnter={handleDragEnter}
        onDragEnd={onDragEnd}
        handleRemoveItem={handleRemoveItem}
         />
         </div>
         </div>
    <div className={classes.saveButton}>
    <button onClick={createFieldGroup}>Save</button>
    </div>
    </div>
  ) : (
    <p>loading</p>
  );
};

export default NewFieldGroup;
