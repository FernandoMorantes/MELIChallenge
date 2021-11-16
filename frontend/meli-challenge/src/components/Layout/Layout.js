import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Container, Row, Col } from 'react-bootstrap';
import useWindowSize from "../../components/CustomHooks/useWindowSize";
import "./Layout.sass"

// Se define el layout general utilizado en todas las vistas de la aplicacion
// Dicho layout se compone de un header con la barra de busqueda y de un contenedor
// principal el cual contiene el contenido de la pagina

function Layout({ children, className }) {

    // Se define mediante el custom hook de useWindowSize el ancho de la pantalla 
    // el cual es utilizado para calcular el ancho del contenido que se ubique dentro del 
    // main definido en el jsx del layout
    const windowWidth = useWindowSize()[0];

    // Variable de estado que define el gap horizontal del contenido
    const [pageOffset, setPageOffset] = useState(1);

    useEffect(() => {
        // Si el ancho de la pagina es mayor o igual a 1400px se define un gap mayor a los laterales del contenido en la pagina
        if (windowWidth >= 1400) {
            setPageOffset(2)
        } else {
            setPageOffset(1)
        }
    }, [windowWidth]);

    return (
        <>
            <header>
                <SearchBar />
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
