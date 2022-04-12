import { Link } from "react-router-dom";
import "./content.css"

function Content(props) {
    return (
        <>
            <section className="content-section">
                <div className="container">
                    <div className="left-col">
                        <div className="title">{props.title}</div>
                        <div className="price-from">From {props.price_from}</div>
                        <Link className="cta-buy" to={props.link}>Shop {props.title.toLowerCase()}</Link>
                    </div>

                    <img className="image-container" src={props.image} alt={props.description} />
                </div>
            </section>
        </>
    );
}

export default Content;