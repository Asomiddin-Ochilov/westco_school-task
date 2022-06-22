import React, { useEffect, useState } from "react";
import { Modal , Button } from "antd";
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Courses = () => {
  const courses = useSelector((state) => state.getAllData.courses.data);
  const isAuth = useSelector((state) => state.userDataReducer.isAuth);
  const [coursItem, setCoursItem] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();

  const changeOpenCourses = (item) => {
    if (isAuth) {
      setCoursItem(item);
      setIsModalVisible(true);
    } else {
      history.push("/singup");
    }
  };
  return (
    <div className="courses page">
      <div className="left">
        <div className="font">All Courses</div>
        <div className="line"></div>
        <ModalPage
          setIsModalVisible={setIsModalVisible}
          isModalVisible={isModalVisible}
          coursItem={coursItem}
        />
        <div className="card_group">
          {courses &&
            courses.map((item, index) => (
              <Fade bottom key={index}>
                <div onClick={() => changeOpenCourses(item)} className="card">
                  <img
                    src={item?.imgUrl}
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://it-park.uz/storage/images/news/normal/VADM3z4ZsQxx3Rpu9qUH3gNtuXd6iYIzaOcjHXln.jpg";
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
                    <div className="footer_block">
                      <div className="left font">
                        <i className="bi bi-people-fill"></i> 200
                      </div>
                      <div className="center font">
                        <i className="bi bi-clock"></i>
                        2-soat
                      </div>
                      <div className="right font">
                        <i className="bi bi-camera-video-fill"></i>
                        online
                      </div>
                    </div>
                  </footer>
                </div>
              </Fade>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

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
      centered
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
