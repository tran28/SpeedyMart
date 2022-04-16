import { useNavigate } from "react-router-dom";
import "./card.css"

function ProductCard(props) {
    let navigate = useNavigate();

    return (
        <>
            <div className="card-container" onClick={() => {
                navigate("/shop/" + props._id);
            }}>
                <div className="card-row-image">
                    <img src={props.image} className="card-image" alt="" />
                </div>
                <div className="card-bottom">
                    <div className="card-row">
                        <div className="card-text"><b>{props.name}</b></div>
                    </div>
                    <div className="card-row">
                        <div className="card-text" id="price">Price: ${props.price}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;