const axios = require("axios")


export function getCart() {
    return axios({
        method: 'get',
        url: '/api/users/cart',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwtToken')
        }
    });
}

export function makePayment(paymentDetails){
    const data = JSON.stringify(paymentDetails);
    const config = {
        method: 'post',
        url: 'http://localhost:5001/api/orders',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwtToken')
        },
        data : data
    };

    return axios(config)
}