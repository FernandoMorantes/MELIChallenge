import React from "react";
import freeShipping from '../../assets/icons/ic_shipping.png';
import { useNavigate } from 'react-router-dom';
import './ProductsListCard.sass';

function ProductsListCard(props) {
    const navigate = useNavigate();
    const itemData = props.itemData

    const numberWithDots = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleToDetail = () => {
        navigate(`/items/${itemData.id}`);
    }

    return (
        <div className="product-card">
            <div className="product-content">
                <img onClick={handleToDetail} className="product-img" src={itemData.picture} alt="Product"></img>
                <div className="product-info">
                    <div className="product-title">
                        <h1 onClick={handleToDetail}>$ {numberWithDots(itemData.price.amount)}</h1>
                        {itemData.free_shipping &&
                            <img className="free-shipping" src={freeShipping} alt="Free Shipping"></img>
                        }
                    </div>
                    <p onClick={handleToDetail}>{itemData.title}</p>
                    <p className="small">{itemData.address}</p>
                </div>
                <div className="product-location">
                    <p>{itemData.address}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductsListCard;
