import React, { useEffect, useState } from "react";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";

const NewOrganization = () => {
  const [newOption, setNewOption] = useState({
    name: "",
    id: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    domainCategoryId: "",
  });

  const [data, setData] = useState([]);

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
      loading: addOrganizationLoading,
      isSuccess: isAddOrganizationSuccess,
      data: addOrganizationResponse,
      isError: isAddOrganizationError,
      error: addOrganizationError,
    },
    callService: addOrganizationService,
    resetServiceState: resetAddOrganizationState,
  } = useAdminApiService(adminServices.addOrganization);

  useEffect(() => {
    if (isGetAllDomainsError && getAllDomainsError) {
      console.log(getAllDomainsError, "Error");
    }
    if (isGetAllDomainsSuccess && getAllDomainsResponse) {
      setData(getAllDomainsResponse?.data);
    }
    if (isAddOrganizationError && addOrganizationError) {
      console.log(getAllDomainsError, "Error");
    }
    if (addOrganizationResponse && isAddOrganizationSuccess) {
      console.log(addOrganizationResponse);
    }
  }, [
    isGetAllDomainsSuccess,
    getAllDomainsResponse,
    getAllDomainsError,
    isGetAllDomainsError,
    isAddOrganizationSuccess,
    addOrganizationResponse,
    isAddOrganizationError,
    addOrganizationError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getAllDomainsService();
      }
    };

    checkAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    newOption.id = newOption.id.toUpperCase();
    await addOrganizationService(newOption);
  };

  const customTextStyle = {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle = {
    padding: "5px",
    marginTop: "5px",
    width: "100%",
    boxSizing: "border-box",
    height: "35px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    width: "60%",
  };

  const labelStyle = {
    fontSize: "18px",
    fontWeight: "600",
  };

  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={customTextStyle}>
          <label style={labelStyle}>Name:</label>
          <input
            style={inputStyle}
            type="text"
            value={newOption?.name}
            onChange={(e) =>
              setNewOption({ ...newOption, name: e.target.value })
            }
          />
        </div>

        <div style={customTextStyle}>
          <label style={labelStyle}>ID:</label>
          <input
            style={inputStyle}
            type="text"
            value={newOption?.id}
            onChange={(e) => setNewOption({ ...newOption, id: e.target.value })}
          />
        </div>

        <div style={customTextStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            style={inputStyle}
            type="email"
            value={newOption?.email}
            onChange={(e) =>
              setNewOption({ ...newOption, email: e.target.value })
            }
          />
        </div>

        <div style={customTextStyle}>
          <label style={labelStyle}>Phone:</label>
          <input
            style={inputStyle}
            type="tel"
            value={newOption?.phone}
            onChange={(e) =>
              setNewOption({ ...newOption, phone: e.target.value })
            }
          />
        </div>

        <div style={customTextStyle}>
          <label style={labelStyle}>Website:</label>
          <input
            style={inputStyle}
            type="text"
            value={newOption?.website}
            onChange={(e) =>
              setNewOption({ ...newOption, website: e.target.value })
            }
          />
        </div>

        <div style={customTextStyle}>
          <label style={labelStyle}>Domain Category Id:</label>
          <select
            style={inputStyle}
            name="domainCategoryId"
            value={newOption?.domainCategoryId}
            onChange={(e) =>
              setNewOption({
                ...newOption,
                domainCategoryId: e.target.value,
              })
            }
          >
            {/* Add options for the dropdown */}
            <option value="">Select Category</option>
            {data.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div style={customTextStyle}>
          <label style={labelStyle}>Address:</label>
          <input
            style={inputStyle}
            type="text"
            value={newOption?.address}
            onChange={(e) =>
              setNewOption({ ...newOption, address: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewOrganization;
