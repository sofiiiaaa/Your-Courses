import React from "react";
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
import {CourseCategory} from "../App";

interface CardCourseProps {
    category: CourseCategory;
}


const CategoriesCard: React.FC<CardCourseProps> = ({category}) => {
    return (
        <Col xs={12} md={3} lg={2} className="mb-4 card-category">
            <Link to={category.name} className={"nav-link"}>
                <Card>
                    <Card.Img
                        variant="top"
                        className="landing-page-option-images"
                        src={category.image}
                    />
                    <Card.Body>
                        <Card.Title className="option-card-title">
                            {category.name}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

export default CategoriesCard;
