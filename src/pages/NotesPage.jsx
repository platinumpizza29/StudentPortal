import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContentState, Editor, EditorState, convertFromRaw } from "draft-js";
import "./NotesPage.css";
import date from "date-and-time";
import axios from "axios";
import { animated, useSpring } from "@react-spring/web";

import { Row, Col, Button, Card, Modal, Input } from "antd";
import {
  AlignLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { CaretRightFilled } from "@ant-design/icons";

export default function NotesPage() {
  const [subjects, setSubjects] = useState([]);
  const [subjectNotes, setSubjectNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [notesTitle, setNotesTitle] = useState("");
  const [notesContent, setNotesContent] = useState("");
  const [getSelectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { id } = useParams();
  const { Meta } = Card;
  var sub;

  const now = new Date();
  const currentDate = date.format(now, "YYYY-MM-DD").toString();
  const formData = {
    title: notesTitle,
    content: notesContent,
    date: currentDate,
  };
  const props = useSpring({ opacity: isVisible ? 1 : 0 });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log(currentDate);
    var uri = `https://studentportalspringboot-production.up.railway.app/student/addnewnotes?Id=${id}&subjects=${getSelectedSubject}`;
    var response = await axios({
      method: "POST",
      url: uri,
      data: formData,
    });
    if (response.status === 200) {
      setIsModalOpen(false);
      getSubjectNotes(getSelectedSubject);
    } else {
      setConfirmLoading(true);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function MyEditor() {
    const [editorState, setEditorState] = React.useState(() =>
      EditorState.createWithContent(
        ContentState.createFromText(selectedContent)
      )
    );
    return <Editor editorState={editorState} onChange={setEditorState} />;
  }

  const getsubjects = async () => {
    let uri = `https://studentportalspringboot-production.up.railway.app/student/getsubjects?Id=${id}`;
    var response = await axios.get(uri);
    var data = response.data;
    console.log(data);
    setSubjects(data);
  };

  const getSubjectNotes = async (subject) => {
    setSelectedSubject(subject);
    let uri = `https://studentportalspringboot-production.up.railway.app/student/getnotesbysubject?Id=${id}&subjects=${subject}`;
    var response = await axios.get(uri);
    var data1 = response.data;
    if (response.status === 200) {
      setSubjectNotes(data1);
      setIsVisible(!isVisible);
    }
    console.log(data1);
    sub = subject;
    console.log(sub);
  };

  useEffect(() => {
    getsubjects();
  }, []);

  const handleChapter = (content, title) => {
    setSelectedChapter(title);
    setSelectedContent(content);
  };

  return (
    <div className="NotesPage">
      <Row id="notes-columns">
        <Col
          span={5}
          id="notes-col1"
          style={{
            borderRightStyle: "solid",
            borderColor: "#d3d3d3 ",
            borderWidth: 2,
          }}
        >
          <div className="heading">
            <h1>Subjects</h1>
          </div>
          <div className="note-options">
            <Button type="primary" block onClick={showModal}>
              Create a new note
            </Button>
            <Modal
              title="New Note"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
            >
              <Input
                type="text"
                placeholder="Title"
                style={{ padding: 10, marginBottom: 20 }}
                prefix={<EditOutlined />}
                onChange={(e) => setNotesTitle(e.target.value)}
              />
              <Input
                type="content"
                placeholder="content"
                style={{ padding: 10, marginBottom: 20 }}
                prefix={<AlignLeftOutlined />}
                onChange={(e) => setNotesContent(e.target.value)}
              />
            </Modal>
          </div>
          <div className="subjects">
            {subjects.map((subject, index) => {
              return (
                <Card
                  key={index}
                  id="subject-cards"
                  hoverable
                  extra={<CaretRightFilled />}
                  onClick={() => getSubjectNotes(subject)}
                >
                  <p>{subject}</p>
                </Card>
              );
            })}
          </div>
        </Col>
        <Col
          span={5}
          id="notes-col2"
          style={{
            borderRightStyle: "solid",
            borderColor: "#d3d3d3 ",
            borderWidth: 2,
          }}
        >
          <animated.div style={props}>
            <div className="heading">
              <h1>Notes</h1>
            </div>
            {subjectNotes != null ? (
              subjectNotes.map((note, index) => {
                return (
                  <Card
                    key={index}
                    id="note-card-content"
                    hoverable
                    onClick={() => handleChapter(note.content, note.title)}
                    actions={[
                      <Button shape="circle" id="deleteButton">
                        <DeleteOutlined />
                      </Button>,
                    ]}
                  >
                    <Meta title={note.title} />
                  </Card>
                );
              })
            ) : (
              <h1>please select a subject</h1>
            )}
          </animated.div>
        </Col>
        <Col span={14} id="notes-col3">
          {selectedChapter != "" ? (
            <Card id="editor-card">
              <div className="editor-card-header">
                <Meta title={selectedChapter} />
                <Button type="primary">Save</Button>
              </div>
              <div className="editor">
                <MyEditor></MyEditor>
              </div>
            </Card>
          ) : (
            <h1>Please select chapter</h1>
          )}
        </Col>
      </Row>
    </div>
  );
}
