export const ApiUrls = {
  ADMIN_AUTH: {
    LOGIN: "/api/v1/admin-login",
    REGISTER: "/v1/auth/register",
    SOCIAL_LOGIN: "/v1/auth/oAuth",
  },
  ADMIN_APIS: {
    USERS: "/users",
    CREATE_FIELDS: "/api/v1/common-for-admin/create-field",
    CREATE_FIELDS_GROUP: "/api/v1/common-for-admin/create-field-group",
    CREATE_PRODUCT: "/api/v1/common-for-admin/create-product-category",
    FIELDS: "/api/v1/common-for-admin/get-all-fields",
    FIELD_GROUPS: "/api/v1/common-for-admin/get-all-field-groups",
    PRODUCT_CATEGORY: "/api/v1/common-for-admin/get-all-product-categories",
    PRODUCT_BY_ID: "/products",
    ADD_ASSET : "/assets",
    ORGANIZATIONS: "/api/v1/super-admin/get-all-organizations",
    DOMAINS: "/api/v1/super-admin/get-all-domain-categories",
    ADD_DOMAIN: "/api/v1/super-admin/create-domain-category",
    MOVE_TO_Inventory: '/move-to-inventory',
    ARCHIVE_ASSET: '/move-to-archive',
    ADD_ORGANIZATION : '/api/v1/super-admin/create-organization'
  },
};

export const servicesAccessibleWithoutToken = [
  ...Object.values(ApiUrls.ADMIN_AUTH),
  //   ...Object.values(ApiUrls.CONFIG),
];
