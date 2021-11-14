import React, { useState, useEffect } from "react";
import { Row } from 'react-bootstrap';
import './Breadcrumb.sass';

function Breadcrumb(props) {
    const [breadcrumb, setBreadcrumb] = useState(props.breadcrumb);

    useEffect(() => {
        setBreadcrumb(props.breadcrumb)
    }, [props.breadcrumb]);

    return (
        <Row style={{ padding: 0 }}>
            <p className="breadcrumb">{breadcrumb}</p>
        </Row>
    );
};

export default Breadcrumb;
