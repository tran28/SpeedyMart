import { useParams } from "react-router-dom";
import "./item.css"
import { useEffect, useState } from "react";
import Reviews from "./reviews";

function Item() {
    // M: get the parameter from the URL to call the 'get single product by ID' (API)
    const params = useParams();
    const productId = params.productId;

    const [single_item, setSingleItem] = useState([]);

    useEffect(() => {
        var axios = require('axios');
        var config = {
            method: 'get',
            url: '/api/products/' + productId,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then(function (response) {
                setSingleItem(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [productId]);

    function handleSubtract() {
        if (parseInt(document.getElementById("quantity").value) > 1) {
            document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) - 1;
        }
    }

    function handleAdd() {
        if (parseInt(document.getElementById("quantity").value) < single_item.countInStock) {
            document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) + 1;
        }
    }

    return (
        <>
            <div className="main">
                <div className="main-container">
                    <div className="boxes">
                        <div className="box">
                            <div className="item-left">
                                <div className="item-image">
                                    <img src={single_item.image} className="image" alt=""></img>
                                </div>
                            </div>
                            <div className="item-right">
                                <div className="item-desc">
                                    <h2 className="item-h2">{single_item.name}</h2>
                                    <h3 className="item-h3-stats">Brand: {single_item.brand}</h3>
                                    <h3 className="item-h3-stats">Category: {single_item.category}</h3>
                                    <h3 className="item-h3-stats-price">${single_item.price} ea.</h3>
                                </div>
                                <div className="form-flex">
                                    <div className="slider">
                                        <button className="slider-button" id="subtract-quantity" onClick={handleSubtract}>-</button>
                                        <input className="number-input no-spin" type="number" id="quantity" min="1" max={single_item.countInStock} defaultValue="1" readOnly />
                                        <button className="slider-button" id="add-quantity" onClick={handleAdd}>+</button>
                                        <button className="add-cart-button" id="add-to-cart" type="submit">Add to cart</button>
                                    </div>
                                </div>
                                <div className="item-desc">
                                    <h2 className="item-h2-small">Description</h2>
                                    <h3 className="item-h3">{single_item.description}</h3>
                                </div>
                            </div>
                        </div>

                        {/* Reviews  */}
                        <div className="box">
                            <div className="item-review">Number of Reviews: {single_item.numReviews}</div>
                            <Reviews></Reviews>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;