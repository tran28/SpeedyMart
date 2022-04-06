import Banner from './Banner';
import Content from './Content';
import NavBar from './NavBar';

function Home() {
    let props1 = {
        image: require("../../images/food.png"),
        title: "Food",
        price_from: "$9.00",
        link: "/",
    }

    let props2 = {
        image: require("../../images/drink.png"),
        title: "Drinks",
        price_from: "$5.00",
        link: "/",
    }

    return (
        <>
            <Banner />
            <NavBar />
            <Content {...props1}/>
            <Content {...props2}/>
        </>
    )
}

export default Home;