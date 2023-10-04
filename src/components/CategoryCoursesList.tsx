import React from "react";
import SingleCardCourse from "./SingleCardCourse";
import {CourseCategory} from "../App";
import {Container, Row} from "react-bootstrap";


interface ListCoursesProps {
    category: CourseCategory;
}


const CategoryCoursesList: React.FC<ListCoursesProps> = ({category}) => {
    return (
        <React.Fragment>
            <Container fluid className="main-container">
                <Row className="justify-content-center pt-5 align-items-center">
                    {category.courses.map((singleCourse) =>
                        <SingleCardCourse
                            course={singleCourse}
                            key={category.name + singleCourse.id}
                        />
                    )}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default CategoryCoursesList;
