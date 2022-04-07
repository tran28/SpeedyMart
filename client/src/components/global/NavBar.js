import { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import "./header.css"

function NavBar() {
    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);
        document.body.classList.toggle('lock-scroll');
    }
    const closeBurgerMenu = () => {
        setClick(false);
        document.body.classList.toggle('lock-scroll');
    }


    return (
        <>
            {/* M: NavBar*/}
            <nav className="navbar">
                <div className="navbar-container">
                    {/* M: Navbar burger*/}
                    <div className="menu-container" onClick={handleClick}>
                        <FaIcons.FaBars className="menu-icon" size="24px" color="#2e343a"/>
                        <div className="menu-icon-text">MENU</div>
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
                        <FaIcons.FaCartArrowDown className="cart-icon" color="#2e343a" size="24px" />
                    </div>
                </div>
            </nav>
            {/* M: Navbar list of menu items*/}
            <nav ul className={click ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <AiIcons.AiOutlineClose color="white" size="22px" onClick={closeBurgerMenu}/>
                    </li>
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