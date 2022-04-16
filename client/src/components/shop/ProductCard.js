import "./card.css"

function ProductCard(props) {
    return (
        <>
            <div className="card-container">
                <img src={props.image} className="card-image" alt=""/>
                <div className="card-bottom">
                    <p className="card-text"><b>{props.name}</b></p>
                    <p className="card-text">Price: ${props.price}</p>
                </div>
            </div>
        </>
    );
}

export default ProductCard;