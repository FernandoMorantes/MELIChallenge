import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/icons/Logo_ML@2x.png';
import searchIcon from '../../assets/icons/ic_Search.png';
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import useWindowSize from "../CustomHooks/useWindowSize";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import './SearchBar.sass';

// Se define la barra de busqueda como un text input con funciones de autocompletado 
// basado en un historial de busquedas local almacenado en local storage

function SearchBar(props) {

    // Se define mediante el custom hook de useWindowSize el ancho de la pantalla 
    // el cual es utilizado para calcular el ancho del contenido de la barra de busqueda
    const windowWidth = useWindowSize()[0];

    // Variable de estado que define el gap horizontal del contenido
    const [pageOffset, setPageOffset] = useState(1);

    // Se define la variable navigate que permite la navegacion hacia la vista de resultados de la busqueda
    const navigate = useNavigate();

    // Variable que permite obtener los parametros recibidos como queryString en la URL actual
    const [searchParams] = useSearchParams();

    // Valor seleccionado en la lista desplegable del componente de autocomplete
    const [value, setValue] = useState("");

    // Valor del text input del componente de autocomplete
    const [inputValue, setInputValue] = useState('');

    // Variable de control para desplegar la lista de opciones del autocompletado
    const [openAutocomplete, setOpenAutocomplete] = useState(false);

    // Variable que controla el historial de busquedas local
    const [searchHistory, setSearchHistory] = useState([]);

    // Se definen el metodo y el valor para limitar la cantidad de sugerencias que muestra el autocompletar
    const OPTIONS_LIMIT = 9;
    const defaultFilterOptions = createFilterOptions();

    useEffect(() => {
        // Se obtiene el valor de la busqueda recibido en la URL y se coloca como valor de la barra de busqueda
        if (searchParams.get('search') !== undefined && searchParams.get('search') !== null && searchParams.get('search') !== "") {
            setValue(searchParams.get('search').trim())
            setInputValue(searchParams.get('search').trim())
        }

        // Se obtiene el historial de busquedas del usuario desde local storage
        let storedSearchHistory = localStorage.getItem('searchHistory') || []

        // Se verifica si el historial obtenido es nulo (si existe)
        if (storedSearchHistory === null) storedSearchHistory = []
        else if (storedSearchHistory.length > 0) storedSearchHistory = storedSearchHistory.split(",")
        setSearchHistory(storedSearchHistory)

        // Si el ancho de la pagina es mayor o igual a 1400px se define un gap mayor a los laterales del contenido de la barra de busqueda
        if (windowWidth >= 1400) {
            setPageOffset(2)
        } else {
            setPageOffset(1)
        }

    }, [searchParams, windowWidth]);

    // funcion que toma el valor del input o del valor selaccionado del componente de autocompletado y
    // navega hacia la vista de resultados de busqueda con el valor de busqueda definido
    const handleSubmit = (evt, newValue) => {
        evt.preventDefault();
        let searchValue;

        if (newValue !== undefined) searchValue = newValue;
        else if (inputValue !== "") searchValue = inputValue;

        if (searchValue !== undefined) {
            setOpenAutocomplete(false)
            updateSearchHistory(searchValue);
            navigate(`/items?search=${searchValue}`);
        }
    }

    // Funcion que actualiza el historial de busquedas del usuario
    const updateSearchHistory = (newEntry) => {
        let newSearchHistory = searchHistory

        // se determina si el nuevo elemento de busqueda ya existia en el historial 
        let duplicate = newSearchHistory.find(el => el.toLowerCase().trim() === newEntry.toLowerCase().trim())

        // Si existe duplicidad elimina el elemento duplicado en el historial
        if (duplicate !== undefined) {
            newSearchHistory.splice(newSearchHistory.indexOf(duplicate), 1)
        }

        // Añade el nuevo elemento de busqueda al inicio del arreglo de busqueda
        newSearchHistory.unshift(newEntry)

        // Se actualiza el historial de busqueda tanto en el estado del componente como en local storage
        setSearchHistory(newSearchHistory);
        localStorage.setItem('searchHistory', newSearchHistory);
    }

    const filterOptions = (options, state) => {
        return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
    };

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
                                        openOnFocus={false}
                                        filterOptions={filterOptions}
                                        open={openAutocomplete}
                                        value={value}
                                        getOptionSelected={(option, value) => option === value}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                            if (newValue !== null) {
                                                setInputValue(newValue);
                                                handleSubmit(event, newValue);
                                            }
                                        }}
                                        onOpen={() => setOpenAutocomplete(true)}
                                        onClose={() => setOpenAutocomplete(false)}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => { setInputValue(newInputValue); setOpenAutocomplete(true) }}
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
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default SearchBar;