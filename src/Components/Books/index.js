import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";
import { Button, Select } from "antd";
import { baseURL } from "./../../Redux/ApiCalls/baseUrl";
import { useHistory } from "react-router-dom";
const { Option } = Select;

const Books = () => {
  const books = useSelector((state) => state.getAllData.books.data);
  const category = useSelector((state) => state.getAllData.categorys.data);
  const [categoryID, setCategoryID] = useState("all");
  const [data, setData] = useState(null);
  const isAuth = useSelector((state) => state.userDataReducer.isAuth);

  const history = useHistory();

  useEffect(() => {
    if (categoryID === "all") {
      const data = books.map((item) => {
        return {
          _id: item?._id,
          imgUrl: item?.imgUrl,
          name: item?.name,
          description: item?.description,
          ebookUrl: item?.ebookUrl,
        };
      });
      setData(data);
    } else {
      const FilterData = category.filter((item) => {
        if (item._id === categoryID) {
          return item;
        }
      });

      const data = FilterData[0].books.map((item) => {
        return {
          _id: item?._id,
          imgUrl: item?.imgUrl,
          name: item?.name,
          description: item?.description,
          ebookUrl: item?.ebookUrl,
        };
      });
      setData(data);
    }
  }, [categoryID]);

  const onChange = (value) => {
    setCategoryID(value);
  };

  const openBookPage = (item) => {
    if (isAuth) {
      history.push(`book/${item?._id}`);
    } else {
      history.push("/login");
    }
  };

  return (
    <div id="books" className="book page">
      <div className="header">
        <div className="left">
          <div className="font title">Books</div>
          <div className="line"></div>
        </div>
        <div className="right">
          <Select
            showSearch
            placeholder="Select Category"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            className="selection-wrapper"
          >
            <Option value="all">All</Option>
            {category &&
              category.map((item, index) => (
                <Option key={index} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>
      <main>
        {data && (
          <React.Fragment>
            {data.length > 0 ? (
              data.map((item, index) => (
                <Fade bottom key={index}>
                  <div className="card" onClick={() => openBookPage(item)}>
                    <img
                      onError={(e) => {
                        e.target.src =
                          "https://beoe.gov.pk/uploads/complaints/results/default/sample.jpg";
                      }}
                      src={item?.imgUrl.startsWith('img/img') ?  baseURL + item?.imgUrl : item?.imgUrl}
                      alt=""
                    />
                    <div className="footer">
                      <div className="status font">{item.name}</div>
                      <div className="date font">{item?.description}</div>
                    </div>
                  </div>
                </Fade>
              ))
            ) : (
              <div className="content_text font">No reference</div>
            )}
          </React.Fragment>
        )}
      </main>
    </div>
  );
};

export default Books;
