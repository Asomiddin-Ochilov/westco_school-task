import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import { Modal, Button } from "antd";
import { getUserCourses } from "../../../../Redux/ApiCalls/user/courses";
import { getUserCoursesData } from "../../../../Redux/Reducers/user/courses";
import Loader from "../../../../Components/Loader";
import { baseURL } from "./../../../../Redux/ApiCalls/baseUrl";
const CoursesPage = () => {
  const courses = useSelector((state) => state.CoursesReducer.coursesUser);
  const [coursItem, setCoursItem] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserCourses(setLoading).then((res) => {
      const { data } = res.data;
      dispatch(getUserCoursesData(data));
      setLoading(false);
    });
  }, []);
  const changeOpenCourses = (item) => {
    setCoursItem(item);
    setIsModalVisible(true);
  };

  return (
    <div className="courses_page page_position">
      <ModalPage
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        coursItem={coursItem}
      />
      {courses && (
        <React.Fragment>
          <div className="card_group">
            {courses.map((item, index) => (
              <Fade bottom key={index}>
                <div onClick={() => changeOpenCourses(item)} className="card">
                  <img
                    src={
                      item?.imgUrl.startsWith("img/img")
                        ? baseURL + item?.imgUrl
                        : item?.imgUrl
                    }
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://beoe.gov.pk/uploads/complaints/results/default/sample.jpg";
                    }}
                  />
                  <footer>
                    <div className="sale font">600 000 so'm</div>
                    <div className="title font">{item.name}</div>
                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div className="line"> </div>
                  </footer>
                </div>
              </Fade>
            ))}
          </div>
        </React.Fragment>
      )}
      <Loader bg={"#fff"} size={48} loading={loading} effect={false} />
    </div>
  );
};

const ModalPage = ({ isModalVisible, setIsModalVisible, coursItem }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      title={coursItem.name}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
      destroyOnClose={true}
    >
      <iframe
        width="727"
        height="409"
        src="https://www.youtube.com/embed/Z-Z8gHLVn9s"
        title="IT sohasiga kirishdan oldin shu videoni ko'ring"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Modal>
  );
};
export default CoursesPage;
