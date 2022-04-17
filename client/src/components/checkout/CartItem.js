import "./cartitem.css"
import * as AiIcons from "react-icons/ai"
import { useState } from "react";

function CartItem(props) {
    const [itemRemoved, setItemRemoved] = useState(false);
    var axios = require('axios');

    function handleRemoveCartItem() {
        setItemRemoved(true);
    }

    const handleSubtract = () => {
        if (parseInt(document.getElementById("quantity" + props._id).value) > 1) {
            // document.getElementById("quantity" + props._id).value = parseInt(document.getElementById("quantity" + props._id).value) - 1;
            var data = JSON.stringify({
                "qty": 1
            });

            var config = {
                method: 'put',
                url: '/api/users/cart/remove/' + props._id,
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

    const handleAdd = () => {
        if (parseInt(document.getElementById("quantity" + props._id).value) < 100) {
            document.getElementById("quantity" + props._id).value = parseInt(document.getElementById("quantity" + props._id).value) + 1;
        }
    }

    return (
        <>
            <div className={itemRemoved ? "item-removed" : "cart-item-container"}>
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