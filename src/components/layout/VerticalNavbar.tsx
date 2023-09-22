import React, {useEffect, useState} from 'react';
import {Nav, Button} from 'react-bootstrap';
import TocIcon from '@mui/icons-material/Toc';
import CloseIcon from '@mui/icons-material/Close';
import parseToc from "../utils/markdownToc";


interface VerticalNavbarProps {
    rawToc: string;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({rawToc}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTop, setIsTop] = useState(true);

    useEffect(() => {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            setIsTop(isTop);
        });
    }, []);


    return (
        <div className={`vertical-navbar ${isOpen ? 'open' : ''}`} style={{top: isTop ? 57 : 0}}>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                aria-controls="responsive-navbar-nav"
                aria-expanded={isOpen}
                className="navbar-toggler"
            >
                <TocIcon/> &nbsp; ToC
            </Button>
            {isOpen && (
                <Nav className="nav-items">
                    <Button onClick={() => setIsOpen(!isOpen)} className="close-btn">
                        <CloseIcon/>
                    </Button>
                    <div className={"vertical-toc"}>
                        {parseToc(rawToc).map((item) => item)}
                    </div>
                </Nav>
            )}
        </div>
    );
};

export default VerticalNavbar;
