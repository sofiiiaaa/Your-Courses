import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
// import { read } from "to-vfile";
// import { remark } from "remark";
// import remarkToc from "remark-toc";

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

  // async function main() {
  //   const file = await remark()
  //     .use(remarkToc)
  //     .process(await read("example.md"));

  //   console.log(String(file));
  // }

  return (
    <Container style={{ backgroundColor: "white" }}>
      <Row>
        <Col className="markdown-text">
          {" "}
          <span>You have selected the category </span>
          <b>{category}</b> <span>and the specific course </span>
          <b>{courseName}</b>
        </Col>
      </Row>
      <Row>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Row>
    </Container>
  );
};

export default SingleDetailCourse;
