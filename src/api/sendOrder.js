import URL from '../components/URL';

const sendOrder = (token, arrayDetail) => {
    return fetch(URL.URL_CART, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, arrayDetail })
    }).then(res => res.text());
};
module.exports = sendOrder;
