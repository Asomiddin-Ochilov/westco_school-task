import { createSlice } from "@reduxjs/toolkit";

export const getUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: setUserData.type,
      payload: data,
    });
  };
};

export const userDataReducer = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isAuth: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      if (action.payload) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});

export default userDataReducer.reducer;

export const { setUserData } = userDataReducer.actions;
