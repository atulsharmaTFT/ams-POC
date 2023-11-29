import { servicesAccessibleWithoutToken } from '../constants/api.path';

export const isApiAccessibleWithoutToken = (requestUrl) => {
  const requestUrlWithoutQueryString = requestUrl.split('?')[0];
  return servicesAccessibleWithoutToken.includes(requestUrlWithoutQueryString);
};

export const getQueryParams = (params) => {
  let queryString = '';
  Object.keys(params).forEach((key, index) => {
    if (index === 0) {
      queryString += '?';
    } else if (index > 0) {
      queryString += '&';
    }
    const val = typeof params[key] === 'string' ? params[key] : JSON.stringify(params[key]);
    queryString += `${key}=${val}`;
  });
  return queryString;
};

export const getAdminToken = () => {
  return JSON.parse(localStorage.getItem('loggedInAdmin'))?.token;
};

export const getUserRole = () => {
  return JSON.parse(localStorage.getItem('loggedInAdmin'))?.data?.role;
};

export const logout = () => {
  localStorage.clear();
};

export const isTokenExpired = (error) => {
  const { response } = error;
  if (response) {
    if (response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
};