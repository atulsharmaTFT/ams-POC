import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import Loader from "../../../components/Loader/index";
import styles from "../viewAsset/viewAsset.module.scss";
import ProductBuilder from "../../Product/ProductBuilder";
import constants from "../../../helper/constantKeyword/constants";
import { toCamelCase } from "../../../helper/commonHelpers";
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
  console.log(data.data,"data.data")
  return (
    // <p>view edit asset working!!</p>
    <div className={styles.container}>
      {isGetAssetByIdSuccess && !loading ? (
        // <div className={styles.container}>
        <>
          <div className={styles.card}>
            <div className={styles.imageContainer}>
              <img src="https://media.wired.com/photos/64daad6b4a854832b16fd3bc/master/pass/How-to-Choose-a-Laptop-August-2023-Gear.jpg" />
            </div>

            {/* <div className="staticContainer"> */}
            <div className={styles.infoContainer}>
              <div className={styles.infoHeader}>
                <div className={styles.name}>
                  <p>{data.name}</p>
                  <button>Move to Inventroy</button>
                  </div>
                <div className={styles.price}>₹ {data.price}</div>
                <div>Asset Tag : {data.tag}</div>
                <div>
                  Asset Purchase Date : &nbsp;
                  {new Date(data.purchaseDate).toISOString().split("T")[0]}
                </div>
                <div>
                  Asset Creation Date : &nbsp;
                  {new Date(data.createdAt).toISOString().split("T")[0]}
                </div>
              </div>
              <div className={styles.additionalData}>
                {Object.keys(data?.data).map((item) => {
                  return data?.fields.map((x) => {
                    if (x?.variable === item) {
                      console.log(x.type, x);
                      if (x?.type === constants.text.toLowerCase() || x?.type === constants.number.toLowerCase())
                        return (
                          <div key={x._id} className={styles.additionalItem}>
                            <span className={styles.key}>{x.name}:</span>{" "}
                            <span className={styles.value}>
                              {data.data[item]}
                            </span>
                          </div>
                        );
                      if (x.type === toCamelCase(constants.multiselect)) {
                        return (
                          <div key={x._id} className={styles.additionalItem}>
                            <span className={styles.key}>{x.name}:</span>{" "}
                            {data.data[item].map((item) => (
                              <span className={styles.chip}>{item.label}</span>
                            ))}
                          </div>
                        );
                      }
                      if (x.type === constants.dropdown.toLowerCase()) {
                        return (
                          <div key={x._id} className={styles.additionalItem}>
                            <span className={styles.key}>{x.name}:</span>{" "}
                            <span className={styles.value}>
                              {data.data[item].label}
                            </span>
                          </div>
                        );
                      }
                      if (x.type === constants.checkbox.toLowerCase()) {
                        console.log(x,"checkbox");
                        return (
                          <div key={x._id} className={styles.additionalItem}>
                            <span className={styles.key}>{x.name}:</span>{" "}
                            {data.data[item].map((item) => {
                              if (item.checked)
                                return (
                                  <span className={styles.chip}>
                                    {item.option}
                                  </span>
                                );
                            })}
                            {/* <span className={styles.value}>
                              {JSON.stringify(data.data[item])}
                            </span> */}
                          </div>
                        );
                        
                      }
                      if (x.type === constants.radio.toLowerCase()) {
                        console.log(x,"radio");
                        return (
                          <div key={x._id} className={styles.additionalItem}>
                            <span className={styles.key}>{x.name}:</span>{" "}
                            {/* {data.data[item].map(item=><span className={styles.chip}>{item.option}</span>)} */}
                            <span className={styles.value}>
                              {data.data[item].option}
                            </span>
                          </div>
                        );
                      }
                      if (x.type === constants.date.toLowerCase()) {
                        console.log(x,"date");
                        return (
                          <div key={x._id} className={styles.additionalItem}>
                            <span className={styles.key}>{x.name}:</span>{" "}
                            {/* {data.data[item].map(item=><span className={styles.chip}>{item.option}</span>)} */}
                            <span className={styles.value}>
                            {new Date(data.data[item]).toISOString().split("T")[0]}
                            
                            </span>
                          </div>
                        );
                      }
                    }
                  });
                })}
              </div>
            </div>
          </div>  
          </>
        // </div>
      ) : (
        <Loader showOnFullScreen={true} loading={loading} />
      )}
    </div>
  );
};

export default ViewAsset;
