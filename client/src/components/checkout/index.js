import React, {useEffect, useState} from "react";
import "./checkout.css"
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from "react-router-dom";


function Checkout(props) {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0.0)
    const [shippingAddress, setShippingAddress] = useState([])
    const [user, setUser] = useState([])

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
                // Kick out of address is not defined
                if (!res.data.address.street) {
                    //alert('Please provide your address before checkout!\nPress OK to proceed.')
                    navigate('/account/address')
                }
                setShippingAddress(res.data.address);
                setUser(res.data);

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

        const validate = () => {
            let isValid = true;
            // Valid first name?
            if (!e.target.fname.value && !user.name) {
                isValid = false;
            }
            // Valid email?
            if (!e.target.email.value&& !user.email) {
                isValid = false;
            }
            // Valid address?
            if (!e.target.adr.value&& !shippingAddress.street) {
                isValid = false;
            }
            // Valid city?
            if (!e.target.city.value&& !shippingAddress.city) {
                isValid = false;
            }
            // Valid province?
            if (!e.target.state.value&& !shippingAddress.province) {
                isValid = false;
            }
            // Valid postal code?
            if (!e.target.zip.value&& !shippingAddress.postalCode) {
                isValid = false;
            }
            return isValid;
        }

        // built in fail
        if (!localStorage.getItem('customer')){
            localStorage.setItem('customer',112);
        }
        if (parseInt(localStorage.getItem('customer')%3) !== 0) {
            
        // validate form
        const isValid = validate();
        if (isValid) {

            var axios = require('axios');
            var data = JSON.stringify({
            "orderItems": items,
            "shippingAddress": shippingAddress,
            "paymentMethod": "Visa",
            "itemsPrice": total,
            "taxPrice": total * 0.13,
            "totalPrice": total * 1.13
            });

            var config = {
            method: 'post',
            url: '/api/orders',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            },
            data : data
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
                    data : data
                    };

                    axios(config)
                    .then(function (response) {
                        // increment count
                        localStorage.setItem('customer', parseInt(localStorage.getItem('customer')) + 1)
                        
                        props.setCartUpdate(!props.cartUpdate);
                        alert("Thank you for your purchase at SpeedyMart!");
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

    }else {
        console.log("Order failed!");
        // increment count
        localStorage.setItem('customer', parseInt(localStorage.getItem('customer')) + 1)
        alert('Transaction has failed! Please try again');
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
                                    <input className="checkout-input" type="text" id="fname" name="firstname"
                                           placeholder={user.name || "John M. Doe"}/>
                                    <label className="checkout-label" htmlFor="email"><i
                                        className="fa fa-envelope"></i> Email</label>
                                    <input className="checkout-input" type="text" id="email" name="email"
                                           placeholder={user.email || "john@example.com"}/>
                                    <label className="checkout-label" htmlFor="adr"><i
                                        className="fa fa-address-card-o"></i> Address</label>
                                    <input className="checkout-input" type="text" id="adr" name="address"
                                           placeholder={shippingAddress.street || "123 Sample st"}/>
                                    <label className="checkout-label" htmlFor="city"><i
                                        className="fa fa-institution"></i> City</label>
                                    <input className="checkout-input" type="text" id="city" name="city"
                                           placeholder={shippingAddress.city || "Toronto"}/>

                                    <div className="check-out-row">
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="state">Province</label>
                                            <input className="checkout-input" type="text" id="state" name="state"
                                                   placeholder={shippingAddress.province || "Ontario"}/>
                                        </div>
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="zip">Postal Code</label>
                                            <input className="checkout-input" type="text" id="zip" name="zip"
                                                   placeholder={shippingAddress.postalCode || "A1B 2C3"}/>
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
                                           placeholder={user.name || "John More Doe"}/>
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