import React, { useEffect, useState } from "react";
import classes from "./FieldGroup.module.scss";

const FieldGroup = () => {
  //   const initialData = [
  //     {
  //       _id: "6566f8ac0c81c6c12080e61b",
  //       name: "test check",
  //       variable: "testCheck",
  //       type: "multiSelect",
  //       description: "testing",
  //       placeholder: "",
  //       checkboxOptions: [],
  //       radioOptions: [],
  //       dropdownOptions: [],
  //       toggleDefault: false,
  //       multiSelectOptions: ["test1", "test2", "test3"],
  //       createdAt: "2023-11-29T08:39:08.401Z",
  //       updatedAt: "2023-11-29T08:39:08.401Z",
  //     },
  //     {
  //       _id: "6566fadb0c81c6c12080e61f",
  //       name: "Name",
  //       variable: "name",
  //       type: "text",
  //       description: "user have to enter his name",
  //       placeholder: "Enter Name",
  //       checkboxOptions: [],
  //       radioOptions: [],
  //       dropdownOptions: [],
  //       toggleDefault: false,
  //       multiSelectOptions: [],
  //       createdAt: "2023-11-29T08:48:27.916Z",
  //       updatedAt: "2023-11-29T08:48:27.916Z",
  //     },
  //     {
  //       _id: "656713eb39ff825b6df65032",
  //       name: "check box test",
  //       variable: "checkBoxTest",
  //       type: "checkbox",
  //       description: "testing check box",
  //       placeholder: "",
  //       checkboxOptions: ["test1", "test2"],
  //       radioOptions: [],
  //       dropdownOptions: [],
  //       toggleDefault: false,
  //       multiSelectOptions: [],
  //       createdAt: "2023-11-29T10:35:23.648Z",
  //       updatedAt: "2023-11-29T10:35:23.648Z",
  //     },
  //   ];

  const [searchTerm, setSearchTerm] = useState("");
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

  const handleSearch = () => {
    const results = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleAddItem = (item) => {
    console.log(item)
    setSelectedItems([...selectedItems, item]);
    console.log(selectedItems);
  };

  const isItemSelected = (item) =>
    selectedItems.some((selectedItem) => selectedItem._id === item._id);

  return data ? (
    <div className={classes.container}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p>loading</p>
  );
};

export default FieldGroup;
