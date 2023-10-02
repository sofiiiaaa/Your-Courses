import React from "react";
import {Container, Row} from "react-bootstrap";
import CategoriesCard from "./CategoriesCard";
import {CourseCategory} from "../App";

interface HomePageProps {
    categories: CourseCategory[];
}

const HomePage: React.FC<HomePageProps> = ({categories}) => {
    return (
        <React.Fragment>
            <Container fluid className="main-container">
                <Row className="align-items-center pt-5 justify-content-center">
                    <div>rows {{categories}}</div>
                    {categories.map((category) =>
                        <CategoriesCard category={category} key={category.id}/>)
                    }
                </Row>
            </Container>
        </React.Fragment>
    )
}


export default HomePage;
