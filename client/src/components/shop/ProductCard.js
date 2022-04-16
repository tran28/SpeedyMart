import "./card.css"

function ProductCard(props) {
    return (
        <>
            <div className="card-container">
                <img src={props.image} className="card-image" alt="" />
                <div className="card-bottom">
                    <div className="card-text"><b>{props.name}</b></div>
                </div>
                <div className="card-bottom">
                    <div className="card-text">Price: {props.price}</div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;