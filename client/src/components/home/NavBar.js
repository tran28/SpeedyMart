import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css"

function NavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeBurgerMenu = () => setClick(false);


    return (
        <>
            {/* M: NavBar*/}
            <nav className="navbar">
                <div className="navbar-container">
                    {/* M: Navbar burger*/}
                    <div className="menu-container" onClick={handleClick}>
                        <img className="navbar-menu" src={require("../../images/hamburger.png")} />
                    </div>


                    {/* M: Navbar logo*/}
                    <Link to="/" className="navbar-logo">
                        SpeedyMart
                    </Link>

                    <div className="nav-right">
                        {/* M: Navbar account*/}
                        <Link to="/account">
                            <img className="navbar-account" src={require("../../images/account.png")} />
                        </Link>

                        {/* M: Navbar cart*/}
                        <img className="navbar-cart" src={require("../../images/cart.png")} />
                    </div>
                </div>

                {/* M: Navbar list of menu items*/}
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeBurgerMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop" className="nav-links" onClick={closeBurgerMenu}>
                            Shop
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/account" className="nav-links" onClick={closeBurgerMenu}>
                            Account
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;