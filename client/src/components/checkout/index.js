import React, {useEffect, useState} from "react";
import {getCart, makePayment} from "../../API/API";
import "./checkout.css"
import "./summary.css"
import {
    FaAddressCard,
    FaCcAmex,
    FaCcDiscover,
    FaCcMastercard,
    FaCcVisa,
    FaCity,
    FaShoppingCart,
    FaUser
} from "react-icons/fa";
import {useNavigate} from "react-router-dom";


function Checkout() {
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0.0)
    const [tax, setTax] = useState(0.0)
    const [order, setOrder] = useState()
    const [paymentSuccessful, setPaymentStatus] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getCart().then((res) => {
            const {cart} = res.data;
            setItems(cart)
            let t = 0
            items.forEach(item => t = t + item.price * item.qty)
            setTotal(t)
            setTax(t * 0.3)

        }).catch(function (err) {
            console.log(err);
        });
    }, [items])



    const confirmPayment = (event) => {
        event.preventDefault()

        const data = {
            "orderItems": items,
            "shippingAddress": {
                "street": event.target[2].value,
                "unit": "Unit 2",
                "city": event.target[3].value,
                "province": event.target[4].value,
                "postalCode": event.target[5].value,
                "country": "Canada"
            },
            "paymentMethod": "Visa",
            "itemsPrice": total,
            "taxPrice": tax,
            "totalPrice": total + tax
        }

        makePayment(data).then((res) => {

            if (res.statusText==="Created"){
                setOrder(res.data)
                setPaymentStatus(true)
                console.log(res)
            }
        }).catch( err => {
            console.log(err)
        })

        console.log(event)
    }
    const closeSummary = () => {
        setPaymentStatus(false)
        navigate("/")
    }


    return (
        <>

            {paymentSuccessful && <div>
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <a onClick={closeSummary}><span className="close">&times;</span></a>

                        <div style={{width:"100%", height:"55vh", marginTop:"30px", display:"block"}}>

                            <div>

                                <h4>Order Confirmed
                                    <span className="price" style={{color: "black"}}>
                                <FaShoppingCart color="#2e343a" size="24px"/>
                                <b>{items.length}</b></span></h4>

                                {items.map((item) => {
                                    return (<div key={item.name}>
                                        <p><a href="#">{item.name}</a> x{item.qty} <span
                                            className="price">${item.price}</span></p>
                                    </div>)
                                })
                                }
                                <hr/>
                                <p>Cost:  <span className="price" style={{color: "black"}}><b>${total}</b></span></p>
                                <p>Tax:  <span className="price" style={{color: "black", fontSize:"12px"}}><b>${tax}</b></span></p>
                                <p>Total:  <span className="price" style={{color: "black"}}><b>${order.totalPrice}</b></span></p>

                                <p>Created at: {order.createdAt}</p>

                                <button className="myBtn maxWidth-200" onClick={closeSummary}>OK</button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>}


            <div className="check-out-row">
                <form onSubmit={confirmPayment}>
                    <div className="check-out-col-75">
                        <div className="checkout-container">
                            <div className="check-out-row">
                                <div className="check-out-col-50">
                                    <h3>Billing Address</h3>
                                    <label className="checkout-label" htmlFor="fname">
                                        <FaUser color="#2e343a" size="24px"/> Full Name</label>
                                    <input required className="checkout-input" type="text" id="fname" name="firstname"
                                           placeholder="John M. Doe"/>
                                    <label className="checkout-label" htmlFor="email">
                                        <FaUser color="#2e343a" size="24px"/> Email</label>
                                    <input required className="checkout-input" type="text" id="email" name="email"
                                           placeholder="john@example.com"/>
                                    <label className="checkout-label" htmlFor="adr">
                                        <FaAddressCard color="#2e343a" size="24px"/> Address</label>
                                    <input required className="checkout-input" type="text" id="adr" name="address"
                                           placeholder="542 W. 15th Street"/>
                                    <label className="checkout-label" htmlFor="city">
                                        <FaCity color="#2e343a" size="24px"/> City</label>
                                    <input required className="checkout-input" type="text" id="city" name="city"
                                           placeholder="Mississauga"/>

                                    <div className="check-out-row">
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="state">Province</label>
                                            <input required className="checkout-input" type="text" id="state" name="state"
                                                   placeholder="Ontario "/>
                                        </div>
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="zip">Zip</label>
                                            <input required className="checkout-input" type="text" id="zip" name="zip"
                                                   placeholder="K1Y 123"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="check-out-col-50">
                                    <h3>Payment</h3>
                                    <label className="checkout-label" htmlFor="fname">Accepted Cards</label>
                                    <div className="icon-container">
                                        <FaCcVisa size="50px" color="blue" style={{margin: "2px"}}/>
                                        <FaCcAmex size="50px" style={{margin: "2px"}}/>
                                        <FaCcMastercard color="yellow" size="50px" style={{margin: "2px"}}/>
                                        <FaCcDiscover color="purple" size="50px" style={{margin: "2px"}}/>

                                    </div>
                                    <label className="checkout-label" htmlFor="cname">Name on Card</label>
                                    <input required className="checkout-input" type="text" id="cname" name="cardname"
                                           placeholder="John More Doe"/>
                                    <label className="checkout-label" htmlFor="ccnum">Credit card number</label>
                                    <input required className="checkout-input" type="text" id="ccnum" name="cardnumber"
                                           placeholder="1111-2222-3333-4444"/>
                                    <label className="checkout-label" htmlFor="expmonth">Exp Month</label>
                                    <input required className="checkout-input" type="text" id="expmonth" name="expmonth"
                                           placeholder="September"/>

                                    <div className="check-out-row">
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="expyear">Exp Year</label>
                                            <input required className="checkout-input" type="text" id="expyear" name="expyear"
                                                   placeholder="2018"/>
                                        </div>
                                        <div className="check-out-col-50">
                                            <label className="checkout-label" htmlFor="cvv">CVV</label>
                                            <input required className="checkout-input" type="text" id="cvv" name="cvv"
                                                   placeholder="352"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                        </div>
                    </div>

                    <div className="check-out-col-25">
                        <div className="checkout-container">
                            <h4>Order
                                <span className="price" style={{color: "black"}}>
                                <FaShoppingCart color="#2e343a" size="24px"/>
                                <b>{items.length}</b></span></h4>

                            {items.map((item) => {
                                return (<div key={item.name}>
                                    <p><a href="#">{item.name}</a> x{item.qty} <span
                                        className="price">${item.price}</span></p>
                                </div>)
                            })
                            }
                            <hr/>
                            <p>Total <span className="price" style={{color: "black"}}><b>${total}</b></span></p>
                        </div>
                        <div className="check-out-row">
                            <input required type="submit" value="Process" className="myBtn"
                                   style={{marginRight: "20px", maxWidth: "90%"}}/>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
}

export default Checkout;