import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import Loader from "../../../components/Loader/index";
import ProductBuilder from "../../Product/ProductBuilder";
// const dummyData = {
//   _id: "6569d978911450989e129982",
//   name: "p1",
//   variable: "p1",
//   fields: [
//     {
//       _id: "6566f398ab8309dd15ed8a832",
//       name: "Select City/State",
//       variable: "city",
//       type: "multiSelect",
//       description: "enter age",
//       placeholder: "Select one",
//       checkboxOptions: [],
//       radioOptions: [],
//       dropdownOptions: [],
//       toggleDefault: false,
//       multiSelectOptions: [
//         {value: 1, label:"Noida"},
//       {value: 2, label:"Mumbai"},
//       {value: 3, label:"Pune de"},
//       {value: 4, label:"Agra"},
//       {value: 5, label:"Hyderabad"},
//       {value: 6, label:"Jammu"},],
//       createdAt: "2023-11-29T08:17:28.499Z",
//       updatedAt: "2023-11-29T08:17:28.499Z",
//     },
//     {
//       _id: "6566f398ab830dd15ed8a832",
//       name: "DropDown",
//       variable: "drop",
//       type: "dropdown",
//       description: "enter age",
//       placeholder: "Select one",
//       checkboxOptions: [],
//       radioOptions: [],
//       dropdownOptions: [
//         {value: 1, label:"20"},
//         {value: 2, label:"10"},
//         {value: 3, label:"24"},
//         {value: 4, label:"25"},
//         {value: 5, label:"21"}
//       ],
//       toggleDefault: false,
//       multiSelectOptions: [],
//       createdAt: "2023-11-29T08:17:28.499Z",
//       updatedAt: "2023-11-29T08:17:28.499Z",
//     },
//     {
//       _id: "6566f398ab830dd15ed8a8d1",
//       name: "Name",
//       variable: "name",
//       type: "text",
//       description: "enter name",
//       placeholder: "Enter Name",
//       checkboxOptions: [],
//       radioOptions: [],
//       dropdownOptions: [],
//       toggleDefault: false,
//       multiSelectOptions: [],
//       createdAt: "2023-11-29T08:17:28.499Z",
//       updatedAt: "2023-11-29T08:17:28.499Z",
//     },
//     {
//       _id: "6566f398ab830dd15ed8a8d2",
//       name: "Age",
//       variable: "age",
//       type: "number",
//       description: "enter age",
//       placeholder: "Enter age",
//       checkboxOptions: [],
//       radioOptions: [],
//       dropdownOptions: [],
//       toggleDefault: false,
//       multiSelectOptions: [],
//       createdAt: "2023-11-29T08:17:28.499Z",
//       updatedAt: "2023-11-29T08:17:28.499Z",
//     },
//     {
//       _id: "6566f398ab830dd15ed8a8d3",
//       name: "Name",
//       variable: "name",
//       type: "date",
//       description: "enter name",
//       placeholder: "Enter Name",
//       checkboxOptions: [],
//       radioOptions: [],
//       dropdownOptions: [],
//       toggleDefault: false,
//       multiSelectOptions: [],
//       createdAt: "2023-11-29T08:17:28.499Z",
//       updatedAt: "2023-11-29T08:17:28.499Z",
//     },
//     {
//       _id: "6566f398ab830dd15ed8a8d4",
//       name: "Field Name",
//       variable: "field_variable",
//       type: "radio",
//       description: "",
//       placeholder: "",
//       checkboxOptions: [],
//       radioOptions: [
//         {option :"Male", checked: false},
//         {option :"Female", checked: false},
//         {option :"TransGender", checked: false},
//     ],
//       dropdownOptions: [],
//       toggleDefault: false,
//       multiSelectOptions: [],
//       createdAt: "2023-11-29T08:17:28.499Z",
//       updatedAt: "2023-11-29T08:17:28.499Z",
//     },
//     {
//       _id: "6566f398ab830dd15ed8a8d4",
//       name: "CheckBox Fields ",
//       variable: "field_variable",
//       type: "checkbox",
//       description: "",
//       placeholder: "",
//       checkboxOptions: [
//         {option :"Male", checked: false},
//         {option :"Female", checked: false},
//         {option :"TransGender", checked: false},
//       ],
//       radioOptions: [],
//       dropdownOptions: [],
//       toggleDefault: false,
//       multiSelectOptions: [],
//       createdAt: "2023-11-29T08:17:28.499Z",
//       updatedAt: "2023-11-29T08:17:28.499Z",
//     },
//     {
//       _id: "6567363ea12feb465e76503d5",
//       name: "Field Name",
//       variable: "field_variable",
//       type: "slider",
//       description: "",
//       placeholder: "",
//       checkboxOptions: [],
//       radioOptions: [],
//       dropdownOptions: [],
//       toggleDefault: false,
//       multiSelectOptions: [],
//       sliderOptions: {
//         min: 0,
//         max: 100,
//         step: 1,
//       },
//       createdAt: "2023-11-29T13:01:50.107Z",
//       updatedAt: "2023-11-29T13:01:50.107Z",
//     },
//   ],
// };
const ViewAsset = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const {
    state: {
      loading: getAssetByIdLoading,
      isSuccess: isGetAssetByIdSuccess,
      data: getAssetByIdResponse,
      isError: isGetAssetByIdError,
      error: getAssetByIdError,
    },
    callService: getAssetByIdServices,
    resetServiceState: resetGetAssetByIdState,
  } = useAdminApiService(adminServices.getAssetById);

  useEffect(() => {
    if (isGetAssetByIdError && getAssetByIdError) {
      console.log(getAssetByIdError, "Error");
      //   resetGetProductByIdState();
    }
    if (isGetAssetByIdSuccess && getAssetByIdResponse) {
      setTimeout(() => setLoading(false), 1000);
      setData(getAssetByIdResponse);
      // resetGetProductByIdState();
    }
  }, [
    getAssetByIdLoading,
    isGetAssetByIdSuccess,
    getAssetByIdResponse,
    isGetAssetByIdError,
    getAssetByIdError,
  ]);
  useEffect(() => {
    getProductById();
  }, []);
  const getProductById = async () => {
    setLoading(true);
    await getAssetByIdServices(params?.id);
  };
  const params = useParams();
  return (
    // <p>view edit asset working!!</p>
    <div>
      {isGetAssetByIdSuccess && !loading ? (
        <div className="container">
          {/* <div className="staticContainer"> */}
          <div>Asset Name : {data.name}</div>
          <div>Asset Tag : {data.tag}</div>
          <div>Asset price : {data.price}</div>
          <div>
            Asset Purchase Date :
            {new Date(data.purchaseDate).toISOString().split("T")[0]}
          </div>
          <div>
            Asset Creation Date :
            {new Date(data.createdAt).toISOString().split("T")[0]}
          </div>
          {/* </div> */}
          {Object.keys(data.data).map((item) => {
            return data.fields.map((x) => {
              if (x.variable === item) {
                return (
                  <div key={x._id}>
                    {x.name} : {JSON.stringify(data.data[item])}
                  </div>
                );
              }
            });
          })}
        </div>
      ) : (
        <Loader showOnFullScreen={true} loading={loading} />
      )}
    </div>
  );
};

export default ViewAsset;
