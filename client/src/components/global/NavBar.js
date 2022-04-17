import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import "./header.css"
import CartItem from "../checkout/CartItem";

function NavBar(props) {
    const [menuClick, setMenuClick] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [cartFilled, setCartFilled] = useState(false);
    const [cart, setCart] = useState([]);

    /* M: useState to control menu icon click */
    const handleMenuClick = () => {
        setMenuClick(!menuClick);
        closeCart();
    }
    const closeMenu = () => {
        setMenuClick(false);
    }

    /* M: useState to control cart icon click */
    const handleCartClick = () => {
        props.setCartClick(!props.cartClick);
        closeMenu();
    }

    const closeCart = () => {
        props.setCartClick(false);
    }

    // M: 'axios' call to get the user's cart
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
                const { cart } = res.data;
                setCart(cart);

                // check if there is item in cart
                if (cart.length > 0) {
                    setCartFilled(true)
                    const subTotal = cart.reduce(
                        (acc, item) => acc + (item.price * item.qty),
                        0
                    );
                    setSubtotal(subTotal.toFixed(2));
                }
                else{
                    setCartFilled(false);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }, [props.cartUpdate]);

    return (
        <>
            {/* M: NavBar*/}
            <nav className="navbar">
                <div className="navbar-container">
                    {/* M: Navbar burger*/}
                    <div className="menu-container" onClick={handleMenuClick}>
                        <FaIcons.FaBars className="menu-icon" size="24px" color="#2e343a" />
                        <div className="menu-icon-text">menu</div>
                    </div>


                    {/* M: Navbar logo*/}
                    <Link to="/" className="navbar-logo">
                        SpeedyMart
                    </Link>

                    <div className="nav-right">
                        {/* M: Navbar account*/}
                        <Link to="/account">
                            <FaIcons.FaUserCircle className="account-icon" color="#2e343a" size="24px" />
                        </Link>

                        {/* M: Navbar cart*/}
                        <FaIcons.FaCartArrowDown className="cart-icon" color="#2e343a" size="24px" onClick={handleCartClick} />
                    </div>
                </div>
            </nav>

            {/* M: Navbar list of menu items*/}
            <nav className={menuClick ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items">
                    <li className="menu-close">
                        <AiIcons.AiOutlineClose color="white" size="22px" onClick={closeMenu} />
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMenu}>
                            home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop" className="nav-links" onClick={closeMenu}>
                            shop
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/account" className="nav-links" onClick={closeMenu}>
                            account
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* M: Navbar cart icon toggle*/}
            <nav className={props.cartClick ? "nav-cart active" : "nav-cart"}>
                <div className="cart-container">
                    <div className="cart-top">
                        <div className="cart-header-container">
                            <h2 className="your-cart-h2">Your Cart</h2>
                            <AiIcons.AiOutlineClose className="cart-close-icon" color="white" size="26px" onClick={closeCart} />
                        </div>
                        <div className={cartFilled ? "cart-none" : "cart-no-item-message"}>
                            <h3 className="cart-h3-empty">your cart is currently empty.</h3>
                        </div>
                        <div className="cart-items">
                            {/* M: Map through the 'cart' JSON array and populate cart sidebar (when clicking cart icon in navbar)*/}
                            {cart.map((item) => {
                                return (
                                    <CartItem key={item._id} cartUpdate={props.cartUpdate} setCartUpdate={props.setCartUpdate} {...item} />
                                )
                            })}
                        </div>
                    </div>
                    <div className={cartFilled ? "cart-bottom" : "cart-none"}>
                        <div className="subtotal">
                            <h2 className="subtotal-h2">Subtotal</h2>
                            <h2 className="subtotal-h2">${subtotal}</h2>
                        </div>
                        <div className="ship-tax-container">
                            <h3 className="cart-h3">shipping & taxes calculated at checkout.</h3>
                        </div>
                        <button className="check-out-button">Check out</button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;