import axios from "axios";

// Create base URL API
let token = localStorage.getItem("token");
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: { Authorization: `bearer ${token}` },
});

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common = { Authorization: `Bearer ${token}` };
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const API_URL = "http://localhost:5000/";
export const PATH_FILE = "http://localhost:5000/uploads/"
