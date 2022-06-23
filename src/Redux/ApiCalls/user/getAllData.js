
import axios from "axios";

import { api } from "../baseUrl";
export const getAllData = async () => {
  const response = [
    "user/course?limit=20&page=1",
    "user/author?limit=20&page=1",
    "user/book?page=1&limit=8",
    "user/category?page=1&limit=5"
    ,
  ];

  const requestMap = response.map((item) => api.get(`${item}`));

  return await axios.all(requestMap);
};
