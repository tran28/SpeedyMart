import React, {useEffect, useState} from "react";
import "./checkout.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';


function Checkout() {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0.0)
    
    useEffect(() => {
        var axios = require('axios');
        var config = {
            method: 'get',
            url: '/api/users/cart',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            }
        };
        axios(config)
            .then(function (res) {
                const {cart} = res.data;
                setItems(cart)
                let t = 0
                items.forEach(item => t = t + item.price*item.qty)
                setTotal(t)
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [])


    // handleSubmit function to be used when <form></form> block onSubmit={} is called
    const handleSubmit = e => {
        e.preventDefault();
        e.stopPropagation();

        console.log(e.target.fname.value);
        /*
        // validate form
        const isValid = validate();
        if (isValid) {
            var axios = require('axios');
            var data = JSON.stringify({
                "name": name,
                "email": email,
                "password": password,
            });

            var config = {
                method: 'post',
                url: '/api/users/',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(res => {
                    console.log(res.data);
                    navigate("/account/login");
                })
                .catch(err => {
                    console.log(err)
                });
        }
        else {
            console.log({
                message: "missing email and/or password",
                name,
                email,
                password,
            })
        }
        */
    }
    
    return (
        <>
            <div className="check-out-row">
                <div className="check-out-col-75">
                    <div className="checkout-container">
                        <form method="post" id="create_order" onSubmit={handleSubmit}>
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
                                <p>{item.name}  x{item.qty} <span className="price">${item.price}</span></p>
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