import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const StickyHomeButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 0){
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className={`sticky-home-button ${isVisible ? "visible" : ""}`}>
            <Link to={`/`}>
                <Button variant="primary" size="lg" className={"sticky-home-btn"}>
                    <FontAwesomeIcon icon={faHome}/>
                </Button>
            </Link>
        </div>
    );
};

export default StickyHomeButton;
