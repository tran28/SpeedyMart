import "./review.css"

function Review(props) {
    const date = new Date(props.createdAt);

    return (
        <>
            <div className="review-single-container">
                <div className="review-content">
                    <div className="rating-container">
                        <h2 className="rating-h2">Rating: {props.rating}/5<br/></h2>
                        <h2 className="rating-h2">Posted on: {date.toDateString()}</h2>
                    </div>
                    <div className="comment-container">
                        <h3 className="comment-h3">{props.comment}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Review;