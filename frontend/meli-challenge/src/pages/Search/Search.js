import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductsListCard from "../../components/ProductsListCard/ProductsListCard"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import Loader from "react-loader-spinner";
import Api from "../../helper/api";
import './Search.sass';

function Search() {
    const [searchParams] = useSearchParams();
    const [fetchingApi, setFetchingApi] = useState(true);
    const [items, setItems] = useState([]);
    const [apiMessage, setApiMessage] = useState([]);

    useEffect(() => {
        const api = new Api();
        async function fetchMyAPI() {
            setItems([])
            setApiMessage("")
            setFetchingApi(true)

            let apiResponse = await api.searchItems({ q: searchParams.get('search') })
            setFetchingApi(false)

            if (apiResponse.statusCode === 200) {
                setApiMessage(apiResponse.apiMessage)
                setItems(apiResponse.response.items)
            }
        }

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        fetchMyAPI();
    }, [searchParams]);

    const itemsList = ()=> {
        let itemsList = []
        items.forEach(item => {
            itemsList.push(<ProductsListCard key={item.id} itemData={item}></ProductsListCard>)
        });

        return <Row className="items-list">{itemsList}</Row>
    }

    return (
        <Layout>
            <div className="main">
                <Container fluid>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <Breadcrumb breadcrumb="Electónica, Audio y video  >  iPod  >  Reproductores  >  iPod touch  >  32GB" />
                            {fetchingApi &&
                                <div className="full-width-centered">
                                    <Loader type="TailSpin" color="#00BFFF" height={160} width={160} />
                                </div>
                            }
                            {itemsList()}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
}

export default Search;