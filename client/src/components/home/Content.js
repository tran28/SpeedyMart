import { Link } from "react-router-dom";
import "./content.css"

function Content(props) {
    return (
        <>
            <div className="container">
                <div className="product-description">
                    <div className="left-col">
                        <h1 className="title">{props.title}</h1>
                        <p className="price-from">From <span>{props.price_from}</span></p>
                        <Link className="cta-buy" to={props.link}>Buy now</Link>
                    </div>
                </div>

                <img className="image-container" src={props.image} />
            </div>
        </>
    );
}

export default Content;