import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import Fade from "react-reveal/Fade";
import { useHistory } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Redux/Reducers/user/userData";
const Header = () => {
  const data = useSelector((state) => state.userDataReducer.userData);
  const [toggleMenu, setToggleMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const size = parseInt(window.pageYOffset);
      if (size > 100) {
        const navbar = document.querySelector(".navbar");
        navbar.classList.add("shadow");
      } else {
        const navbar = document.querySelector(".navbar");
        navbar.classList.remove("shadow");
      }
    });
  }, []);

  const scrollLink = (size) => {
    window.scrollTo({
      top: size,
      behavior: "smooth",
    });
    setToggleMenu(false);
  };

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
            <div
              className="text_menu"
              onClick={() =>
                history.push(`/${data?.role ? "admin" : "user"}/${data._id}`)
              }
            >
              <div className="user_name font">{data?.fullName}</div>
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
          key: "1",
        },
      ]}
    />
  );
  return (
    <div className="header page">
      <div className="navbar">
        <div className="logo font">
          <img src="/assets/logo.svg" alt="" />
          Westco School
        </div>
        <div className="nav-link font">
          <a href="#home" onClick={() => scrollLink(0)}>
            {" "}
            Home
          </a>
          <a href="#about" onClick={() => scrollLink(390)}>
            {" "}
            About
          </a>
          <a href="#courses" onClick={() => scrollLink(680)}>
            {" "}
            Courses
          </a>
          <a href="#books"> Books</a>
          <a href="#contact"> Contact</a>
        </div>
        <div className="right">
          <div className="drop_menu">
            {data ? (
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
            ) : (
              <React.Fragment>
                <Button
                  className="btn_auth"
                  onClick={() => history.push("/login")}
                >
                  {" "}
                  Login{" "}
                </Button>
                <Button
                  className="btn_auth"
                  onClick={() => history.push("/singup")}
                >
                  {" "}
                  SingUp{" "}
                </Button>
              </React.Fragment>
            )}
          </div>

          <div className={`response_navbar`}>
            {data ? (
              <div className="user_menu">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt=""
                  className="user_img"
                />
                <div className="menu_toggle">
                  {toggleMenu ? (
                    <i
                      className="bi bi-x-lg"
                      onClick={() => setToggleMenu(false)}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-list"
                      onClick={() => setToggleMenu(true)}
                    ></i>
                  )}
                </div>
              </div>
            ) : (
              <div className="menu_button">
                {toggleMenu ? (
                  <i
                    className="bi bi-x-lg"
                    onClick={() => setToggleMenu(false)}
                  ></i>
                ) : (
                  <i
                    className="bi bi-list"
                    onClick={() => setToggleMenu(true)}
                  ></i>
                )}
              </div>
            )}

            <div
              className={`nav_links font ${toggleMenu ? "active_menu" : ""}`}
            >
              {data ? (
                <div
                  className="user_info"
                  onClick={() => history.push(`/user/${data._id}`)}
                >
                  <div className="user_name font">{data?.fullName}</div>
                  <div className="user_status font"></div>
                </div>
              ) : (
                ""
              )}
              <a href="#home" onClick={() => scrollLink(0)}>
                {" "}
                Home
              </a>
              <a href="#about" onClick={() => scrollLink(390)}>
                {" "}
                About
              </a>
              <a href="#courses" onClick={() => scrollLink(680)}>
                {" "}
                Courses
              </a>
              <a href="#books" onClick={() => scrollLink(3244)}>
                {" "}
                Books
              </a>
              <a href="#contact"> Contact</a>
              {data ? (
                ""
              ) : (
                <React.Fragment>
                  <Button
                    className="btn"
                    onClick={() => history.push("/login")}
                  >
                    {" "}
                    Login{" "}
                  </Button>
                  <Button onClick={() => history.push("/singup")}>
                    {" "}
                    SingUp{" "}
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header_block">
        <div className="left">
          <Fade bottom>
            <h1 className="font">
              find our best online courses & become the master
            </h1>
          </Fade>
          <p className="font">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam,
            labore.
          </p>
          <div className="input_group">
            <Input placeholder="Search courses" />
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
