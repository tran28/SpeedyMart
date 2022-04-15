import { useState, useEffect } from 'react'
import axios from 'axios'

function Account() {
    const [data, setData] = useState([])

    useEffect(() => {
        var config = {
            method: 'get',
            url: '/api/users/profile',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('jwtToken')
            }
          };
          
          axios(config)
            .then(res => {
            setData(res.data)
            console.log(res.data)
          })
      }, [])

    return (
        <>
            <h1>Account Page</h1>
            <h3>Here's some info about the current user:</h3>
            <p>_id: {data._id}</p>
            <p>name: {data.name}</p>
            <p>email: {data.email}</p>
            <p>isAdmin: {data.isAdmin ? "true" : "false"}</p>
            <p>createdAt: {data.createdAt}</p>
            
        </>
    );
}

export default Account;