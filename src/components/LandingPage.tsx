import React from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const LandingPage: React.FC = () => {
  return (
    <Card>
      <Card.ImgOverlay>
        <Card.Title className="landing-page-title">
          Your free courses
        </Card.Title>

        {/* <div className="option-block"> */}
          <Row className="option-block">
            <Col xs={12} md={3} lg={2} className="cardCategory">
              <Link to="framework" className={"nav-link"}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    className="landing-page-option-images"
                    src="./images/framework_2.jpg"
                  />
                  <Card.Body>
                    <Card.Title className="option-card-title">
                      Framework
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col xs={12} md={3} lg={2} className="cardCategory">
              <Link to="devOPS" className={"nav-link"}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    className="landing-page-option-images"
                    src="https://img.freepik.com/free-vector/programmers-concept-with-flat-design_23-2147856686.jpg?w=2000"
                  />
                  <Card.Body>
                    <Card.Title className="option-card-title">
                      DevOps
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col xs={12} md={3} lg={2} className="cardCategory">
              <Link to="databases" className={"nav-link"}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    className="landing-page-option-images"
                    src="./images/databases_2.webp"
                  />
                  <Card.Body>
                    <Card.Title className="option-card-title">
                      Databases
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          {/* </Row>

          <Row className="option-block"> */}
            <Col xs={12} md={3} lg={2} className="cardCategory">
              <Link to="machine-learning" className={"nav-link"}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    className="landing-page-option-images"
                    src="./images/mashine_learning_2.webp"
                  />
                  <Card.Body>
                    <Card.Title className="option-card-title">
                      Machine Learning
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col xs={12} md={3} lg={2} className="cardCategory">
              <Link to="generals" className={"nav-link"}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    className="landing-page-option-images"
                    src="./images/generals_2.jpg"
                  />
                  <Card.Body>
                    <Card.Title className="option-card-title">
                      Generals
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        {/* </div> */}
      </Card.ImgOverlay>
    </Card>
  );
};

export default LandingPage;
