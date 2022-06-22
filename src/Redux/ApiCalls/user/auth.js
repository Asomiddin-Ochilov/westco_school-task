import { api } from "../baseUrl";

export const singupFunc = async (data, setLoading, history) => {
  return await api.post("/user/sign-up", data).catch((err) => {
    alert(err.message);
    setLoading(false);
    history.push("/");
  });
};

export const singinFunc = async (data, setLoading, history) => {
  return await api.post("user/sign-in", data).catch((err) => {
    alert(err.message);
    setLoading(false);
    history.push("/");
  });
};

export const getUserData = async (token, history) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.get("/user/getProfile", config).catch((err) => {
    alert(err.message);
    history.push("/");
  });
};

export const updateUserData = async (setLoading ,  data) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await api.put("/user/update", data, config).catch((err) => {
    alert(err.message);
    setLoading(false)
  });
};
