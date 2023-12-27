import React, { useEffect, useState } from "react";
import classes from "./NewFieldGroup.module.scss";
import { toCamelCase } from "../../../helper/commonHelpers";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewFieldGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [data, setData] = useState([]);
  const [domain, setDomain] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState([]);

  const {
    state: {
      loading: getAllDomainsLoading,
      isSuccess: isGetAllDomainsSuccess,
      data: getAllDomainsResponse,
      isError: isGetAllDomainsError,
      error: getAllDomainsError,
    },
    callService: getAllDomainsService,
    resetServiceState: resetGetAllDomainsState,
  } = useAdminApiService(adminServices.getAllDomains);

  const {
    state: {
      loading: getFieldsLoading,
      isSuccess: isGetFieldsSuccess,
      data: getFieldsResponse,
      isError: isGetFieldsError,
      error: getFieldsError,
    },
    callService: getFieldsService,
    resetServiceState: resetGetFieldsState,
  } = useAdminApiService(adminServices.getField);

  const {
    state: {
      loading: addFieldsGroupLoading,
      isSuccess: isAddFieldsGroupSuccess,
      data: addFieldsGroupResponse,
      isError: isAddFieldsGroupError,
      error: addFieldsGroupError,
    },
    callService: addFieldsGroupService,
    resetServiceState: resetaddFieldsGroupState,
  } = useAdminApiService(adminServices.createFieldsGroup);

  useEffect(() => {
    if (isGetAllDomainsError && getAllDomainsError) {
      console.log(getAllDomainsError, "Error");
    }
    if (isGetAllDomainsSuccess && getAllDomainsResponse) {
      setDomain(getAllDomainsResponse?.data);
    }
    if (isGetFieldsError && getFieldsError) {
      console.log(getFieldsError, "Error");
    }
    if (isGetFieldsSuccess && getFieldsResponse) {
      setData(getFieldsResponse?.data);
    }
  }, [
    isGetAllDomainsSuccess,
    getAllDomainsResponse,
    getAllDomainsError,
    isGetAllDomainsError,
    isGetFieldsSuccess,
    getFieldsResponse,
    isGetFieldsError,
    getFieldsError,
    isAddFieldsGroupSuccess,
    addFieldsGroupResponse,
    isAddFieldsGroupError,
    addFieldsGroupError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getAllDomainsService();
        await getFieldsService();
      }
    };

    checkAdmin();
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
        domainCategoryId: selectedDomain?._id,
      };

      console.log(selectedDomain, obj);

      const apiData = await addFieldsGroupService(obj);
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
      {domain.length > 0 && (
        <div>
          <label>Domain Category</label>
          <select
            value={selectedDomain?.name}
            onChange={
              (e) => setSelectedDomain(JSON.parse(e.target.value))
              // console.log(JSON.parse(e.target.value))
            }
            key={selectedDomain?.domainCategoryId}
          >
            <option value="">Select Category</option>
            {domain.map((item) => (
              <option key={item._id} value={JSON.stringify(item)}>
                {item.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      )}
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
