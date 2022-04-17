import Banner from "./Banner";
import NavBar from "./NavBar";

function Header(props) {
    return (
        <>
            <Banner />
            <NavBar {...props}/>
        </>
    );
}

export default Header;