function OrdersView(props) {
    const orderProducts = props.orderItems;
    const orderDate = new Date(props.createdAt)

    return (
        <>
            <div className={orderDate.getMonth() % 2 === 0 ? "container-dark" : ""}>
                <p className="plain">_id: {JSON.stringify(props._id)}</p>
                <p className="plain">orderedOn: <b>{orderDate.toDateString()}</b></p>
                {orderProducts.map((item) => {
                    return (
                        <p key={item._id} className="indent plain">{item.name} x{item.qty}</p>
                    )
                })}
                <p className="plain">Total Sales Price: <b>${props.totalPrice.toFixed(2)}</b></p>
                <div className="separator"></div>
            </div>
        </>
    );
}

export default OrdersView;