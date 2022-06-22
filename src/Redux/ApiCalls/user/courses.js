import { api } from "../baseUrl";
import { toast } from "react-toastify";

export const getAllCourses = async (setLoading) => {
  return await api.get("/user/course?limit=20&page=1").catch((err) => {
    toast.error(err.message);
    setLoading(false);
  });
};

export const getUserCourses = async (setLoading) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.get("/user/coursesUser", config).catch((err) => {
    toast.error(err.message);
    setLoading(false);
  });
};

export const createUserCourses = async (setLoading, data, toas) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.post("/user/coursesUser", data, config).catch((err) => {
    toast.update(toas, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  });
};
