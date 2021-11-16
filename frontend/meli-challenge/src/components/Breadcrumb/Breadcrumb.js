import React, { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import Api from "../../helper/api";
import './Breadcrumb.sass';

// Componente que renderiza la ruta de navegacion (breadcrumb)
function Breadcrumb(props) {

    // Variable de estado que define el breadcrumb
    const [breadcrumb, setBreadcrumb] = useState(null);

    useEffect(() => {
        // El metodo encargado de hacer la consulta HTTP al API se define en el handler api
        const api = new Api();

        // Se define la funcion asincrona que realiza el llamada al handler api el cual hace la 
        // consulta de la ruta de navegacion con base a un array de categorias
        async function fetchMyAPI() {

            let apiResponse = await api.getBreadcrumb({ categories: props.categoriesArray })

            if (apiResponse.statusCode === 200 && apiResponse.response !== undefined && apiResponse.response.length > 0) {
                let buildedBreadcrumb = [];

                // Se construye el breadcrumb a partir de las categorias 
                apiResponse.response.forEach((category, index) => {
                    buildedBreadcrumb.push(<span key={index}><p className="breadcrumb">{category}</p>{index !== apiResponse.response.length - 1 && <p className="breadcrumb"> {'>'} </p>}</span>)
                });

                setBreadcrumb(buildedBreadcrumb)
            }

        }

        fetchMyAPI();
    }, [props.categoriesArray]);

    return (
        <Row style={{ padding: 0 }}>
            <div className="breadcrumb-wrapper">{breadcrumb}</div>
        </Row>
    );
};

export default Breadcrumb;
