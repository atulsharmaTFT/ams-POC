import React from "react";
import ProductBuilder from "../ProductBuilder";
import { useParams } from "react-router-dom";

const dummyData = {
  _id: "6569d978911450989e129982",
  name: "p1",
  variable: "p1",
  fields: [
    {
      _id: "6566f398ab830dd15ed8a8d2",
      name: "Field Name",
      variable: "field_variable",
      type: "radio",
      description: "",
      placeholder: "",
      checkboxOptions: [],
      radioOptions: ["f", "j", "j"],
      dropdownOptions: [],
      toggleDefault: false,
      multiSelectOptions: [],
      createdAt: "2023-11-29T08:17:28.499Z",
      updatedAt: "2023-11-29T08:17:28.499Z",
    },
    {
      _id: "6566f69ed364f9ee5bef922d",
      name: "test check",
      variable: "testCheck",
      type: "multiSelect",
      description: "testing",
      placeholder: "",
      checkboxOptions: [],
      radioOptions: [],
      dropdownOptions: [],
      toggleDefault: false,
      multiSelectOptions: ["test1", "test2", "test3"],
      createdAt: "2023-11-29T08:30:22.627Z",
      updatedAt: "2023-11-29T08:30:22.627Z",
    },
    {
      _id: "6567363ea12feb465e76503d",
      name: "Field Name",
      variable: "field_variable",
      type: "slider",
      description: "",
      placeholder: "",
      checkboxOptions: [],
      radioOptions: [],
      dropdownOptions: [],
      toggleDefault: false,
      multiSelectOptions: [],
      sliderOptions: {
        min: 0,
        max: 100,
        step: 1,
      },
      createdAt: "2023-11-29T13:01:50.107Z",
      updatedAt: "2023-11-29T13:01:50.107Z",
    },
  ],
};
const AddProductDetails = () => {

const params = useParams();

console.log(params.id)


  return (
    <div>
      <ProductBuilder fields={dummyData} />
    </div>
  );
};

export default AddProductDetails