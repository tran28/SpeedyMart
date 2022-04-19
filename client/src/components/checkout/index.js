import React, { useEffect, useState } from "react";
import "./checkout.css"
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom";


function Checkout(props) {
    const [items, setItems] = useState([])
    const [subtotal, setSubtotal] = useState(0.0)
    const [shippingAddress, setShippingAddress] = useState([])
    const [user, setUser] = useState([])

    const successMessage = "Thank you for your purchase at SpeedyMart!"
    const failedMessage = "Transaction has failed! Please try again"

    let navigate = useNavigate();

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
                // Kick out if address is not defined
                if (!res.data.address.street) {
                    // Go to address edit page
                    navigate('/account/address')
                }
                setShippingAddress(res.data.address);
                setUser(res.data);

                const { cart } = res.data;
                setItems(cart)
                let t = 0
                cart.forEach(item => t = t + item.price * item.qty)
                setSubtotal(t)
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

        const validate = () => {
            let isValid = true;
            // Valid first name?
            if (!e.target.fname.value && !user.name) {
                isValid = false;
            }
            // Valid email?
            if (!e.target.email.value && !user.email) {
                isValid = false;
            }
            // Valid address?
            if (!e.target.adr.value && !shippingAddress.street) {
                isValid = false;
            }
            // Valid city?
            if (!e.target.city.value && !shippingAddress.city) {
                isValid = false;
            }
            // Valid province?
            if (!e.target.province.value && !shippingAddress.province) {
                isValid = false;
            }
            // Valid postal code?
            if (!e.target.zip.value && !shippingAddress.postalCode) {
                isValid = false;
            }
            return isValid;
        }

        // built in fail
        if (!localStorage.getItem('customer')) {
            localStorage.setItem('customer', 112);
        }
        if (parseInt(localStorage.getItem('customer') % 3) !== 0) {

            // validate form
            const isValid = validate();
            if (isValid) {

                var axios = require('axios');
                var data = JSON.stringify({
                    "orderItems": items,
                    "shippingAddress": shippingAddress,
                    "paymentMethod": "Visa",
                    "itemsPrice": subtotal,
                    "taxPrice": subtotal * 0.13,
                    "totalPrice": subtotal * 1.13
                });

                var config = {
                    method: 'post',
                    url: '/api/orders',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('jwtToken')
                    },
                    data: data
                };

                axios(config)
                    .then(res => {
                        console.log('Order successful!');

                        // Empty current users cart
                        var axios = require('axios');
                        var data = JSON.stringify({
                            "cart": []
                        });

                        var config = {
                            method: 'put',
                            url: 'api/users/cart',
                            headers: {
                                'Authorization': localStorage.getItem('jwtToken'),
                                'Content-Type': 'application/json'
                            },
                            data: data
                        };

                        axios(config)
                            .then(function (response) {
                                // increment count
                                localStorage.setItem('customer', parseInt(localStorage.getItem('customer')) + 1)

                                props.setCartUpdate(!props.cartUpdate);
                                alert(successMessage);
                                console.log(JSON.stringify(response.data));
                            })
                            .catch(function (error) {
                                console.log(error);
                            });


                        navigate("/");
                    })
                    .catch(err => {
                        console.log('Order failed!');
                        console.log(err)
                    });
            }
            else {
                alert("Please enter missing information.")
            }

        } else {
            console.log("Order failed!");
            // increment count
            localStorage.setItem('customer', parseInt(localStorage.getItem('customer')) + 1)
            alert(failedMessage);
        }

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
                                    <input className="checkout-input autofill" type="text" id="fname" name="firstname" defaultValue={user.name} readOnly />
                                    <label className="checkout-label" htmlFor="email"><i
                                        className="fa fa-envelope"></i> Email</label>
                                    <input className="checkout-input autofill" type="text" id="email" name="email" defaultValue={user.email} readOnly />
                                    <label className="checkout-label" htmlFor="adr"><i
                                        className="fa fa-address-card-o"></i> Address</label>
                                    <input className="checkout-input autofill" type="text" id="adr" name="address" defaultValue={shippingAddress.street} readOnly />
                                    <label className="checkout-label" htmlFor="city"><i
                                        className="fa fa-institution"></i> City</label>
                                    <input className="checkout-input autofill" type="text" id="city" name="city" defaultValue={shippingAddress.city} readOnly />

                                    <div className="check-out-row">
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="province">Province</label>
                                            <input className="checkout-input autofill" type="text" id="province" name="province" defaultValue={shippingAddress.province} readOnly />
                                        </div>
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="zip">Postal Code</label>
                                            <input className="checkout-input autofill" type="text" id="zip" name="zip" defaultValue={shippingAddress.postalCode} readOnly />
                                        </div>
                                    </div>
                                </div>

                                <div className="check-out-col-50">
                                    <h3>Payment</h3>
                                    <label className="checkout-label" htmlFor="fname">Accepted Cards</label>
                                    <div className="icon-container">
                                        <i className="fa fa-cc-visa space" style={{ color: "navy" }}></i>
                                        <i className="fa fa-cc-amex space" style={{ color: "blue" }}></i>
                                        <i className="fa fa-cc-mastercard space" style={{ color: "red" }}></i>
                                        <i className="fa fa-cc-discover space" style={{ color: "orange" }}></i>
                                    </div>
                                    <label className="checkout-label" htmlFor="cname">Name on Card</label>
                                    <input className="checkout-input" type="text" id="cname" name="cardname"
                                        placeholder={user.name || "John More Doe"} />
                                    <label className="checkout-label" htmlFor="ccnum">Card Number</label>
                                    <input className="checkout-input" type="text" id="ccnum" name="cardnumber"
                                        placeholder="1111-2222-3333-4444" />
                                    <label className="checkout-label" htmlFor="expmonth">Exp Month</label>
                                    <input className="checkout-input" type="text" id="expmonth" name="expmonth"
                                        placeholder="September" />

                                    <div className="check-out-row">
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="expyear">Exp Year</label>
                                            <input className="checkout-input" type="text" id="expyear" name="expyear" placeholder="2024" />
                                        </div>
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="cvv">CVV</label>
                                            <input className="checkout-input" type="text" id="cvv" name="cvv" placeholder="356" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="check-out-row">
                                <input type="submit" value="Process" className="myBtn maxWidth-200" />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="check-out-col-25">
                    <div className="checkout-container">
                        <h3>Cart ({items.length})</h3>
                        {items.map((item) => {
                            return (<div key={item.name} className="checkout-summary-item-container">
                                <div>
                                    <p className="checkout-summary-item">{item.name}</p>
                                </div>
                                <div>
                                    <p className="checkout-summary-item text-bold">${(item.price * item.qty).toFixed(2)}</p>
                                </div>
                            </div>)
                        })
                        }
                        <hr />
                        <div className="checkout-summary-item-container">
                            <div>
                                <p className="checkout-summary-item">Subtotal</p>
                            </div>
                            <div>
                                <p className="checkout-summary-item text-bold">${subtotal.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="checkout-summary-item-container">
                            <div>
                                <p className="checkout-summary-item">Tax (13%)</p>
                            </div>
                            <div>
                                <p className="checkout-summary-item text-bold">${(subtotal * 0.13).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="checkout-summary-item-container">
                            <div>
                                <p className="checkout-summary-item">Total</p>
                            </div>
                            <div>
                                <p className="checkout-summary-item text-bold">${(subtotal * 1.13).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Checkout;