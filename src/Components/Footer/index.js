import React from "react";

const Footer = () => {
  return (
    <div id="contact"  className="footer_page page">
      <div className="left">
        <div className="logo font">
          <img src="/assets/logo.svg" alt="" />
          Westco School
        </div>

        <div className="text font">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, saepe.
        </div>

        <div className="footer">
          <div className="links">
            <div className="status font">You Can Follow Us</div>
            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
          <div className="contacts">
            <div className="status font">Contacts</div>
            <div className="group">
              <div className="item font">
                <i className="bi bi-geo-alt-fill"></i>
                Toshkent city
                {/* Angren shahri */}
              </div>
              <div className="item font">
                <i className="bi bi-telephone-fill"></i>
                +017 4845 7269
              </div>
              <div className="item font">
                <i className="bi bi-envelope"></i>
                info@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
