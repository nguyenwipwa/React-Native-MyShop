import URL from '../components/URL';

const getOrderHistory = (token) => (
    fetch(URL.URL_ORDER_HISTORY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    }).then(res => res.json())
);
module.exports = getOrderHistory;

