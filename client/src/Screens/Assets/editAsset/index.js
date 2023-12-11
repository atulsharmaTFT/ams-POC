import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAdminApiService from "../../../helper/useAdminApiService";
import adminServices from "../../../helper/adminServices";
import Loader from "../../../components/Loader/index";
import ProductBuilder from "../../Product/ProductBuilder";
const EditAsset = () => {
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
      console.log(getAssetByIdResponse);
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
    <div>
      {isGetAssetByIdSuccess && !loading ? (
        <ProductBuilder
          fields={getAssetByIdResponse?.fields}
          productId={params?.id}
          name={getAssetByIdResponse?.name}
          price={getAssetByIdResponse?.price}
          purchaseDate={getAssetByIdResponse?.purchaseDate}
          tag={getAssetByIdResponse?.tag}
          buttonName="Update"
          data={getAssetByIdResponse?.data}
        />
      ) : (
        <Loader showOnFullScreen={true} loading={loading} />
      )}
    </div>
  );
};

export default EditAsset;
