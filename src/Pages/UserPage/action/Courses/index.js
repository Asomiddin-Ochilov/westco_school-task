import { Button } from "antd";
import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import {
  getAllCourses,
  createUserCourses,
} from "../../../../Redux/ApiCalls/user/courses";
import { getAllCoursesData } from "../../../../Redux/Reducers/user/courses";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../Components/Loader";
const Courses = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    getAllCourses(setLoading).then((res) => {
      const { data } = res.data.data;
      setCourses(data);
      dispatch(getAllCoursesData(data));
      setPageLoad(false);
    });
  }, []);

  const changeJoinCourses = (id) => {
    const toas = toast.loading("Please wait...");
    const obj = {
      courseId: id,
    };
    createUserCourses(setLoading, obj, toas).then((res) => {
      toast.update(toas, {
        render: "All is good",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    });
  };

  return (
    <div className="courses_page page_position">
      {courses && (
        <div className="content">
          {courses &&
            courses.map((item, index) => (
              <Fade bottom key={index}>
                <div className="card">
                  <img
                    src={item.imgUrl}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://it-park.uz/storage/images/news/normal/VADM3z4ZsQxx3Rpu9qUH3gNtuXd6iYIzaOcjHXln.jpg";
                    }}
                  />
                  <footer>
                    <div className="sale font">600 000 so'm</div>
                    <div className="title font">{item?.name}</div>
                    {/* <div className="description">
                      {item.description && item?.description}
                    </div> */}
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div className="line"> </div>
                    <div className="footer_block">
                      <Button
                        loading={loading}
                        onClick={() => changeJoinCourses(item._id)}
                      >
                        {" "}
                        Join course{" "}
                      </Button>
                    </div>
                  </footer>
                </div>
              </Fade>
            ))}
        </div>
      )}
      <Loader bg={"#fff"} size={48} loading={pageLoad} effect={false} />
    </div>
  );
};

export default Courses;
