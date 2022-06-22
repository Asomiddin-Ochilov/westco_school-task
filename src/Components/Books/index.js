import React, { useState, useEffect } from "react";
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";
import { Button, Select } from "antd";
const { Option } = Select;

const Books = () => {
  const books = useSelector((state) => state.getAllData.books.data);
  const category = useSelector((state) => state.getAllData.categorys.data);
  const [categoryID, setCategoryID] = useState("all");
  const [data, setData] = useState(null);
  useEffect(() => {
    if (categoryID === "all") {
      const data = books.map((item) => {
        return {
          _id: item?._id,
          imgUrl: item?.imgUrl,
          name: item?.name,
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
        };
      });
      setData(data);
    }
  }, [categoryID]);

  const onChange = (value) => {
    setCategoryID(value);
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
              category.map((item , index) => (
                <Option key={index} value={item._id}>{item.name}</Option>
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
                  <a
                    href="https://asaxiy.uz/product/knigi?language=ru"
                    className="card"
                    target={"_blank"}
                  >
                    <img
                      onError={(e) => {
                        e.target.src =
                          "https://upload.wikimedia.org/wikipedia/commons/5/5a/Books_HD_%288314929977%29.jpg";
                      }}
                      src={item?.imgUrl}
                      alt=""
                    />
                    <div className="footer">
                      {/* <div className="date font">mart 2022</div> */}
                      <div className="status font">{item.name}</div>
                      <Button className="font info">Download</Button>
                    </div>
                  </a>
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
