export const ApiUrls = {
  ADMIN_AUTH: {
    LOGIN: "/api/v1/admin-login",
    REGISTER: "/v1/auth/register",
    SOCIAL_LOGIN: "/v1/auth/oAuth",
  },
  ADMIN_APIS: {
    USERS: "/users",
    CREATE_FIELDS: "/fields",
    FIELD_GROUPS: "/field-groups",
    PRODUCT_BY_ID: "/products",
    ADD_ASSET : "/assets",
    MOVE_TO_Inventory: '/move-to-inventory',
    ARCHIVE_ASSET: '/move-to-archive',
  },
};

export const servicesAccessibleWithoutToken = [
  ...Object.values(ApiUrls.ADMIN_AUTH),
  //   ...Object.values(ApiUrls.CONFIG),
];
