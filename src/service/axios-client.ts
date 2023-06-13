import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://625d2b4a4c36c753577065b8.mockapi.io/api/user-management",
});
