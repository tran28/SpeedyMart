import { useState, useEffect } from 'react'
import axios from 'axios'
import "./account.css"
import { useNavigate } from 'react-router-dom'
import OrderView from './OrderView';

function Account() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [address, setAddress] = useState([]);
  const [orders, setOrders] = useState([]);

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
        console.log(res.data);

        const { address } = res.data;
        setAddress(address);
      })

    var config2 = {
      method: 'get',
      url: '/api/orders',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("jwtToken"),
      }
    };

    axios(config2)
      .then(function (res) {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    navigate("/account/address");
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/account/login");
    navigate(0);
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
                    <span className={address.street ? 'highlight' : 'hidden'}>{address.street} {address.unit}<br />in {address.city}, {address.province} {address.postalCode} {address.country}</span>
                    <span className={!address.street ? 'highlight' : 'hidden'}></span>
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
              <h3 className={orders.length === 0 ? "" : "hidden"}>no orders yet, start shopping!</h3>
              {orders.map((item) => {
                return (
                  <OrderView key={item._id} {...item} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;