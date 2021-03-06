import { useEffect, useState } from "react";
import "./admin.css"
import OrdersView from "./SystemOrdersView";
import UsersView from "./UsersView";

function Admin() {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        var axios = require('axios');
        var config = {
            method: 'get',
            url: '/logs',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then(function (res) {
                setLogs(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });


        var config2 = {
            method: 'get',
            url: '/api/users',
            headers: {
                'Authorization': localStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            },
        };

        axios(config2)
            .then(function (res) {
                setUsers(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });

        var config3 = {
            method: 'get',
            url: '/api/products/all',
            headers: {
                'Authorization': localStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            },
        };

        axios(config3)
            .then(function (res) {
                setInventory(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });

        var config4 = {
            method: 'get',
            url: '/api/orders/all',
            headers: {
                'Authorization': localStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            },
        };

        axios(config4)
            .then(function (res) {
                setAllOrders(res.data)
            })
            .catch(function (err) {
                console.log(err);
            });
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const qty = e.target.qty.value;
        const id = e.target.id.placeholder;
        //console.log(id)

        if (qty) {
            var axios = require('axios');
            var data = JSON.stringify({
                "countInStock": qty
            });

            var config = {
                method: 'put',
                url: '/api/products/' + id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                    console.log("updated qty: " + JSON.stringify(response.data.countInStock));
                    alert("Stock updated!")
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }

    return (
        <>
            <div className="main-container">
                <div className="boxes">

                    <h1 className="admin-h1">Admin Page</h1>

                    {/* M: Inventory */}
                    <div className="box">
                        <div className="left-admin">
                            <h2>Store Inventory</h2>
                        </div>
                        <div className="right-admin">
                            <h3>Inventory</h3>
                            <h3 className="h3-small">update the store inventory</h3>
                            <div className="display-container">
                                {inventory.map((item) => {
                                    return (
                                        <>
                                            <form onSubmit={handleSubmit}>
                                                <p className="admin-p name">{item.name}</p>
                                                <p className="admin-p">Current quantity:&nbsp;
                                                    <input className="stock-input" type="text" id="qty" name="qty" placeholder={item.countInStock} onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                            event.preventDefault();
                                                        }
                                                    }} />
                                                    <input type="submit" value="Update" className="update-button" />
                                                    {/* Ghetto way to get the item._id into the form submit */}
                                                    <input type="text" id="id" name="id" placeholder={item._id} className="hidden" /></p>
                                            </form>
                                            <div className="separator"></div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* M: System Stats */}
                    <div className="box">
                        <div className="left-admin">
                            <h2>System Stats</h2>
                        </div>
                        <div className="right-admin">
                            {/* M: SpeedyMart Users */}
                            <h3>SpeedyMart Users</h3>
                            <h3 className="h3-small">display all users</h3>
                            <div className="display-container">
                                {users.map((item) => {
                                    return (
                                        <UsersView key={item._id} {...item} />
                                    )
                                })}
                            </div>

                            {/* M: SpeedyMart Orders */}
                            <h3>SpeedyMart Orders</h3>
                            <h3 className="h3-small">display all orders</h3>
                            <div className="display-container">
                                {allOrders.map((item) => {
                                    return (
                                        <OrdersView key={item._id} {...item}></OrdersView>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* M: Access Logs */}
                    <div className="box">
                        <div className="left-admin">
                            <h2>Access Logs</h2>
                        </div>
                        <div className="right-admin">
                            <h3>(please allow a few seconds to load)</h3>
                            <h3 className="h3-small">all API calls to the server</h3>
                            <div className="display-container">
                                <pre>{logs}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;