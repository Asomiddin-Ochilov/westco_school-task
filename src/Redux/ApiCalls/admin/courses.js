import { api } from "../baseUrl";
import { toast } from "react-toastify";


export const updateCoursData = async (setLoading, data, toas) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.put("/employee/courseParts", data, config).catch((err) => {
    toast.update(toas, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  });
};

export const deleteCoursData = async (setLoading, id, toas) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.delete(`/employee/courseParts/${id}`, config).catch((err) => {
    toast.update(toas, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  });
};

export const createCoursData = async (setLoading, data, toas) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.post("/employee/courseParts", data, config).catch((err) => {
    toast.update(toas, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  });
};
