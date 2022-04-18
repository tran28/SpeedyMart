import "./boxinput.css"

function BoxInput(props) {

    const handlePostReview = () => {
        console.log(props);
        props.setReload(!props.reload);
    }

    return (
        <>
            <div className="review-single-container">
                <div className="row-container">
                    <textarea className="review-textarea" id="review-comment" placeholder="type review here and select a rating below"></textarea>
                    <div className="row-flex">
                        <input className="rating-input" type="number" min="1" max="5" id="review-rating" defaultValue={5} />
                        <button className="post-review-button" onClick={handlePostReview}>Post Review</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BoxInput;