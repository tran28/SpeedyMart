import { useParams } from "react-router-dom";
import "./item.css"
import { useEffect, useState } from "react";

function Item() {
    // M: get the parameter from the URL to call the 'get single product by ID' (API)
    const params = useParams();
    const productId = params.productId;

    const [single_item, setSingleItem] = useState([]);
    const [priceSum, setPriceSum] = useState(0);

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
                setPriceSum(single_item.price);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [productId, single_item.price]);

    function handleSubmit() {

    }

    function handleOnInput() {
        const quantity = document.getElementById("quantity").value;
        setPriceSum((single_item.price * quantity).toFixed(2));
    }

    function preventKeyboardInput(e) {
        e.preventDefault();
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
                                    <h3 className="item-h3-stats-price">${priceSum}</h3>
                                </div>
                                <form method="post" id="add-cart" onSubmit={handleSubmit}>
                                    <div className="form-flex">
                                        <input className="number-input" type="number" id="quantity" min="1" max={single_item.countInStock} defaultValue="1" onKeyDown={e => preventKeyboardInput(e)} onInput={handleOnInput} />
                                        <button className="add-cart-button" id="add-to-cart" type="submit">Add to cart</button>
                                    </div>
                                </form>
                                <div className="item-desc">
                                    <h2 className="item-h2-small">Description</h2>
                                    <h3 className="item-h3">{single_item.description}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="item-review">Number of Reviews: {single_item.numReviews}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;