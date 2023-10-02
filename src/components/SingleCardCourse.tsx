import React from "react";
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import {Course} from "../App";

interface CardCourseProps {
    course: Course;
}


const SingleCardCourse: React.FC<CardCourseProps> = ({course}) => {
    return (
        <Col md={3}>
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
