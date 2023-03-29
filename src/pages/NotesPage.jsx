import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editor, EditorState } from "draft-js";
import "./NotesPage.css";

import { Row, Col, Button, Card, Descriptions } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import axios from "axios";

export default function NotesPage() {
  const [subjects, setSubjects] = useState([]);
  const [subjectNotes, setSubjectNotes] = useState([]);
  const { email } = useParams();

  function MyEditor() {
    const [editorState, setEditorState] = React.useState(() =>
      EditorState.createEmpty()
    );

    return <Editor editorState={editorState} onChange={setEditorState} />;
  }

  const getsubjects = async () => {
    let uri = `https://3c14-49-36-48-153.in.ngrok.io/student/getsubjects?Id=${email}`;
    var response = await axios.get(uri);
    var data = response.data;
    console.log(data);
    setSubjects(data);
  };

  const getSubjectNotes = async (subject) => {
    let uri = `https://3c14-49-36-48-153.in.ngrok.io/student/getnotesbysubject?Id=${email}&subjects=${subject}`;
    var response = await axios.get(uri);
    var data1 = response.data;
    if (response.status === 200) {
      setSubjectNotes(data1);
    }
    console.log(data1);
  };

  useEffect(() => {
    getsubjects();
  }, []);

  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <div className="NotesPage">
      <Row id="notes-columns">
        <Col span={5} id="notes-col1">
          <div className="heading">
            <h1>Notes</h1>
          </div>
          <div className="note-options">
            <Button type="primary" block>
              Create a new note
            </Button>
          </div>
          <div className="subjects">
            {subjects.map((subject, index) => {
              return (
                <Card
                  key={index}
                  id="subject-cards"
                  hoverable
                  prefix={<CaretRightFilled />}
                  onClick={() => getSubjectNotes(subject)}
                >
                  <p>{subject}</p>
                </Card>
              );
            })}
          </div>
        </Col>
        <Col span={19} id="col2">
          {subjectNotes.map((note, index) => {
            return (
              <Card title={note.title} key={index} id="note-card-content">
                <p>{note.content}</p>
                {/* <textarea id="text-area"></textarea> */}
                <MyEditor />
              </Card>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
