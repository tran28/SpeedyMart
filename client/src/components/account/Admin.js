import { useEffect, useState } from "react";

function Admin() {
    const [logs, setLogs] = useState([]);

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
    }, []);

    return (
        <>
            <h1>Admin Dashboard</h1>
            <pre>{logs}</pre>
        </>
    );
}

export default Admin;