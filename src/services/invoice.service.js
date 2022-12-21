// import httpClient from "../http-common";
// import authHeader from './auth-header';
// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/v1/';

// const getAll = () => {
//   return axios.get(API_URL + 'invoices', { headers: authHeader() });
// };

// // const getAll = () => {
// //   return httpClient.get("/invoices");
// // };

// const create = (data) => {
//   return httpClient.post("/invoices", data);
//   //return axios.get(API_URL + 'invoices', { headers: authHeader() },data);
// };

// const get = (id) => {
//   return httpClient.get(`/invoices/${id}`);
// };

// const update = (data) => {
//   return httpClient.post(`/invoices`, data);
// };

// // const update = (data, id) => {
// //   return httpClient.put(`/invoices/${id}`, data);
// // };

// const remove = (id) => {
//   return httpClient.delete(`/invoices/${id}`);
// };
// export default { getAll, create, get, update, remove };
import httpClient from "../http-common";
import authHeader from './auth-header';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';
const getAll = () => {
  return axios.get(API_URL + 'invoices', { headers: authHeader() });
};

const create = (data) => {
  return axios.post(API_URL + 'invoices', data, { headers: authHeader() });
};

const get = (id) => {
  return axios.get(API_URL + `invoices/${id}`, { headers: authHeader() });
};


const update = (data) => {
  return axios.post(API_URL + 'invoices', data, { headers: authHeader() });
};

// const update = (data, id) => {
//   return httpClient.put(`/invoices/${id}`, data);
// };

const remove = (id) => {
  return axios.delete(API_URL + `invoices/${id}`, { headers: authHeader() });
};
export default { getAll, create, get, update, remove };