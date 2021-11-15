import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/icons/Logo_ML@2x.png';
import searchIcon from '../../assets/icons/ic_Search.png';
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import useWindowSize from "../CustomHooks/useWindowSize";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchBar.sass';

function SearchBar(props) {
    const windowWidth = useWindowSize()[0];
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState("");
    const [inputValue, setInputValue] = useState('');
    const [pageOffset, setPageOffset] = useState(1);
    const [openAutocomplete, setOpenAutocomplete] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        if (searchParams.get('search') !== undefined && searchParams.get('search') !== null && searchParams.get('search') !== "") {
            setValue(searchParams.get('search').trim())
            setInputValue(searchParams.get('search').trim())
        }

        // localStorage.removeItem("searchHistory")
        let storedSearchHistory = localStorage.getItem('searchHistory') || []
        if (storedSearchHistory === null && !Array.isArray(storedSearchHistory)) storedSearchHistory = []
        else if (storedSearchHistory.length > 0) storedSearchHistory = storedSearchHistory.split(",")
        setSearchHistory(storedSearchHistory)

        if (windowWidth >= 1400) {
            setPageOffset(2)
        } else {
            setPageOffset(1)
        }

    }, [searchParams, windowWidth]);

    const handleSubmit = (evt, newValue) => {
        evt.preventDefault();
        let searchValue;

        if (newValue !== undefined) searchValue = newValue;
        else if (inputValue !== "") searchValue = inputValue;

        if (searchValue !== undefined) {
            setOpenAutocomplete(false)
            props.handleSearch(searchValue);
            updateSearchHistory(searchValue);
        }
    }

    const updateSearchHistory = (newEntry) => {
        let newSearchHistory = searchHistory

        let duplicate = newSearchHistory.find(el => el.toLowerCase() === newEntry.toLowerCase())

        if(duplicate !== undefined){
            newSearchHistory.splice(newSearchHistory.indexOf(duplicate), 1)
        }
        
        newSearchHistory.unshift(newEntry)

        if (newSearchHistory.length > 9) {
            newSearchHistory.pop();
        }

        setSearchHistory(newSearchHistory);
        localStorage.setItem('searchHistory', newSearchHistory);
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
                                    <Autocomplete
                                        open={openAutocomplete}
                                        value={value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                            if (newValue !== null) {
                                                setInputValue(newValue);
                                                handleSubmit(event, newValue);
                                            }
                                        }}
                                        onClose={() => setOpenAutocomplete(false)}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {setInputValue(newInputValue); setOpenAutocomplete(true)}}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={searchHistory}
                                        sx={{ width: 'calc(100% - 38px)' }}
                                        renderInput={(params) => <TextField {...params} placeholder="Nunca dejes de buscar" />}
                                    />
                                    <button className="search-btn" onClick={handleSubmit}>
                                        <img src={searchIcon} alt="search"></img>
                                    </button>
                                </form>


                                {/* <form className="search-form" onSubmit={handleSubmit}>
                                    <input className="search-input" type="text" placeholder="Nunca dejes de buscar"
                                        value={searchValue}
                                        onChange={e => setSearchValue(e.target.value)} />
                                    <button className="search-btn" type="submit">
                                        <img src={searchIcon} alt="search"></img>
                                    </button>
                                </form> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SearchBar;