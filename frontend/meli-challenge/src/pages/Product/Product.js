import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Error from "../../components/Error/Error";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Row } from 'react-bootstrap';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import Api from "../../helper/api";
import './Product.sass';

// Vista de detalle de un producto
function Product() {

    // Bandera que define si se esta esperando el resultado del API
    const [fetchingApi, setFetchingApi] = useState(true);

    // Objeto producto obtenido mediante el llamado al API 
    const [item, setItem] = useState(null);

    // Mensaje retornado por el API
    const [apiMessage, setApiMessage] = useState("");

    // Bandera que indica si hubo un error en la consulta del API
    const [apiError, setApiError] = useState(false);

    // Se almacena el valor del ID del producto obtenido desde la URL
    const { id } = useParams();

    // Diccionario para traducir el valor de condicion del producto
    const conditionDict = {
        "new": "Nuevo"
    }

    useEffect(() => {

        // El metodo encargado de hacer la consulta HTTP al API se define en el handler api
        const api = new Api();

        // Se define la funcion asincrona que realiza el llamada al handler api el cual hace la 
        // consulta del detalle de un item por su ID
        async function fetchMyAPI() {

            // Se reinicia a su valor inicial las variables de estado referentes al llamado del API
            setItem(null)
            setApiMessage("")
            setApiError(false)

            let apiResponse = await api.getItem(id)
            setApiMessage(apiResponse.message)
            setFetchingApi(false)

            if (apiResponse.statusCode === 200) {
                setItem(apiResponse.response.item)
            } else {
                setApiError(true)
            }
        }

        // Scroll hacia 0, 0
        window.scrollTo(0, 0)

        // Se hace el llamado de la funcion asincrona para el llamado del API definida previamente 
        fetchMyAPI();
    }, [id]);

    // Metodo que recibe un numero y retorna un string con dicho numero separado por puntos con formato de moneda
    const numberWithDots = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Metodo que recibe un valor en decimal y retorna un string con los numeros despues del punto flotante
    // o un string vacio si el decimal es 0
    const decimalToShow = (x) => {
        let decimalStr = x.toString()
        return x === 0 ? "" : decimalStr.substring(decimalStr.indexOf(".") + 1, decimalStr.length)
    }

    const getSoldText = () => {
        return item.sold_quantity === 1 ? "Vendido" : "Vendidos"
    }

    return (
        <Layout>
            {fetchingApi && <CustomLoader />}
            {(!fetchingApi && apiError) && <Error message={apiMessage} />}
            {(item !== null && !fetchingApi && !apiError) &&
                <>
                    <Breadcrumb categoriesArray={item.category} />
                    <Row>
                        <div className="detail-card">
                            <div className="main-info">
                                <img className="detail-img" src={item.picture} alt="Product"></img>
                                <div className="detail-info">
                                    <p className="small">{`${conditionDict[item.condition]} - ${item.sold_quantity} ${getSoldText()}`}</p>
                                    <h3>{item.title}</h3>
                                    <div className="price">
                                        <h1>$ {numberWithDots(item.price.amount)}</h1>
                                        <p>{decimalToShow(item.price.decimals)}</p>
                                    </div>
                                    <button className="buy-btn">Comprar</button>
                                </div>
                            </div>
                            <div className="detail-description">
                                <h1>Descripción del producto</h1>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </Row>
                </>
            }
        </Layout>
    );
}

export default Product;