import { api } from "../baseUrl";
import { toast } from "react-toastify";

export const getAllUserData = async (history) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api
    .get("/employee/paging?page=1&limit=5", config)
    .catch((err) => {
      alert(err.message);
      history.push("/");
    });
};
