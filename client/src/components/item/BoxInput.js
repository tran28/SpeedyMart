import { useNavigate } from "react-router-dom";
import "./boxinput.css"

function BoxInput(props) {
    let navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("jwtToken");

    const handlePostReview = () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "rating": document.getElementById("review-rating").value,
            "comment": document.getElementById("review-comment").value
        });

        var config = {
            method: 'post',
            url: '/api/products/' + props.productId + '/review',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('jwtToken')
            },
            data: data
        };

        axios(config)
            .then(function (res) {
                document.getElementById("review-comment").value = "";
                navigate(0);
            })
            .catch(function (error) {
                console.log(error);
                isLoggedIn ? document.getElementById("warning").className = "hidden"
                    : document.getElementById("warning").className = "warning-h3"
            });
    }

    return (
        <>
            <div className="review-single-container">
                <div className="row-container">
                    <textarea className="review-textarea" id="review-comment" placeholder="type review here and select a rating below"></textarea>
                    <div className="row-flex">
                        <input className="rating-input" type="number" min="1" max="5" id="review-rating" defaultValue={5} onChange={(e) => {
                            if (!e.target.value == "") {
                                if (e.target.value > 5) e.target.value = 5;
                                else if (e.target.value < 1) e.target.value = 1;
                            }
                        }} />
                        <div className="out-of">/5</div>
                        <button className="post-review-button" onClick={handlePostReview}>Post Review</button>
                    </div>
                    {/* M: User must be signed in before posting a review */}
                    <h3 className="hidden" id="warning">please sign in to post this review</h3>
                </div>
            </div>
        </>
    );
}

export default BoxInput;