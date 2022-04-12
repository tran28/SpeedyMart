import { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import "./header.css"
import Cart from "../checkout/Cart";
import { CartData } from "../checkout/CartData";

function NavBar() {
    /* M: useState to control menu icon click */
    const [menuClick, setMenuClick] = useState(false);
    const handleMenuClick = () => {
        setMenuClick(!menuClick);
        closeCart();
    }
    const closeMenu = () => {
        setMenuClick(false);
    }

    /* M: useState to control cart icon click */
    const [cartClick, setCartClick] = useState(false);
    const handleCartClick = () => {
        setCartClick(!cartClick);
        closeMenu();
    }
    const closeCart = () => {
        setCartClick(false);
    }


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
                    <li className="nav-item" onClick={closeMenu}>
                        <Link to="/" className="nav-links">
                            home
                        </Link>
                    </li>
                    <li className="nav-item" onClick={closeMenu}>
                        <Link to="/shop" className="nav-links">
                            shop
                        </Link>
                    </li>
                    <li className="nav-item" onClick={closeMenu}>
                        <Link to="/account/login" className="nav-links">
                            account
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* M: Navbar cart icon toggle*/}
            <nav className={cartClick ? "nav-cart active" : "nav-cart"}>
                <div className="cart-close">
                    <AiIcons.AiOutlineClose color="white" size="22px" onClick={closeCart} />
                </div>

                {/* M: Map through the 'CartData' JSON array and populate cart sidebar (when clicking cart icon in navbar)*/}
                {CartData.map((item) => {
                    return (
                        <Cart key={item.id} {...item} />
                    )
                })}
            </nav>
        </>
    );
}

export default NavBar;