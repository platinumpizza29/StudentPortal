import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Checkbox,
  Button,
  notification,
  Dropdown,
  Space,
  Typography,
} from "antd";
import {
  MailFilled,
  LockFilled,
  UserOutlined,
  TagOutlined,
  PhoneOutlined,
  DownOutlined,
} from "@ant-design/icons";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [category, setCategory] = useState("");
  const [standard, setStandard] = useState(0);
  const [userData, setUserData] = useState([]);
  const [number, setNumber] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  let formData = {
    studentName: fullName,
    studentType: category.toUpperCase(),
    password: password,
    std: parseInt(standard),
    emailId: email,
    phoneNo: parseInt(number),
  };

  const Context = React.createContext({
    name: "Default",
  });

  const items = [
    {
      key: "open",
      label: "Open",
    },
    {
      key: "obc",
      label: "OBC",
    },
    {
      key: "ebc",
      label: "EBC",
    },
    {
      key: "st",
      label: "ST",
    },
    {
      key: "sc",
      label: "SC",
    },
  ];

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
    var uri =
      "https://studentportalspringboot-production.up.railway.app/student/addstudent";
    var response = await axios({
      method: "POST",
      url: uri,
      data: formData,
    });
    if (response.status === 200) {
      console.log(response.data);
      navigate(`/${email}`, { state: response.data });
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
            placeholder="John Doe"
            type="text"
            style={{ padding: 10, marginBottom: 20, marginTop: 20 }}
            prefix={<UserOutlined />}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Dropdown.Button
            menu={{
              onSelect: (e) => setCategory(e.key),
              items,
              selectable: true,
              defaultSelectedKeys: ["1"],
            }}
          >
            <Typography.Link>
              <Space>Category</Space>
            </Typography.Link>
          </Dropdown.Button>
          <Input
            placeholder="Eg. 12th"
            type="number"
            style={{ padding: 10, marginBottom: 20, marginTop: 20 }}
            prefix={<TagOutlined />}
            onChange={(e) => setStandard(e.target.value)}
          />
          <Input
            required
            placeholder="+918888888888"
            type="text"
            style={{ padding: 10, marginBottom: 20 }}
            prefix={<PhoneOutlined />}
            onChange={(e) => setNumber(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            style={{ padding: 10, marginBottom: 20 }}
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
            <Button type="text" onClick={() => navigate("/login")}>
              New User? Click Here...
            </Button>
          </div>
          <Button
            type="primary"
            block
            style={{ fontWeight: "bold", fontSize: 15 }}
            onClick={() => authUser()}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
