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

    const decimalToShow = (x) => {
        let decimalStr = x.toString()
        return x === 0 ? "" : decimalStr.substring(decimalStr.indexOf(".") + 1, decimalStr.length)
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
                        <div className="price" onClick={handleToDetail}>
                            <h1>$ {numberWithDots(itemData.price.amount)}</h1>
                            <p>{decimalToShow(itemData.price.decimals)}</p>
                        </div>
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
