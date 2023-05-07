import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const SingleDetailCourse: React.FC = () => {
  const { category, courseName } = useParams();
  console.log(category, courseName);

  const [markdown, setMarkdown] = useState("");

    useEffect(() => {
    async function fetchMarkdown() {
      const response = await fetch(`/allMarkdownCourses/${courseName}.md`);
      const text = await response.text();
      setMarkdown(text);
    }

    fetchMarkdown();
  }, []);

  return (
    <Container style={{backgroundColor:"white"}}>
      <Row className="markdown-text">
        <Col>
          {" "}
          <span>You have selected the category </span>
          <b>{category}</b> <span>and the specific course </span>
          <b>{courseName}</b>
        </Col>
      </Row>
      <Row className="markdown-text">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Row>
    </Container>
  );
};

export default SingleDetailCourse;
