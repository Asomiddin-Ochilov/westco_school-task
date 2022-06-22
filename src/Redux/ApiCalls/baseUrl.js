import axios from "axios";
const baseURL = "https://coursesnodejs.herokuapp.com";
export const api = axios.create({
     baseURL
});
