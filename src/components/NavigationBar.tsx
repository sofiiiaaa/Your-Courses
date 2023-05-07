import React from "react";
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { Link } from "react-router-dom";



const NavigationBar: React.FC = () => {

  let myProp: string; 
  
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="framework" className={"nav-link"}>Framework</Link>
            <Link to="databases" className={"nav-link"}>Databases</Link>
            <Link to="machine-learning" className={"nav-link"}>MachineLearning</Link>
            <Link to="generals" className={"nav-link"}>Generals</Link>
            <Link to="devOPS" className={"nav-link"}>DevOps</Link>
            {/* <Link to="list-courses"  className={"nav-link"}>ListCourses</Link> */}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default NavigationBar;