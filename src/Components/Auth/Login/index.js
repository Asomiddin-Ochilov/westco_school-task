import React, { useState } from "react";
import { Input, Checkbox, Button } from "antd";
import { useHistory } from "react-router-dom";
import { singinFunc } from "../../../Redux/ApiCalls/user/auth";
import { getUser } from "../../../Redux/Reducers/user/userData";
import { useDispatch } from "react-redux";
import { Tabs } from "antd";
import { singinAdminFunc } from "./../../../Redux/ApiCalls/admin/auth";
import { getAdmin } from "./../../../Redux/Reducers/admin/userData";

const { TabPane } = Tabs;
const Login = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [typeLogin, setTypeLogin] = useState("1");
  const dispatch = useDispatch();
  const passwordChange = (event) => {
    setPassword(event);
    if (password.length > 4) {
      setPasswordErrors("");
    } else {
      setPasswordErrors("error");
    }
  };

  const submitFunc = (e) => {
    e.preventDefault();
    if (password.length < 4) {
      setPasswordErrors("error");
    } else {
      setLoading(true);
      const obj = {
        password: password,
      };

      if (parseInt(typeLogin) === 1) {
        singinFunc(obj, setLoading, history).then((res) => {
          setLoading(false);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("type", "user");
         
          dispatch(getUser(res.data.data.user));
          history.push(`/user/${res?.data?.data?.user?._id}`);
        });
      } else if (parseInt(typeLogin) === 2) {
        singinAdminFunc(obj, setLoading, history).then((res) => {
          setLoading(false);
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("type", "admin");
          localStorage.setItem("id", res?.data?.data?.employee?._id);
          dispatch(getAdmin(res.data.data.employee));
          history.push(`/admin/${res?.data?.data?.employee?._id}`);
        });
      }
    }
  };

  return (
    <div className="login">
      <div className="left">
        <form onSubmit={submitFunc} className="form">
          <div className="logo">
            <img src="/assets/logo.svg" alt="" />
          </div>
          <Tabs defaultActiveKey="1" onChange={(e) => setTypeLogin(e)}>
            <TabPane tab="Login User" key="1">
              <div className="item">
                <div className="label font">Password</div>
                <Input.Password
                  className="input"
                  type={"password"}
                  status={passwordErrors}
                  value={password}
                  onChange={(e) => passwordChange(e.target.value)}
                  placeholder="example@gmail.com"
                />
              </div>
            </TabPane>
            <TabPane tab="Login Admin" key="2">
              <div className="item">
                <div className="label font">Password</div>
                <Input.Password
                  className="input"
                  type={"password"}
                  status={passwordErrors}
                  value={password}
                  onChange={(e) => passwordChange(e.target.value)}
                  placeholder="example@gmail.com"
                />
              </div>
            </TabPane>
          </Tabs>
          <Button type="primary font" htmlType="submit" loading={loading}>
            {" "}
            Log in{" "}
          </Button>

          <div className="text font">
            Don’t have account yet?{" "}
            <span onClick={() => history.push("/singup")}> New Account </span>
          </div>
        </form>
      </div>

      <div className="right">
        <img src="/assets/illustration.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
