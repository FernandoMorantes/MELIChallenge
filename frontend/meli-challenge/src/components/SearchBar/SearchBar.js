import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/icons/Logo_ML@2x.png';
import searchIcon from '../../assets/icons/ic_Search.png';
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import useWindowSize from "../CustomHooks/useWindowSize";
import './SearchBar.sass';

function SearchBar(props) {
    const windowWidth = useWindowSize()[0];
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState("");
    const [pageOffset, setPageOffset] = useState(1);

    useEffect(() => {
        if (searchParams.get('search') !== undefined && searchParams.get('search') !== null && searchParams.get('search') !== ""){
            setSearchValue(searchParams.get('search').trim())
        }

        if (windowWidth >= 1400) {
            setPageOffset(2)
        } else {
            setPageOffset(1)
        }

    }, [searchParams, windowWidth]);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (searchValue !== "") {
            props.handleSearch(searchValue)
        }
    }

    const handleToMainPage = (evt) => {
        navigate('/');
    }

    return (
        <>
            <Container fluid>
                <Row className="navbar">
                    <Col md={{ span: 12 - (pageOffset * 2), offset: pageOffset }}>
                        <Row>
                            <Col className="center-v" lg={1}>
                                <img className="logo" src={logo} alt="MELI Logo" onClick={handleToMainPage}></img>
                            </Col>
                            <Col className="center-v" lg={11}>
                                <form className="search-form" onSubmit={handleSubmit}>
                                    <input className="search-input" type="text" placeholder="Nunca dejes de buscar"
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)} />
                                    <button className="search-btn" type="submit">
                                        <img src={searchIcon} alt="search"></img>
                                    </button>
                                </form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SearchBar;