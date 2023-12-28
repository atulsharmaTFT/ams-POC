import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminApiService from "../../helper/useAdminApiService";
import adminServices from "../../helper/adminServices";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/CustomTable";
import classes from "./Product.module.scss";

const headers = ["Sno", "Name"];
const columnWidths = [{ width: "100px" }, { width: "800px" }];

const Product = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const {
    state: {
      loading: getProductCategoryLoading,
      isSuccess: isGetProductCategorySuccess,
      data: getProductCategoryResponse,
      isError: isGetProductCategoryError,
      error: getProductCategoryError,
    },
    callService: getProductCategoryService,
    resetServiceState: resetGetProductCategoryState,
  } = useAdminApiService(adminServices.getProductCategory);

  useEffect(() => {
    if (isGetProductCategoryError && getProductCategoryError) {
      console.log(getProductCategoryError, "Error");
    }
    if (isGetProductCategorySuccess && getProductCategoryResponse) {
      setData(getProductCategoryResponse?.data);
    }
  }, [
    isGetProductCategorySuccess,
    getProductCategoryResponse,
    isGetProductCategoryError,
    getProductCategoryError,
  ]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!localStorage.getItem("organizationId")) {
        await getProductCategoryService();
      }
    };

    checkAdmin();
  }, []);

  const handleAddData = (data) => {
    navigate(`/addProductDetails/${data._id}`);
  };
  const onAdd = (row) => {
    navigate(`/addProductDetails/${data?.[row?.index -1]._id}`);
    console.log("View", row);
  };

  const onEdit = (row) => {
    navigate(`/editProductfields/${data?.[row?.index -1]._id}`);
    console.log("Edit", row);
  };
  console.log(data,"data");
  const productData = data.map(({ _id, name }, index) => ({
    index: index + 1,
    name,
  }));
  return (
    <div className={classes.container}>
      <div
        style={{
          flex: 1,
          flexDirection: "row",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="submit"
          overrideClassName={classes.addBtn}
          buttonText={" Add New Product"}
          onClick={() => navigate("/newProduct")}
          loading={false}
        />
      </div>
      {/* Render the table */}
      <CustomTable
        data={productData}
        headers={headers}
        columnWidths={columnWidths}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </div>
  );
};
export default Product;