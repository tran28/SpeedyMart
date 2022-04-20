import "./account.css"

function OrderView(props) {
    const date = new Date(props.createdAt);
    return (
        <>
            <div className="orderview-container">
                <div className="orderview-flex">
                <p className='user-info'>
                    on {date.toDateString()} order&nbsp;<span className='highlight-order'>#{props._id}</span>was placed
                    and it's current status is&nbsp;<span className='highlight'>Paid ${props.totalPrice.toFixed(2)}</span>and&nbsp;<span className='highlight'>Fulfilled</span>
                </p>
                </div>
            </div>
        </>
    );
}

export default OrderView;