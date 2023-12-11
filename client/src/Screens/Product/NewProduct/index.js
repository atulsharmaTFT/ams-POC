import React, { useEffect, useState } from "react";
import classes from "./NewProduct.module.scss";
import { toCamelCase } from "../../../helper/commonHelpers";

const NewProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/field-groups");
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createProduct = async () => {
    // console.log(selectedItems, userName);
    try {
      let userIds = [];
      selectedItems.forEach((item) => {
        userIds.push(item._id);
      });
      const obj = {
        name: userName,
        variable: toCamelCase(userName),
        fieldGroups: userIds,
      };

      console.log(obj);
      const response = await fetch("http://localhost:8001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      const apiData = await response.json();
      console.log(apiData);
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
    console.log(item);
    setSelectedItems([...selectedItems, item]);
  };

  // const isItemSelected = (item) =>
  //   selectedItems.some((selectedItem) => selectedItem._id === item._id);

  const isItemSelected = (item) =>
    selectedItems.some((selectedItem) =>
      selectedItem.fields.some((field) =>
        item.fields.some((selectedField) => selectedField._id === field._id)
      )
    );

  const handleRemoveItem = (itemToRemove) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item._id !== itemToRemove._id
    );
    setSelectedItems(updatedSelectedItems);
  };

  return data ? (
    <div className={classes.container}>
      <div className={classes.userInputContainer}>
        <h2>ProductName</h2>
        <input
          type="text"
          placeholder="Enter product name"
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result._id}>
                <td>{result.name}</td>
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
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={createProduct}>Save</button>
    </div>
  ) : (
    <p>loading</p>
  );
};

export default NewProduct;
