function UsersView(props) {
    return (
        <>
            <p className="plain">_id: {JSON.stringify(props._id)}</p>
            <p className="plain">name: {JSON.stringify(props.name)}</p>
            <p className="plain">password: {JSON.stringify(props.password)}</p>
            <p className="plain">address: {JSON.stringify(props.address)}</p>
            <p className="plain">cart: {JSON.stringify(props.cart)}</p>
            <p className="plain">isAdmin: {JSON.stringify(props.isAdmin)}</p>
            <p className="plain">createdAt: {JSON.stringify(props.createdAt)}</p>
            <div className="separator"></div>
        </>
    );
}

export default UsersView;