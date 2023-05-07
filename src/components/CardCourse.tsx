import React from "react";
import { Course } from "../allCourses/listCourses";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';

interface CardCourseProps {
  course: Course;
}

{/* <CardCourse course={course} /> */}

const CardCourse: React.FC<CardCourseProps> = ({course}) => {
  console.log(`Link to: course/${encodeURIComponent(course.category)}/${encodeURIComponent(course.course)}`);
  return (
      <Link to={`/course/${course.category}/${course.course.toLocaleLowerCase()}`} className="nav-link">
        <Card className="single-card-course" style={{ width: '18rem' }}>
          <Row>
            <Col xs="3" className="image-course-card">
              <Card.Img variant="top" src={course.image} />
            </Col>
            <Col xs="9">
              <Card.Body>
                <Card.Title>{course.course}</Card.Title>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Link>
  );
};

export default CardCourse;