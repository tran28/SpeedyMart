import { Link } from "react-router-dom";
import "./content.css"

function Content(props) {
    return (
        <>
            <section className="content-section">
                <div className="container">
                    <div className="left-col">
                        <h1 className="title">{props.title}</h1>
                        <p className="price-from">From <span>{props.price_from}</span></p>
                        <Link className="cta-buy" to={props.link}>Shop {props.title.toLowerCase()}</Link>
                    </div>

                    <img className="image-container" src={props.image} alt="product image" />
                </div>
            </section>
        </>
    );
}

export default Content;