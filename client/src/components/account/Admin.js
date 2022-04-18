import { useEffect, useState } from "react";
import "./admin.css"
import UsersView from "./UsersView";

function Admin() {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);

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
    }, []);

    return (
        <>
            <div className="main-container">
                <div className="boxes">
                    {/* M: Admin Logs */}
                    <div className="box">
                        <div className="left-admin">
                            <h2>Admin Logs</h2>
                        </div>
                        <div className="right-admin">
                            <h3>(please allow a few seconds to load)</h3>
                            <h3 className="h3-small">all API calls to the server</h3>
                            <div className="display-container">
                                <pre>{logs}</pre>
                            </div>
                        </div>
                    </div>

                    {/* M: All Users */}
                    <div className="box">
                        <div className="left-admin">
                            <h2>System Stats</h2>
                        </div>
                        <div className="right-admin">
                            <h3>users (with cart and orders)</h3>
                            <h3 className="h3-small">displays as a JSON string</h3>
                            <div className="display-container">
                                {users.map((item) => {
                                    return (
                                        <UsersView key={item._id} {...item} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;