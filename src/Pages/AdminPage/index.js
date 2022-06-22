import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useHistory,
  useParams,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { updateUserData } from "../../Redux/ApiCalls/user/auth";
import { getUser } from "../../Redux/Reducers/user/userData";
import { Dropdown, Menu, Space } from "antd";
import Loader from "../../Components/Loader";
import CoursesPage from "./adminAction/Courses";
import UsersPage from "./adminAction/UserPage";
import BooksPage from "./adminAction/BooksPage";
import { Modal, Input, Button } from "antd";
import { getAdminData } from "../../Redux/ApiCalls/admin/auth";
const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userDataReducer.userData);
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && id) {
      getAdminData(token, history).then((res) => {
        dispatch(getUser(res?.data?.data));
        setLoading(false);
      });
    }
  }, []);

  const exitPage = () => {
    history.push("/");
    localStorage.clear();
    dispatch(getUser(null));
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div className="exit_text font" onClick={exitPage}>
              Delete Acount
            </div>
          ),
          key: "0",
        },
        {
          label: (
            <div className="exit_text font" onClick={exitPage}>
              Exit
            </div>
          ),
          key: "0",
        },
      ]}
    />
  );

  return (
    <div className="user_page">
      {!loading && (
        <React.Fragment>
          <ModalPage
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            userData={data}
          />
          <div className="content">
            <div className="content_header">
              <div className="left">
                <div className="logo font">
                  <img src="/assets/logo.svg" alt="" />
                  <div className="text">Westco School</div>
                </div>
                <div className="nav_link">
                  <NavLink to={"/"}>Home</NavLink>
                </div>
              </div>

              <div className="right">
                <div className="user_profil">
                  <Dropdown
                    placement={"bottomRight"}
                    overlay={menu}
                    trigger={["click"]}
                  >
                    <div onClick={(e) => e.preventDefault()}>
                      <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                        alt=""
                        className="user_img"
                      />
                    </div>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="content_body">
              <div className="left">
                <div className="header">
                  <i
                    className="bi bi-pencil-square edit"
                    onClick={() => setIsModalVisible(true)}
                  ></i>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt=""
                  />
                  <div className="stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>
                  <div className="user_name font">{data?.fullName}</div>
                  <div className="user_name font">{data?.role?.name}</div>

                </div>
                <div className="my_links">
                  <NavLink
                    to={`/admin/${id}/courses`}
                    activeClassName="active_link"
                  >
                    <div className="left_item">
                      <i className="bi bi-list-stars"></i>
                      courses
                    </div>
                    <div className="right_item">
                      <i className="bi bi-chevron-down"></i>
                    </div>
                  </NavLink>
                  <NavLink
                    to={`/admin/${id}/users`}
                    activeClassName="active_link"
                  >
                    <div className="left_item">
                      <i className="bi bi-list-stars"></i>
                      users
                    </div>
                    <div className="right_item">
                      <i className="bi bi-chevron-down"></i>
                    </div>
                  </NavLink>
                  <NavLink
                    to={`/admin/${id}/books`}
                    activeClassName="active_link"
                  >
                    <div className="left_item">
                      <i className="bi bi-list-stars"></i>
                      books
                    </div>
                    <div className="right_item">
                      <i className="bi bi-chevron-down"></i>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="right ">
                <Switch>
                  <Route
                    path={`/admin/${id}/courses`}
                    component={CoursesPage}
                  />
                  <Route path={`/admin/${id}/users`} component={UsersPage} />
                  <Route path={`/admin/${id}/books`} component={BooksPage} />
                  <Redirect to={`/admin/${id}/courses`} />
                </Switch>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}

      <Loader bg={"#fff"} size={48} loading={loading} effect={false} />
    </div>
  );
};

const ModalPage = ({ isModalVisible, setIsModalVisible, userData }) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [fullName, setFullName] = useState(userData.fullName);
  const [fullNameErrors, setFullNameErrors] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const changeFullName = (e) => {
    setFullName(e);
    if (fullName.length > 3) {
      setFullNameErrors("");
    } else {
      setFullNameErrors("error");
    }
  };

  const changePassword = (e) => {
    setPassword(e);
    if (password.length > 5) {
      setPasswordErrors("");
    } else {
      setPasswordErrors("error");
    }
  };

  const submitFunc = (e) => {
    e.preventDefault();
    if (fullName === "") {
      setFullNameErrors("error");
    } else if (password.length < 5) {
      setPasswordErrors("error");
    } else {
      // setLoading(true);
      // const obj = {
      //   fullName: fullName,
      //   password: password,
      // };
      // updateUserData(setLoading, obj).then((res) => {
      //   setLoading(false);
      //   const { data } = res.data;
      //   dispatch(getUser(data));
      //   setIsModalVisible(false);
      // });
    }
  };

  return (
    <Modal
      title={"Edit"}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={false}
      destroyOnClose={true}
      centered
    >
      <div className="modal_form">
        <form onSubmit={submitFunc} className="form">
          <div className="item">
            <div className="label font">Full Name</div>
            <Input
              type={"text"}
              status={fullNameErrors}
              value={fullName}
              onChange={(e) => changeFullName(e.target.value)}
              placeholder="example"
            />
          </div>

          <div className="item">
            <div className="label font">Password</div>
            <Input.Password
              className="input"
              type={"password"}
              status={passwordErrors}
              value={password}
              onChange={(e) => changePassword(e.target.value)}
              placeholder="example@gmail.com"
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

export default AdminPage;
