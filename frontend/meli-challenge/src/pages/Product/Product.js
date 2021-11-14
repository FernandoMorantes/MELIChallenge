import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Row } from 'react-bootstrap';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import Api from "../../helper/api";
import Loader from "react-loader-spinner";
import './Product.sass';

function Product() {
    const [fetchingApi, setFetchingApi] = useState(true);
    const [item, setItem] = useState(null);
    const { id } = useParams();

    const conditionDict = {
        "new": "Nuevo"
    }

    useEffect(() => {
        const api = new Api();
        async function fetchMyAPI() {
            setItem(null)

            let apiResponse = await api.getItem(id)
            setFetchingApi(false)

            if (apiResponse.statusCode === 200) {
                setItem(apiResponse.response.item)
            }
        }

        window.scrollTo(0, 0)

        fetchMyAPI();
    }, [id]);

    const numberWithDots = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const getSoldText = () => {
        return item.sold_quantity === 1 ? "Vendido" : "Vendidos"
    }

    return (
        <Layout>
            <Breadcrumb breadcrumb="Electónica, Audio y video  >  iPod  >  Reproductores  >  iPod touch  >  32GB" />
            {fetchingApi &&
                <div className="full-width-centered">
                    <Loader type="TailSpin" color="#00BFFF" height={180} width={180} />
                </div>
            }
            {item !== null &&
                <Row>
                    <div className="detail-card">
                        <div className="main-info">
                            <img className="detail-img" src={item.picture} alt="Product"></img>
                            <div className="detail-info">
                                <p className="small">{`${conditionDict[item.condition]} - ${item.sold_quantity} ${getSoldText()}`}</p>
                                <h3>{item.title}</h3>
                                <h1>$ {numberWithDots(item.price.amount)}</h1>
                                <button className="buy-btn">Comprar</button>
                            </div>
                        </div>
                        <div className="detail-description">
                            <h1>Descripción del producto</h1>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </Row>
            }
        </Layout>
    );
}

export default Product;