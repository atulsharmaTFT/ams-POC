import { ApiUrls } from "../constants/api.path";
import { getQueryParams } from "./apiHelpers";
import HttpMethods from "./httpMethods";

export default {
  login: (data) => ({
    url: ApiUrls.ADMIN_AUTH.LOGIN,
    method: HttpMethods.POST,
    data,
  }),

  register: (data) => ({
    url: ApiUrls.ADMIN_AUTH.REGISTER,
    method: HttpMethods.POST,
    data,
  }),

  getUsers: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.USERS}/${getQueryParams(params)}`,
      method: HttpMethods.GET,
    };
  },
  createFields: (data) =>{
    return {
      url: `${ApiUrls.ADMIN_APIS.CREATE_FIELDS}`,
      method: HttpMethods.POST,
      data
    }
  },
  getProductById: (params) =>{
    return {
      url: `${ApiUrls.ADMIN_APIS.CREATE_FIELDS}/${getQueryParams(params)}`,
      method: HttpMethods.GET,
    }
  }
  // tambolaOrganizationReport: ({ token, key, id, page, limit }) => {
  //   return {
  //     url: `${ApiUrls.ADMIN_APIS.TAMBOLA_ORGANIZATION_REPORT}/${id}?search=${key}&page=${page}&limit=${limit}`,
  //     method: HttpMethods.GET,
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  // },
  // uploadProfilePic: (data) => {
  //   return {
  //     url: `${ApiUrls.ADMIN_APIS.PROFILE_UPLOAD}`,
  //     method: HttpMethods.POST,
  //     data,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   };
  // },
  // totalCount: () => {
  //   return {
  //     url: ApiUrls.USER_APIS.GET_ANALYTICS_COUNT,
  //     method: HttpMethods.GET,
  //   };
  // },
  // deleteTemplate: (id) => {
  //   return {
  //     url: `${ApiUrls.ADMIN_APIS.DELETE_TEMPLATE}/${id}`,
  //     method: HttpMethods.DELETE,
  //   };
  // },
  // updateSubscription: (data, token) => {
  //   return {
  //     url: `${ApiUrls.ADMIN_APIS.UPDATE_SUBSCRIPTION}`,
  //     method: HttpMethods.PATCH,
  //     data: data,
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  // },
};