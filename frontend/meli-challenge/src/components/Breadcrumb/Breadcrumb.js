import React, { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import Api from "../../helper/api";
import './Breadcrumb.sass';

function Breadcrumb(props) {
    const [breadcrumb, setBreadcrumb] = useState("");

    useEffect(() => {
        const api = new Api();
        async function fetchMyAPI() {

            let apiResponse = await api.getBreadcrumb({ categories: props.categoriesArray })

            if (apiResponse.statusCode === 200 && apiResponse.response !== undefined && apiResponse.response.length > 0) {
                let buildedBreadcrumb = [];

                apiResponse.response.forEach((category, index) => {
                    buildedBreadcrumb.push(<span key={index}><p className="breadcrumb">{category}</p>{index !== apiResponse.response.length - 1 && <p className="breadcrumb"> {'>'} </p>}</span>)
                })
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
