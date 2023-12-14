import React, { useEffect, useState } from "react";
import classes from "./NewProduct.module.scss";
import { toCamelCase } from "../../../helper/commonHelpers";
import { useNavigate, useParams } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";

const NewProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    fetchFieldGroupData();
    if (params.id) {
      getProductById();
    }
  }, []);

  const {
    state: {
      loading: getProductByIdLoading,
      isSuccess: isGetProductByIdSuccess,
      data: getProductByIdResponse,
      isError: isGetProductByIdError,
      error: getProductByIdError,
    },
    callService: getProductByIdServices,
    resetServiceState: resetGetProductByIdState,
  } = useAdminApiService(adminServices.getProductById);

  const {
    state: {
      loading: getFieldGroupsLoading,
      isSuccess: isGetFieldGroupsSuccess,
      data: getFieldGroupsResponse,
      isError: isGetFieldGroupsError,
      error: getFieldGroupsError,
    },
    callService: getFieldGroupsServices,
    resetServiceState: resetGetFieldGroupsState,
  } = useAdminApiService(adminServices.getFieldGroups);

  useEffect(() => {
    if (isGetProductByIdError && getProductByIdError) {
      resetGetProductByIdState();
    }
    if (isGetProductByIdSuccess && getProductByIdResponse) {
      setTimeout(() => setLoading(false), 1000);
      setUserName(getProductByIdResponse.name);
      getProductByIdResponse.fieldGroups.forEach((group) => {
        handleAddItem(group);
      });
    }
    if (getFieldGroupsResponse && isGetFieldGroupsSuccess) {
      setTimeout(() => setLoading(false), 1000);
      setData(getFieldGroupsResponse);
    }
    if (isGetFieldGroupsError && getFieldGroupsError) {
      resetGetFieldGroupsState();
    }
  }, [
    isGetProductByIdSuccess,
    getProductByIdResponse,
    isGetProductByIdError,
    getProductByIdError,
    isGetFieldGroupsSuccess,
    getFieldGroupsResponse,
    isGetFieldGroupsError,
    getFieldGroupsError,
  ]);

  const getProductById = async () => {
    setLoading(true);
    await getProductByIdServices(params?.id, `?withFieldGroups=true`);
  };

  const fetchFieldGroupData = async () => {
    setLoading(true);
    await getFieldGroupsServices();
  };

  const createProduct = async () => {
    try {
      let userIds = [];
      selectedItems.forEach((item) => {
        userIds.push(item._id);
      });
      const obj = {
        name: userName,
        fieldGroups: userIds,
      };

      if (params.id) {
        const response = await fetch(
          `http://localhost:8001/products/${params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        );
        // const apiData = await response.json();
        // console.log(apiData);
        if (response.status === 204 && response.statusText === "No Content") {
          navigate("/product");
        }
      } else {
        obj["variable"] = toCamelCase(userName);
        const response = await fetch("http://localhost:8001/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        // const apiData = await response.json();
        navigate("/product");
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
    setSelectedItems((prev) => {
      return [...prev, item];
    });
  };

  const isItemSelected = (item) =>
    selectedItems.some((selectedItem) =>
      selectedItem.fields.some((field) => {
        if (params.id) {
          return item.fields.some(
            (selectedField) => selectedField._id === field
          );
        } else {
          return item.fields.some(
            (selectedField) => selectedField._id === field._id
          );
        }
      })
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
      <button
        className={
          selectedItems && selectedItems.length < 1 ? classes.disabled : ""
        }
        disabled={selectedItems && selectedItems.length < 1}
        onClick={createProduct}
      >
        Save
      </button>
    </div>
  ) : (
    <p>loading</p>
  );
};

export default NewProduct;
