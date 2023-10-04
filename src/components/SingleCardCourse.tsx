import React from "react";
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import {Course, Topic} from "../App";

interface CardCourseProps {
    course: Course | Topic;
}


const SingleCardCourse: React.FC<CardCourseProps> = ({course}) => {
    return (
        <Col xs={12} md={3} lg={2} className="mb-4 card-category">
            <Link to={course.name.toLowerCase()} className="nav-link">
                <Card className="single-card-course">
                    <div className="image-course-card">
                        <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/${course.image}`}/>
                    </div>
                    <Card.Body>
                        <Card.Title>{course.name}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
};

export default SingleCardCourse;
