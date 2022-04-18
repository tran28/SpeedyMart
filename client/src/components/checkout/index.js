import React, {useEffect, useState} from "react";
import {getCart} from "../../API/API";
import "./checkout.css"


function Checkout() {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0.0)
    useEffect(() => {
        getCart().then((res) => {
            const {cart} = res.data;
            setItems(cart)
            let t = 0
            items.forEach(item => t = t + item.price*item.qty)
            setTotal(t)
        }).catch(function (err) {
            console.log(err);
        });
    }, [items])
    console.log(items)
    return (
        <>
            <div className="check-out-row">
                <div className="check-out-col-75">
                    <div className="checkout-container">
                        <form>
                            <div className="check-out-row">
                                <div className="check-out-col-50">
                                    <h3>Billing Address</h3>
                                    <label className="checkout-label" htmlFor="fname"><i
                                        className="fa fa-user"></i> Full Name</label>
                                    <input className="checkout-input" type="text" id="fname" name="firstname"
                                           placeholder="John M. Doe"/>
                                    <label className="checkout-label" htmlFor="email"><i
                                        className="fa fa-envelope"></i> Email</label>
                                    <input className="checkout-input" type="text" id="email" name="email"
                                           placeholder="john@example.com"/>
                                    <label className="checkout-label" htmlFor="adr"><i
                                        className="fa fa-address-card-o"></i> Address</label>
                                    <input className="checkout-input" type="text" id="adr" name="address"
                                           placeholder="542 W. 15th Street"/>
                                    <label className="checkout-label" htmlFor="city"><i
                                        className="fa fa-institution"></i> City</label>
                                    <input className="checkout-input" type="text" id="city" name="city"
                                           placeholder="New York"/>

                                    <div className="check-out-row">
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="state">State</label>
                                            <input className="checkout-input" type="text" id="state" name="state"
                                                   placeholder="Ont"/>
                                        </div>
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="zip">Zip</label>
                                            <input className="checkout-input" type="text" id="zip" name="zip"
                                                   placeholder="10001"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="check-out-col-50">
                                    <h3>Payment</h3>
                                    <label className="checkout-label" htmlFor="fname">Accepted Cards</label>
                                    <div className="icon-container">
                                        <i className="fa fa-cc-visa" style={{color: "navy"}}></i>
                                        <i className="fa fa-cc-amex" style={{color: "blue"}}></i>
                                        <i className="fa fa-cc-mastercard" style={{color: "red"}}></i>
                                        <i className="fa fa-cc-discover" style={{color: "orange"}}></i>
                                    </div>
                                    <label className="checkout-label" htmlFor="cname">Name on Card</label>
                                    <input className="checkout-input" type="text" id="cname" name="cardname"
                                           placeholder="John More Doe"/>
                                    <label className="checkout-label" htmlFor="ccnum">Credit card number</label>
                                    <input className="checkout-input" type="text" id="ccnum" name="cardnumber"
                                           placeholder="1111-2222-3333-4444"/>
                                    <label className="checkout-label" htmlFor="expmonth">Exp Month</label>
                                    <input className="checkout-input" type="text" id="expmonth" name="expmonth"
                                           placeholder="September"/>

                                    <div className="check-out-row">
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="expyear">Exp Year</label>
                                            <input className="checkout-input" type="text" id="expyear" name="expyear"
                                                   placeholder="2018"/>
                                        </div>
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="cvv">CVV</label>
                                            <input className="checkout-input" type="text" id="cvv" name="cvv"
                                                   placeholder="352"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="check-out-row">
                                <input type="submit" value="Process" className="myBtn maxWidth-200"/>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="check-out-col-25">
                    <div className="checkout-container">
                        <h4>Cart
                            <span className="price" style={{color: "black"}}>
                                <i className="fa fa-shopping-cart"></i><b>4</b></span></h4>

                        {items.map((item) => {
                            return (<div key={item.name}>
                                <p><a href="#">{item.name}</a> x{item.qty} <span className="price">${item.price}</span></p>
                            </div>)
                        })
                        }

                        <hr/>
                        <p>Total <span className="price" style={{color: "black"}}><b>${total}</b></span></p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Checkout;