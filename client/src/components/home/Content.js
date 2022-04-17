import { Link } from "react-router-dom";
import "./content.css"

function Content(props) {
    return (
        <>
            <section className="content-section">
                <div className="container">
                    <div className="left-col">
                        <div className="title">{props.heading}</div>
                        <div className="price-from">{props.subheading}</div>
                        <Link className="cta-buy" to={props.link}>{props.cta}</Link>
                    </div>

                    <img className="image-container" src={props.image} alt={props.description} />
                </div>
            </section>
        </>
    );
}

export default Content;