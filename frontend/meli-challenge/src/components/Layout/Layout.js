import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import useWindowSize from "../../components/CustomHooks/useWindowSize";
import "./Layout.sass"

function Layout({ children, className }) {
    const windowWidth = useWindowSize()[0];
    const navigate = useNavigate();
    const [pageOffset, setPageOffset] = useState(1);

    useEffect(() => {
        if (windowWidth >= 1400) {
            setPageOffset(2)
        } else {
            setPageOffset(1)
        }
    }, [windowWidth]);

    const handleSearch = (searchValue) => {
        navigate(`/items?search=${searchValue}`);
    }

    return (
        <>
            <header>
                <SearchBar handleSearch={handleSearch} />
            </header>
            <div className="main">
                <Container fluid>
                    <Row>
                        <Col md={{ span: 12 - (pageOffset * 2), offset: pageOffset }}>
                            <main className={className}>{children}</main>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    );
};

export default Layout;
