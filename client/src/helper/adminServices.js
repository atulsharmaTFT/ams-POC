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
  createFields: (data) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.CREATE_FIELDS}`,
      method: HttpMethods.POST,
      data,
    };
  },
  createFieldsGroup: (data) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.CREATE_FIELDS_GROUP}`,
      method: HttpMethods.POST,
      data,
    };
  },
  createProductCategory: (data) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.CREATE_PRODUCT}`,
      method: HttpMethods.POST,
      data,
    };
  },
  getField: (params? : {}) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.FIELDS}`,
      method: HttpMethods.GET,
    };
  },
  getFieldGroups: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.FIELD_GROUPS}`,
      method: HttpMethods.GET,
    };
  },
  getProductCategory: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.PRODUCT_CATEGORY}`,
      method: HttpMethods.GET,
    };
  },
  getProductById: (params, query) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.PRODUCT_BY_ID}/${params}${query}`,
      method: HttpMethods.GET,
    };
  },
  getAssetById: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ASSET}/${params}`,
      method: HttpMethods.GET,
    };
  },
  getAllAssets: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ASSET}?${params}`,
      method: HttpMethods.GET,
    };
  },
  getAllDomains: () => {
    return {
      url: `${ApiUrls.ADMIN_APIS.DOMAINS}`,
      method: HttpMethods.GET,
    };
  },
  getAllOrganizations: () => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ORGANIZATIONS}`,
      method: HttpMethods.GET,
    };
  },
  addOrganization: (data) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ORGANIZATION}`,
      method: HttpMethods.POST,
      data,
    };
  },
  addDomain: (data) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_DOMAIN}`,
      method: HttpMethods.POST,
      data,
    };
  },
  addAsset: (data) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ASSET}`,
      method: HttpMethods.POST,
      data,
    };
  },
  updateExistingAsset: (params, data) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ASSET}/${params}`,
      method: HttpMethods.PUT,
      data,
    };
  },
  deleteExistingAsset: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ASSET}/${params}`,
      method: HttpMethods.DELETE,
    };
  },
  moveToInventory: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ASSET}/${params}${ApiUrls.ADMIN_APIS.MOVE_TO_Inventory}`,
      method: HttpMethods.PATCH,
    };
  },
  archiveAsset: (params) => {
    return {
      url: `${ApiUrls.ADMIN_APIS.ADD_ASSET}/${params}${ApiUrls.ADMIN_APIS.ARCHIVE_ASSET}`,
      method: HttpMethods.PATCH,
    };
  },

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
