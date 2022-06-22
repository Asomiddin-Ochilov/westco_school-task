import { createSlice } from "@reduxjs/toolkit";

export const getAllCoursesData = (data) => {
  return (dispatch) => {
    dispatch({
      type: setCourses.type,
      payload: data,
    });
  };
};

export const getUserCoursesData = (data) => {
  return (dispatch) => {
    dispatch({
      type: setUserCourses.type,
      payload: data,
    });
  };
};

const CoursesReducer = createSlice({
  name: "courses",
  initialState: {
    courses: null,
    coursesUser: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setUserCourses: (state, action) => {
      state.coursesUser = action.payload;
    },
  },
});

export default CoursesReducer.reducer;
export const { setCourses, setUserCourses } = CoursesReducer.actions;
