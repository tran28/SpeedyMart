import "./cartitem.css"
import * as AiIcons from "react-icons/ai"
import { useEffect, useState } from "react";

function CartItem(props) {
    const [stockTracker, setStockTracker] = useState(0);

    useEffect(() => {
        // get product stock count
        var axios = require('axios');
        var config = {
            method: 'get',
            url: '/api/products/' + props.product,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then(function (res) {
                setStockTracker(res.data.countInStock);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [props.product])

    function handleRemoveCartItem() {
        var axios = require('axios');
        var data = JSON.stringify({
            "qty": 999999,
        });

        var config = {
            method: 'put',
            url: '/api/users/cart/remove/' + props.product,
            headers: {
                'Authorization': localStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (res) {
                props.setCartUpdate(!props.cartUpdate);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    const handleSubtract = () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "qty": 1,
        });

        var config = {
            method: 'put',
            url: '/api/users/cart/remove/' + props.product,
            headers: {
                'Authorization': localStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (res) {
                props.setCartUpdate(!props.cartUpdate);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    const handleAdd = () => {
        if (parseInt(document.getElementById("quantity" + props._id).value) < stockTracker) {
            var axios = require('axios');
            var data = JSON.stringify({
                "qty": 1,
            });

            var config = {
                method: 'put',
                url: '/api/users/cart/add/' + props.product,
                headers: {
                    'Authorization': localStorage.getItem("jwtToken"),
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (res) {
                    props.setCartUpdate(!props.cartUpdate);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <div className="cart-item-container">
                <div className="cart-item-top">
                    <div className="cart-item-image-container">
                        <img src={props.image} className="image" alt=""></img>
                    </div>
                    <div className="cart-item-stats">
                        <h3 className="item-name-h3">{props.name}</h3>
                        <div>
                            <button className="slider-button" id="subtract-quantity" onClick={handleSubtract}>-</button>
                            <input className="quantity-number no-spin" type="number" id={"quantity" + props._id} min="1" max="100" value={props.qty} readOnly />
                            <button className="slider-button" id="add-quantity" onClick={handleAdd}>+</button>
                        </div>
                    </div>
                    <AiIcons.AiOutlineClose className="remove-item-icon" size="16px" onClick={handleRemoveCartItem} />
                </div>
                <div className="cart-item-bottom">
                    <div className="cart-text-large">${(props.price * props.qty).toFixed(2)}</div>
                </div>
            </div>
        </>
    );
}

export default CartItem;