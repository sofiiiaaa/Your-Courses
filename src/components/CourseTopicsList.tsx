import React from "react";

import {Container, Row} from "react-bootstrap";
import SingleCardCourse from "./SingleCardCourse";
import {Course} from "../App";


interface ListCoursesProps {
    course: Course;
}


const CourseTopicsList: React.FC<ListCoursesProps> = ({course}) => {
    return (
        <React.Fragment>
            <Container fluid className="main-container">
                <Row className="justify-content-center pt-5 align-items-center">
                    {course.topics.map((topic) =>
                        <SingleCardCourse
                            course={topic}
                            key={topic.name + topic.id}
                        />
                    )}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default CourseTopicsList;
