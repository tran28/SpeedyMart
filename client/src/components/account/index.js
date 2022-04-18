import { useState, useEffect } from 'react'
import axios from 'axios'
import "./account.css"
import { useNavigate } from 'react-router-dom'

function Account() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);

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
        const { address } = res.data;
        setAddress(address);
        console.log(res.data);
        console.log(address);
      })
  }, []);

  const handleClick = () => {
    navigate("/account/address");
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/account/login");
  };

  return (
    <>
      <div className='main-container'>
        <div className='boxes'>
          <div className='box' id='account-info'>
            <div className='left'>
              <h2>Your Account Information</h2>
            </div>
            <div className='right'>
              <div className='row'>
                {/* M: Display account 'name' and 'email'*/}
                <div className='row'>
                  <p className='user-info'>
                    account created by&nbsp;
                    <span className='highlight'>{data.name}</span>
                    <br />
                    with email&nbsp;
                    <span className='highlight'>{data.email}</span>
                  </p>
                </div>

                {/* M: Display account 'address'*/}
                <div className='row'>
                  <p className='user-info'>
                    the default address is&nbsp;
                    <span className='highlight'></span><br />
                  </p>
                </div>

                {/* M: This is the 'Edit Addresses' button */}
                <div className="button-wrapper">
                  <button className="button" onClick={handleClick}>
                    <span>Edit Address</span>
                  </button>
                </div>

                {/* M: This is the logout button */}
                <div className='row'>
                  <div className='button-link-flex'>
                    <div className="button-link-text">or</div>
                    <button className='button-link' onClick={handleLogOut}>log out</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='box' id='orders'>
            <div className="left">
              <h2>Your Orders</h2>
            </div>
            <div className="right">
              <h3>append orders here</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;