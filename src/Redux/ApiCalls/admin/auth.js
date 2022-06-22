import { api } from "../baseUrl";

export const singinAdminFunc = async (data, setLoading, history) => {
  return await api.post("employee/sign-in", data).catch((err) => {
    alert(err.message);
    setLoading(false);
    history.push("/");
  });
};

export const getAdminData = async (token, history) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.get("/employee/profile", config).catch((err) => {
    alert(err.message);
    history.push("/");
  });
};

export const updateAdminData = async (setLoading, data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.put("/user/update", data, config).catch((err) => {
    alert(err.message);
    setLoading(false);
  });
};
