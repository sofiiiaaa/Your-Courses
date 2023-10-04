import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {FaLinkedin, FaGithub, FaEnvelope} from 'react-icons/fa';


const FooterApp: React.FC = () => {
    return (
        <Container fluid className="footer">
            <Row>
                <Col className="text-center py-3">
                    Gabriele Ghisleni
                    <div>

                        <a className="footer-icons" href="https://www.linkedin.com/in/gabriele-ghisleni-bb553a199/">
                            <FaLinkedin/>
                        </a>
                        <a className="footer-icons" href="https://github.com/GabrieleGhisleni">
                            <FaGithub/>
                        </a>
                        <a className="footer-icons" href="mailto:gabriele.ghisleni01@gmail.com">
                            <FaEnvelope/>
                        </a>
                    </div>

                </Col>
                <Col className="text-center py-3">
                    Sofia Riggi
                    <div>

                        <a className="footer-icons" href="https://www.linkedin.com/in/sofia-riggi/">
                            <FaLinkedin/>
                        </a>
                        <a className="footer-icons" href="https://github.com/sofiiiaaa">
                            <FaGithub/>
                        </a>
                        <a className="footer-icons" href="mailto:sofiariggi4@gmail.com">
                            <FaEnvelope/>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FooterApp;
