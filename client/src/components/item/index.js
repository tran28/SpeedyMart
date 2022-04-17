import { useNavigate, useParams } from "react-router-dom";
import "./item.css"
import { useEffect, useState } from "react";
import Review from "./review";

function Item() {
    // M: get the parameter from the URL to call the 'get single product by ID' (API)
    const params = useParams();
    const productId = params.productId;

    let navigate = useNavigate();

    const [single_item, setSingleItem] = useState([]);
    const [allReviews, setAllReviews] = useState([]);

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
            .then(function (res) {
                console.log(res.data)
                setSingleItem(res.data);

                const { reviews } = res.data;
                setAllReviews(reviews);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [productId]);

    const handleSubtract = () => {
        if (parseInt(document.getElementById("quantity").value) > 1) {
            document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) - 1;
        }
    }

    const handleAdd = () => {
        if (parseInt(document.getElementById("quantity").value) < single_item.countInStock) {
            document.getElementById("quantity").value = parseInt(document.getElementById("quantity").value) + 1;
        }
    }

    const handleAddToCart = () => {
        if (localStorage.getItem("jwtToken") === null) {
            navigate("/account/login");
        }
        else {
            var axios = require('axios');
            var data = JSON.stringify({
                "qty": document.getElementById("quantity").value,
            });

            var config = {
                method: 'put',
                url: '/api/users/cart/add/' + productId,
                headers: {
                    'Authorization': localStorage.getItem("jwtToken"),
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
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
                                        <button className="add-cart-button" id="add-to-cart" type="submit" onClick={handleAddToCart}>Add to cart</button>
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
                            <div className="reviews-main-container">
                                <div className="review-count-container">
                                    <h3 className="review-count">Average Rating: {single_item.rating}/5 ({single_item.numReviews} reviews)</h3>
                                </div>
                                {allReviews.map((item) => {
                                    return (
                                        <Review key={item._id} {...item}></Review>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;