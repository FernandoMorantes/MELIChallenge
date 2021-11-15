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

function Search() {
    const [searchParams] = useSearchParams();
    const [fetchingApi, setFetchingApi] = useState(true);
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [apiMessage, setApiMessage] = useState("");
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        const api = new Api();
        async function fetchMyAPI() {
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

        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }

        fetchMyAPI();
    }, [searchParams]);

    const itemsList = () => {
        let itemsList = []
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