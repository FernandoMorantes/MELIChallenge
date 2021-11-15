import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Error from "../../components/Error/Error";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Row } from 'react-bootstrap';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import Api from "../../helper/api";
import './Product.sass';

function Product() {
    const [fetchingApi, setFetchingApi] = useState(true);
    const [item, setItem] = useState(null);
    const [apiMessage, setApiMessage] = useState("");
    const [apiError, setApiError] = useState(false);
    const { id } = useParams();

    const conditionDict = {
        "new": "Nuevo"
    }

    useEffect(() => {
        const api = new Api();
        async function fetchMyAPI() {
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

        window.scrollTo(0, 0)

        fetchMyAPI();
    }, [id]);

    const numberWithDots = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

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