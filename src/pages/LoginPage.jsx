import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

import { Input, Checkbox, Button, notification } from "antd";
import { MailFilled, LockFilled } from "@ant-design/icons";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);

  const Context = React.createContext({
    name: "Default",
  });

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.warning({
      message: `Ohh Noo!`,
      description: (
        <Context.Consumer>
          Error in credentails please try again
        </Context.Consumer>
      ),
      placement,
    });
  };

  const authUser = async () => {
    if (email && password != null) {
      var response = await axios.get(
        `https://dbe2-43-243-173-51.in.ngrok.io/student/getstudentbyid?ID=${email}&password=${password}`
      );
      if (response.status === 200) {
        var data = response.data;
        console.log(data);
        setUserData(data);
        navigate(`/${email}`, { state: data });
      } else {
        openNotification("topLeft");
        navigate("/login");
      }
    }
  };

  useEffect(() => {}, []);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className="LoginPage">
      <div className="img">
        <img src="./loginBac.jpeg" id="image" />
      </div>
      <div className="form">
        <h1>Student App</h1>
        <div className="form-contents">
          <Input
            placeholder="Email"
            type="email"
            style={{ padding: 10, marginBottom: 20, marginTop: 20 }}
            prefix={<MailFilled />}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            style={{ padding: 10, marginBottom: 20 }}
            prefix={<LockFilled />}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="options">
            <Checkbox onChange={onChange}>Remember Me</Checkbox>
            <Button type="text">Forgot Password</Button>
          </div>
          <Button
            type="primary"
            block
            style={{ fontWeight: "bold", fontSize: 15 }}
            onClick={() => authUser()}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
