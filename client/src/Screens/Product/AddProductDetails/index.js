import React,{useEffect, useState} from "react";
import ProductBuilder from "../ProductBuilder";
import { useParams } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import Loader from "../../../components/Loader/index"
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
const AddProductDetails = () => {
  const[loading, setLoading] = useState(true);
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

  useEffect(() => {
    if (isGetProductByIdError && getProductByIdError) {
      console.log(getProductByIdError, "Error");
      resetGetProductByIdState();
    }
    if (isGetProductByIdSuccess && getProductByIdResponse) {
      console.log(getProductByIdResponse, "Response");
      setTimeout(()=>setLoading(false), 1000)
      // resetGetProductByIdState();
    }
  });
  useEffect(()=>{
    getProductById();
  },[])
  const getProductById = async() =>{
    setLoading(true)
    await getProductByIdServices(params?.id)
  }
const params = useParams();
  return (
    <div>
      {isGetProductByIdSuccess && !loading ? <ProductBuilder fields={getProductByIdResponse} /> :<Loader showOnFullScreen={true} loading={loading}/>}
    </div>
  );
};

export default AddProductDetails