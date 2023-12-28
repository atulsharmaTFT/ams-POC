import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/CustomTable";
import classes from "./Product.module.scss";

const headers = ["Sno", "Name"];
const columnWidths = [{ width: "100px" }, { width: "800px" }];

const Product = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/products");
        const apiData = await response.json();
        console.log(apiData);
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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