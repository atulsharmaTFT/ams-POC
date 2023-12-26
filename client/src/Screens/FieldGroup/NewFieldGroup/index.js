import React, { useEffect, useState } from "react";
import classes from "./NewFieldGroup.module.scss";
import { toCamelCase } from "../../../helper/commonHelpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewFieldGroup = () => {
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
    // console.log(selectedItems, userName);
    try {
      let userIds = [];
      selectedItems.forEach((item) => {
        userIds.push(item._id);
      });
      const obj = {
        name: userName,
        variable: toCamelCase(userName),
        fields: userIds,
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
      // toast.success("Created successfully");
      if (apiData) {
        setSelectedItems([]);
        setUserName("");
        setSearchTerm("");
        setSearchResults([]);
      }
      
    } catch (err) {
      console.log(err);
      // toast.error("Something went wrong")
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

  return data ? (
    <div className={classes.container}>
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

      {/* Second Container */}
      <div className={classes.selectedItemsContainer}>
        <h2>Selected Items Container</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={createFieldGroup}>Save</button>
    </div>
  ) : (
    <p>loading</p>
  );
};

export default NewFieldGroup;
