import { api } from "./baseUrl";
import { toast } from "react-toastify";
export const upLoadImg = async (toas, data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.post("employee/upload", data, config).catch((err) => {
     toast.update(toas, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
  });
};
