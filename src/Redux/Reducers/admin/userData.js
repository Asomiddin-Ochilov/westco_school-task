import { createSlice } from "@reduxjs/toolkit";

export const getAdmin = (data) => {
  return (dispatch) => {
    dispatch({
      type: setAdminData.type,
      payload: data,
    });
  };
};

export const adminDataReducer = createSlice({
  name: "admin",
  initialState: {
    adminData: null,
    isAuth: false,
  },
  reducers: {
    setAdminData: (state, action) => {
      state.adminData = action.payload;
      if (action.payload) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});

export default adminDataReducer.reducer;

export const { setAdminData } = adminDataReducer.actions;
