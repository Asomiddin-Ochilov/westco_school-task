import React, { useState } from "react";
import { Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { singupFunc } from "../../../Redux/ApiCalls/user/auth";
import { useDispatch } from "react-redux";
import { getUser } from "../../../Redux/Reducers/user/userData";
const SingUp = () => {
  const history = useHistory();

  const [fullName, setFullName] = useState("");
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
    e.preventDefault()
    if (fullName === "") {
      setFullNameErrors("error");
    } else if (password.length < 5) {
      setPasswordErrors("error");
    } else {
      setLoading(true);
      const obj = {
        fullName: fullName,
        password: password,
      };
      singupFunc(obj , setLoading , history).then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data?.data?.token);
          localStorage.setItem("id", res?.data?.data?.user?._id);
          dispatch(getUser(res?.data?.data?.user));
          history.push(`/user/${res?.data?.data?.user?._id}`);
          setLoading(false);
        }
      });
    }
  };

  return (
    <div className="sing_up">
      <div className="left">
        <form onSubmit={submitFunc} className="form">
          <div className="logo">
            <img src="/assets/logo.svg" alt="" />
          </div>
          <div className="line"></div>
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
            Create account{" "}
          </Button>

          <div className="text font">
            Already have an account?{" "}
            <span onClick={() => history.push("/login")}> Log in </span>
          </div>
        </form>
      </div>
      <div className="right">
        <img src="/assets/n1.png" alt="" />
      </div>
    </div>
  );
};

export default SingUp;
