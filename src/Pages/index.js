import React, { useEffect, useState } from "react";
import About from "../Components/About";
import Blog from "../Components/Books";
import Courses from "../Components/Courses";
import Feedbeack from "../Components/Feedbeak";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Subscribe from "../Components/Subscribe";
import Teacher from "../Components/Teachers";
import { getAllData } from "../Redux/ApiCalls/user/getAllData";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllCourses,
  getAllStudents,
  getAllBooks,
  getAllCategory,
} from "../Redux/Reducers/user/getAllData";
import Loader from "../Components/Loader";
import { getUserData } from "../Redux/ApiCalls/user/auth";
import { getUser } from "../Redux/Reducers/user/userData";
import { getAdmin } from "./../Redux/Reducers/admin/userData";
import { getAdminData } from "../Redux/ApiCalls/admin/auth";
const Pages = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const type = localStorage.getItem("type");
      if (type === "user") {
        getUserData(token, history).then((res) => {
          dispatch(getUser(res?.data?.data));
        });
      } else if (type === "admin") {
        getAdminData(token, history).then((res) => {
          dispatch(getUser(res?.data?.data));
        });
      }
    }
    getAllData().then((res) => {
      if (res) {
        dispatch(getAllCourses(res[0]?.data?.data));
        dispatch(getAllStudents(res[1]?.data?.data));
        dispatch(getAllBooks(res[2]?.data?.data));
        dispatch(getAllCategory(res[3]?.data?.data));
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className="">
      {!loading && (
        <React.Fragment>
          <Header />
          <About />
          <Courses />
          <Teacher />
          <Feedbeack />
          <Blog />
          <Subscribe />
          <Footer />
        </React.Fragment>
      )}

      <Loader bg={"#fff"} size={48} loading={loading} effect={false} />
    </div>
  );
};

export default Pages;
