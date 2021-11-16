import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Error from "../../components/Error/Error";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ProductsListCard from "../../components/ProductsListCard/ProductsListCard"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Api from "../../helper/api";
import './Search.sass';

// Vista de resultados de la busqueda
function Search() {

    // Variable que permite obtener los parametros recibidos como queryString en la URL actual
    const [searchParams] = useSearchParams();

    // Bandera que define si se esta esperando el resultado del API
    const [fetchingApi, setFetchingApi] = useState(true);

    // Resultado de la busqueda retornado por el API
    const [items, setItems] = useState([]);

    // Array con las categorias de los productos retornados por la busqueda
    const [categories, setCategories] = useState([]);

    // Mensaje retornado por el API
    const [apiMessage, setApiMessage] = useState("");

    // Bandera que indica si hubo un error en la consulta del API
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        // El metodo encargado de hacer la consulta HTTP al API se define en el handler api
        const api = new Api();

        // Se define la funcion asincrona que realiza el llamada al handler api el cual hace la 
        // consulta de busqueda de items
        async function fetchMyAPI() {

            // Se reinicia a su valor inicial las variables de estado referentes al llamado del API
            setItems([])
            setFetchingApi(true)
            setApiMessage("")
            setApiError(false)

            let apiResponse = await api.searchItems({ q: searchParams.get('search') })
            setApiMessage(apiResponse.message)

            if (apiResponse.statusCode === 200) {
                setItems(apiResponse.response.items)
                setCategories(apiResponse.response.categories)
            } else {
                setApiError(true)
            }
            
            setFetchingApi(false)
        }

        // Scroll hacia 0, 0
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        // Se hace el llamado de la funcion asincrona para el llamado del API definida previamente 
        fetchMyAPI();
    }, [searchParams]);

    // Se crea una funcion la cual retorna un subcomponente con la lista de tarjetas de producto por 
    // cada uno de los items obtenidos en el resultado de la busqueda
    const itemsList = () => {
        let itemsList = []

        // Los componentes que renderizan la informacion de cada producto de la vista de resultados de busqueda se definen en un archivo aparte
        items.forEach(item => {
            itemsList.push(<ProductsListCard key={item.id} itemData={item}></ProductsListCard>)
        });

        return <Row className="items-list">{itemsList}</Row>
    }

    return (
        <Layout>
            {fetchingApi && <CustomLoader />}
            {(!fetchingApi && apiError) && <Error message={apiMessage} />}
            {(!fetchingApi && !apiError) &&
                <>
                    <Breadcrumb categoriesArray={categories} />
                    {itemsList()}
                </>
            }
        </Layout>
    );
}

export default Search;