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
