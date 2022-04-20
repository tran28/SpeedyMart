function OrdersView(props) {
    const orderProducts = props.orderItems;
    const orderDate = new Date(props.createdAt)

    return (
        <>
            <div className={orderDate.getMonth() % 2 === 0 ? "container-dark" : ""}>
                <p className="plain">_id: {JSON.stringify(props._id)}</p>
                <p className="plain">orderedOn: {orderDate.toDateString()}</p>
                {orderProducts.map((item) => {
                    return (
                        <p key={item._id} className="indent plain">{item.name} x{item.qty}</p>
                    )
                })}
                <div className="separator"></div>
            </div>
        </>
    );
}

export default OrdersView;