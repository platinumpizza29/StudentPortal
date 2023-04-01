import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./HomePage.css";
import CountUp from "react-countup";

import {
  Row,
  Col,
  Input,
  Menu,
  Card,
  Tooltip,
  Button,
  Table,
  Tag,
  Space,
  Calendar,
  Statistic,
} from "antd";

const { Search } = Input;
const { Meta } = Card;

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state.studentName;
  const { id } = useParams();
  const window_width = window.innerWidth;
  const formatter = (value) => <CountUp end={value} separator="," />;

  const onSearch = (value) => console.log(value);
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const onClick = (e) => {
    console.log("click ", e);
    if (e.key === "3") {
      navigate(`/${id}/notes`);
    }
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      "",
      "grp",
      null,
      [
        getItem("Dashboard", "1"),
        getItem("My Courses", "2"),
        getItem("My Notes", "3"),
        getItem("Analysis", "4"),
        getItem("Community", "5"),
        getItem("Settings", "6"),
      ],
      "group"
    ),
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="HomePage">
      <Row id="home-grid">
        <Col
          span={5}
          id="col1"
          style={{
            borderRightStyle: "solid",
            borderRadius: 20,
            borderColor: "#d3d3d3 ",
            borderWidth: 2,
          }}
        >
          <h1 id="heading">Student Portal</h1>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ padding: 20 }}
          />
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            style={{ padding: 10 }}
          />
          <Card
            style={{ backgroundColor: "#FFFFFF", padding: 20, margin: 20 }}
            hoverable
            cover={<img src="android_app.png" style={{ maxHeight: 200 }} />}
          >
            <Meta title="Download out App" />
          </Card>
          <div className="menu"></div>
        </Col>
        <Col span={13} id="col2">
          <div className="card-heading">
            <h1 id="heading1">Welcome back! {name}</h1>
            <div className="imageDiv">
              <img src="boy.png" id="image-boy" />
            </div>
          </div>
          <div className="info">
            <div className="assignments">
              <h1>Assignments</h1>
              <Card hoverable id="assignment-card"></Card>
            </div>
            <div className="inbox">
              <h1>Inbox</h1>
              <Card hoverable id="inbox-card"></Card>
            </div>
          </div>
          <div className="timetable">
            <h1 id="heading">Time Table</h1>
            <Table
              columns={columns}
              dataSource={data}
              style={{ overflowX: "scroll" }}
            />
          </div>
        </Col>
        <Col span={6} style={{ padding: 20 }} id="col3">
          <Card id="attendance-info" hoverable>
            <Row gutter={10} id="attendance-stat">
              <Statistic title="Attendance" value={320} formatter={formatter} />
              <Statistic title="Late" value={320} formatter={formatter} />
              <Statistic title="Absent" value={320} formatter={formatter} />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
