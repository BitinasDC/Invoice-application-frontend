// Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
// import httpClient from "../http-common";

// const getAll = () => {
//   return httpClient.get("/items");
// };

// const create = (data) => {
//   return httpClient.post("/items", data);
// };

// const get = (id) => {
//   return httpClient.get(`/items/${id}`);
// };

// const update = (data, id) => {
//   return httpClient.post(`/items`, data);
// };

// const remove = (id) => {
//   return httpClient.delete(`/items/${id}`);
// };
// export default { getAll, create, get, update, remove };
import httpClient from "../http-common";
import authHeader from './auth-header';
import axios from 'axios';


const API_URL = 'http://localhost:8080/api/v1/';
const getAll = () => {
  return axios.get(API_URL + 'items', { headers: authHeader() });
};

const create = (data) => {
  return axios.post(API_URL + 'items' , data, { headers: authHeader() });
};

const get = (id) => {
  return axios.get(API_URL + `items/${id}`, { headers: authHeader() });
};

const update = (data, id) => {
  return axios.post(API_URL + 'items', data, { headers: authHeader() });
};

const remove = (id) => {
  return axios.delete(API_URL + `items/${id}`, { headers: authHeader() });
};
export default { getAll, create, get, update, remove };