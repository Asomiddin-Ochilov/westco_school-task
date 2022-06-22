import { Button } from "antd";
import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import { getAllCourses } from "../../../../Redux/ApiCalls/user/courses";
import { getAllCoursesData } from "../../../../Redux/Reducers/user/courses";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCoursData,
  updateCoursData,
} from "../../../../Redux/ApiCalls/admin/courses";
import Loader from "../../../../Components/Loader";
import { Modal, Input } from "antd";
import { createCoursData } from "./../../../../Redux/ApiCalls/admin/courses";
const CoursesPage = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [coursItem, setCoursItem] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCourses(setLoading).then((res) => {
      const { data } = res.data.data;
      setCourses(data);
      dispatch(getAllCoursesData(data));
      setPageLoad(false);
    });
  }, []);

  const changeEditCourses = (item) => {
    setIsModal(true);
    setCoursItem(item);
    
  };

  const deleteCourses = (id) => {
    const toas = toast.loading("Please wait...");

    deleteCoursData(setLoading, id, toas).then((res) => {
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
      <ModalPage
        isModalVisible={isModal}
        setIsModalVisible={setIsModal}
        coursItem={coursItem}
        setCoursItem={setCoursItem}
      />
      {courses && (
        <React.Fragment>
          <div className="content_btn_blog">
            <Button onClick={() => setIsModal(true)}> Add Courses</Button>
          </div>

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

                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                      <div className="line"> </div>
                      <div className="footer_block">
                        <div className="btn_group">
                          <Button onClick={() => changeEditCourses(item)}>
                            Edit
                          </Button>
                          <Button onClick={() => deleteCourses(item._id)}>
                            delete
                          </Button>
                        </div>
                      </div>
                    </footer>
                  </div>
                </Fade>
              ))}
          </div>
        </React.Fragment>
      )}

      <Loader bg={"#fff"} size={48} loading={pageLoad} effect={false} />
    </div>
  );
};

export default CoursesPage;

const ModalPage = ({
  isModalVisible,
  setIsModalVisible,
  coursItem,
  setCoursItem,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [coursesName, setCoursesName] = useState(coursItem?.name);
  const [coursesNameError, setCoursesNameError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoUrlError, setVideoUrlError] = useState("");
  const [description, setDescription] = useState(coursItem?.description);
  const [descriptionError, setDescriptionError] = useState("");
  const [imgUrl, setImgUrl] = useState(coursItem?.imgUrl);
  const [imgUrlError, setImgUrlError] = useState("");
  const [loading, setLoading] = useState(false);

  const changeCoursesName = (e) => {
    setCoursesName(e);
    if (coursesName.length > 3) {
      setCoursesNameError("");
    } else {
      setCoursesNameError("error");
    }
  };

  const changeVideoUrl = (e) => {
    setVideoUrl(e);
    if (videoUrl.length > 3) {
      setVideoUrlError("");
    } else {
      setVideoUrlError("error");
    }
  };

  const changeImgUrl = (e) => {
    setImgUrl(e);
    if (imgUrl.length > 3) {
      setImgUrlError("");
    } else {
      setImgUrlError("error");
    }
  };

  const changeDescription = (e) => {
    setDescription(e);
    if (description.length > 3) {
      setDescriptionError("");
    } else {
      setDescriptionError("error");
    }
  };

  const submitFunc = (e) => {
    e.preventDefault();
    if (coursesName === "") {
      setCoursesNameError("error");
    } else if (videoUrl.length < 5) {
      setVideoUrlError("error");
    } else if (imgUrl.length < 5) {
      setImgUrlError("error");
    } else if (description.length < 5) {
      setDescriptionError("error");
    } else {
      if (coursItem) {
        setLoading(true);
        const obj = {
          _id: coursItem._id,
          value: coursesName,
          videoUrl: videoUrl,
          description: description,
          imgUrl: imgUrl,
        };
        const toas = toast.loading("Please wait...");
        updateCoursData(setLoading, obj, toas).then((res) => {
          setLoading(false);
          const { data } = res.data;
          setCoursItem("");
          setCoursesName("");
          setDescription("");
          setImgUrl("");
          setVideoUrl("");
          toast.update(toas, {
            render: "All is good",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          setIsModalVisible(false);
        });
      } else {
        setLoading(true);
        const obj = {
          value: coursesName,
          videoUrl: videoUrl,
          description: description,
          imgUrl: imgUrl,
        };
        const toas = toast.loading("Please wait...");
        createCoursData(setLoading, obj, toas).then((res) => {
          setLoading(false);
          const { data } = res.data;
          setCoursItem("");
          setCoursItem("");
          setCoursesName("");
          setDescription("");
          setImgUrl("");
          setVideoUrl("");
          toast.update(toas, {
            render: "All is good",
            type: "success",
            isLoading: false,
            autoClose: 1000,
          });
          setIsModalVisible(false);
        });
      }
    }
  };

  return (
    <Modal
      title={"Courses"}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
      destroyOnClose={true}
      centered
    >
      <div className="modal_form">
        <form onSubmit={submitFunc} className="form">
          <div className="item">
            <div className="label font">Courses Name</div>
            <Input
              type={"text"}
              status={coursesNameError}
              value={coursesName}
              onChange={(e) => changeCoursesName(e.target.value)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">Video UrL</div>
            <Input
              className="input"
              type={"text"}
              status={videoUrlError}
              value={videoUrl}
              onChange={(e) => changeVideoUrl(e.target.value)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">Img UrL</div>
            <Input
              className="input"
              type={"text"}
              status={imgUrlError}
              value={imgUrl}
              onChange={(e) => changeImgUrl(e.target.value)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">Description</div>
            <Input
              className="input"
              type={"text"}
              status={descriptionError}
              value={description}
              defaultValue={coursItem.description}
              onChange={(e) => changeDescription(e.target.value)}
              placeholder="example"
            />
          </div>

          <Button htmlType="submit" type="primary font" loading={loading}>
            {" "}
            Submit{" "}
          </Button>
        </form>
      </div>
    </Modal>
  );
};