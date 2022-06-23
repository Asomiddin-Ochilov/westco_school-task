import axios from "axios";
export const baseURL = "https://coursesnodejs.herokuapp.com/";
export const api = axios.create({
     baseURL
});
