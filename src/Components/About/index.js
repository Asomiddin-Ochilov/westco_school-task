import React, { useEffect } from "react";
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";
const About = () => {
  const courses = useSelector((state) => state.getAllData);
  return (
    <div  className="about page">
      <Fade bottom>
        <div className="item">
          <div className="left">
            <div className="circle">
              <i className="bi bi-award-fill"></i>
            </div>
          </div>
          <div className="right">
            <div className="font">{courses?.courses?.total}+</div>
            <div className="font">Courses</div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className="item">
          <div className="left">
            <div className="circle">
              <i className="bi bi-people-fill"></i>
            </div>
          </div>
          <div className="right">
            <div className="font">{courses?.students?.total}+</div>
            <div className="font">Students</div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        <div className="item">
          <div className="left">
            <div className="circle">
              <i className="bi bi-book-fill"></i>
            </div>
          </div>
          <div className="right">
            <div className="font">{courses?.books?.total}+</div>
            <div className="font">Books</div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default About;
