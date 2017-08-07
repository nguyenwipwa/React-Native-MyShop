import URL from '../components/URL';

const changeInfo = (token, name, phone, address) => (
    fetch(URL.URL_CHANGE_INFO, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token, name, phone, address })
    }).then(res => res.json())
);
module.exports = changeInfo;

