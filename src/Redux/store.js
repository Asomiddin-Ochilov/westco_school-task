import { configureStore } from "@reduxjs/toolkit";
import CoursesReducer from "./Reducers/user/courses";
import getAllData from "./Reducers/user/getAllData";
import userDataReducer from "./Reducers/user/userData";
import adminDataReducer from './Reducers/admin/userData';
export default configureStore({
  reducer: { CoursesReducer, getAllData, userDataReducer , adminDataReducer },
});
