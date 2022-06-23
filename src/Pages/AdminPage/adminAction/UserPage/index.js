import { Button } from "antd";
import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";
import { baseURL } from "../../../../Redux/ApiCalls/baseUrl";
import Loader from "../../../../Components/Loader";
import { getAllUserData } from "../../../../Redux/ApiCalls/admin/user";
const UsersPage = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    getAllUserData(setLoading).then((res) => {
      const { data } = res.data.data;
      setData(data);
      setPageLoad(false);
    });
  }, []);

  return (
    <div className="courses_page page_position">
      {data && (
        <div className="content">
          {data &&
            data.map((item, index) => (
              <Fade bottom key={index}>
                <div className="card">
                  <img
                    alt=""
                    onError={(e) => {
                      e.target.src =
                        "https://beoe.gov.pk/uploads/complaints/results/default/sample.jpg";
                    }}
                  />
                  <footer>
                    <div className="title font">{item?.fullName}</div>

                    <div className="stars">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <br />
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

export default UsersPage;
