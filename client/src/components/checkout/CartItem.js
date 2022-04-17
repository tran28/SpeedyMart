import "./cartitem.css"
import * as AiIcons from "react-icons/ai"
import { useState } from "react";

function CartItem(props) {
    const [itemRemoved, setItemRemoved] = useState(false);

    function handleRemoveCartItem(){
        setItemRemoved(true);
    }

    return (
        <>
            <div className={itemRemoved ? "item-removed" : "cart-item-container"}>
                <div className="cart-item-top">
                    <div className="cart-item-image-container">
                        <img src={props.image}className="image" alt=""></img>
                    </div>
                    <div className="cart-item-stats">
                        <h3 className="item-name-h3">{props.name}</h3>
                        <div className="cart-text-normal">Quantity: {props.qty}</div>
                    </div>
                    <AiIcons.AiOutlineClose className="remove-item-icon" size="16px" onClick={handleRemoveCartItem}/>
                </div>
                <div className="cart-item-bottom">
                    <div className="cart-text-large">${(props.price * props.qty).toFixed(2)}</div>
                </div>
            </div>
        </>
    );
}

export default CartItem;