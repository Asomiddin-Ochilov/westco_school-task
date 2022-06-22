import { createSlice } from "@reduxjs/toolkit";

export const getAllCourses = (data) => {
  return (dispatch) => {
    dispatch({
      type: setCourses.type,
      payload: data,
    });
  };
};

export const getAllStudents = (data) => {
  return (dispatch) => {
    dispatch({
      type: setStudents.type,
      payload: data,
    });
  };
};

export const getAllBooks = (data) => {
  return (dispatch) => {
    dispatch({
      type: setBooks.type,
      payload: data,
    });
  };
};

export const getAllCategory = (data) => {
  return (dispatch) => {
    dispatch({
      type: setCategorys.type,
      payload: data,
    });
  };
};

const AllDataReducer = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    books: [],
    students: [],
    categorys:[]
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setStudents: (state, action) => {
      state.students = action.payload;
    },
    setCategorys: (state, action) => {
      state.categorys = action.payload;
    },
  },
});

export default AllDataReducer.reducer;
export const { setCourses, setBooks, setStudents , setCategorys } = AllDataReducer.actions;
