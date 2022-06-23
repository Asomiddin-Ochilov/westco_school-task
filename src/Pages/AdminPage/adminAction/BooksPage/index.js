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
import { Modal, Input, Select } from "antd";
import { createCoursData } from "./../../../../Redux/ApiCalls/admin/courses";
import {
  createBooksData,
  deleteBooksData,
  getAllBooksData,
  updateBooksData,
} from "./../../../../Redux/ApiCalls/admin/books";
import { getAllData } from "../../../../Redux/ApiCalls/user/getAllData";
import { baseURL } from "../../../../Redux/ApiCalls/baseUrl";
import { upLoadImg } from "../../../../Redux/ApiCalls/upload";
const { Option } = Select;
const BooksPage = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [coursItem, setCoursItem] = useState("");
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllData().then((res) => {
      setCategory(res[3]?.data?.data);
    });
    getAllBooksData(setLoading).then((res) => {
      const { data } = res.data.data;
      setBooks(data);
      setPageLoad(false);
    });
  }, []);

  const changeEditCourses = (item) => {
    setIsModal(true);
    setCoursItem(item);
  };

  const deleteCourses = (id) => {
    const toas = toast.loading("Please wait...");

    deleteBooksData(setLoading, id, toas).then((res) => {
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
        category={category}
      />
      {books && (
        <React.Fragment>
          <div className="content_btn_blog">
            <Button onClick={() => setIsModal(true)}> Add Book</Button>
          </div>

          <div className="content">
            {books &&
              books.map((item, index) => (
                <Fade bottom key={index}>
                  <div className="card">
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

export default BooksPage;

const ModalPage = ({
  isModalVisible,
  setIsModalVisible,
  coursItem,
  setCoursItem,
  category,
}) => {
  const handleCancel = () => {
    setIsModalVisible(false);
    setCoursItem("");
    setCoursItem("");
    setCoursesName("");
    setDescription("");
    setImgUrl("");
    setVideoUrl("");
  };
  const [coursesName, setCoursesName] = useState('');
  const [coursesNameError, setCoursesNameError] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoUrlError, setVideoUrlError] = useState("");
  const [description, setDescription] = useState(coursItem?.description);
  const [descriptionError, setDescriptionError] = useState("");
  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlError, setImgUrlError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryError, setCategoryError] = useState("");
  console.log(coursItem);
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
    const formData = new FormData();
    console.log(e);
    formData.append("file", e.target.files[0]);
    formData.append("type", "img");
    const toas = toast.loading("Please wait...");
    upLoadImg(toas, formData).then((res) => {
      console.log(res);
      toast.update(toas, {
        render: "All is good",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
      setImgUrl(res.data.data);
    });
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
    } else if (description.length < 5) {
      setDescriptionError("error");
    } else if (categoryId === "") {
      setCategoryError("error");
    } else {
      if (coursItem) {
        setLoading(true);
        const formData = new FormData();
        formData.append("name", coursesName);
        formData.append("ebookUrl", videoUrl);
        formData.append("description", description);
        formData.append("imgUrl", imgUrl);
        formData.append("authorId", localStorage.getItem("id"));
        formData.append("_id", coursItem._id);

        const toas = toast.loading("Please wait...");
        updateBooksData(setLoading, formData, toas).then((res) => {
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
        const formData = new FormData();
        formData.append("name", coursesName);
        formData.append("ebookUrl", videoUrl);
        formData.append("description", description);
        formData.append("imgUrl", imgUrl);
        formData.append("authorId", localStorage.getItem("id"));
        formData.append("categoryId", categoryId);

        const toas = toast.loading("Please wait...");
        createBooksData(setLoading, formData, toas).then((res) => {
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

  const onChange = (value) => {
    setCategoryId(value);
    setCategoryError("");
  };

  return (
    <Modal
      title={"Books"}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
      destroyOnClose={true}
      centered
    >
      <div className="modal_form">
        <form onSubmit={submitFunc} className="form">
          <div className="item">
            <div className="label font">Book Name</div>
            <Input
              type={"text"}
              status={coursesNameError}
              value={coursItem.name ? coursItem.name : coursesName}
              onChange={(e) => changeCoursesName(e.target.value)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">ebookUrl UrL</div>
            <Input
              className="input"
              type={"text"}
              status={videoUrlError}
              value={coursItem.ebookUrl ? coursItem.ebookUrl : videoUrl}
              onChange={(e) => changeVideoUrl(e.target.value)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">Img </div>
            <input
              className="input"
              type={"file"}
              onChange={(e) => changeImgUrl(e)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">Description</div>
            <Input
              className="input"
              type={"text"}
              status={descriptionError}
              value={
                coursItem.description ? coursItem.description : description
              }
              onChange={(e) => changeDescription(e.target.value)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">Category</div>
            <div className="select_modal">
              <Select
                showSearch
                placeholder="Select Category"
                onChange={onChange}
                status={categoryError}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                className="selection-wrapper"
              >
                <Option value="all">All</Option>
                {category &&
                  category.data.map((item, index) => (
                    <Option key={index} value={item._id}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
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
