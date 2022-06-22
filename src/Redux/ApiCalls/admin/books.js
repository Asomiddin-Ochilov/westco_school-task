import { api } from "../baseUrl";
import { toast } from "react-toastify";

export const getAllBooksData = async (history) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.get("/employee/book?limit=5&page=1", config).catch((err) => {
    alert(err.message);
    history.push("/");
  });
};

export const updateBooksData = async (setLoading, data, toas) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.put("/employee/book", data, config).catch((err) => {
    toast.update(toas, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  });
};

export const deleteBooksData = async (setLoading, id, toas) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.delete(`/employee/book/${id}`, config).catch((err) => {
    toast.update(toas, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  });
};

export const createBooksData = async (setLoading, data, toas) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.post("/employee/book", data, config).catch((err) => {
    toast.update(toas, {
      render: "Something went wrong",
      type: "error",
      isLoading: false,
      autoClose: 1000,
    });
    setLoading(false);
  });
};
