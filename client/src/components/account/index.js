import { useState, useEffect } from 'react'
import axios from 'axios'

function Account() {
    const [data, setData] = useState([])

    useEffect(() => {
        var config = {
            method: 'get',
            url: '/api/users',
            headers: { 
              'Authorization': localStorage.getItem('jwtToken')
            }
          };
          
          axios(config)
            .then(res => {
            setData(res.data)
            //console.log(res.data)
          })
      }, [])

    return (
        <>
            <h1>Account Page</h1>
            <h2>derp</h2>
            {data.map((user)=> <p key={user.email}>{user.email} {user.name} {user._id} </p>)}
        </>
    );
}

export default Account;