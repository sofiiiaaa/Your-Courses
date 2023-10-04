import React from "react";
import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/esm/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';

interface NavigationBarProps {
    categories: string[];
}

const NavigationBar: React.FC<NavigationBarProps> = ({categories}) => {
    let links = categories.map((cat) =>
        <Link to={cat} key={`cat-${cat}`} className={"nav-link"}>{cat}</Link>
    );

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Brand href={`${process.env.PUBLIC_URL}`}>
                    <FontAwesomeIcon icon={faHome}/> &nbsp; | &nbsp;
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        {links}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavigationBar;
