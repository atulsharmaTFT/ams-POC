export const ApiUrls = {
  ADMIN_AUTH: {
    LOGIN: "/v1/auth/login",
    REGISTER: "/v1/auth/register",
    SOCIAL_LOGIN: "/v1/auth/oAuth",
  },
  ADMIN_APIS: {
    USERS: "/users",
    CREATE_FIELDS: "/fields",
    PRODUCT_BY_ID: "/products",
    ADD_ASSET : "/assets"
  },
};

export const servicesAccessibleWithoutToken = [
  ...Object.values(ApiUrls.ADMIN_AUTH),
  //   ...Object.values(ApiUrls.CONFIG),
];
