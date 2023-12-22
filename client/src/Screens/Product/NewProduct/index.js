import React, { useEffect, useState,useRef} from "react";
import classes from "./NewProduct.module.scss";
import { toCamelCase } from "../../../helper/commonHelpers";
import { useNavigate, useParams } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import SelectedproductItem from "./SelectedproductItem";

const NewProduct = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
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
      console.log(getFieldGroupsResponse, "old");
      const updatedData = getFieldGroupsResponse.map((item) => {
        const fieldIds = item.fields.map((field) => field._id);
        return { ...item, fields: fieldIds };
      });

      setData(updatedData);
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
      let indexedUserIdsArray = [];
      selectedItems.forEach((item) => {
        userIds.push(item._id);
      });
      selectedItems.forEach((item, index) => {
        indexedUserIdsArray.push({ index: index, fieldGroupId: item._id });
      });
      const obj = {
        name: userName,
        fieldGroups: userIds,
        indexedFieldGroupsIds: indexedUserIdsArray,
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
    console.log(item);
    setSelectedItems((prev) => {
      return [...prev, item];
    });
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

  // const isItemSelected = (item) => {
  //   return selectedItems.some((selectedItem) =>
  //     selectedItem.fields.some((field) => {
  //       // if (params.id) {
  //       return item.fields.some((selectedField) => selectedField === field);
  //       // }
  //       //  else {
  //       //   return item.fields.some(
  //       //     (selectedField) => selectedField._id === field._id
  //       //   );
  //       // }
  //     })
  //   );
  // };
  const isItemSelected = (item) =>
  selectedItems.some((selectedItem) => selectedItem._id === item._id);

  const handleRemoveItem = (itemToRemove) => {
    const updatedSelectedItems = selectedItems.filter(
      (item) => item._id !== itemToRemove._id
    );
    setSelectedItems(updatedSelectedItems);
  };

  return data ? (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <div className={classes.fieldGroupContainer}>
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
        </div>

        {/* Second Container */}
        <div className={classes.selectedItemsContainer}>
          <SelectedproductItem
            selectedItems={selectedItems}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
            onDragEnd={onDragEnd}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
      <div className={classes.saveButton}>
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
    </div>
  ) : (
    <p>loading</p>
  );
};

export default NewProduct;
