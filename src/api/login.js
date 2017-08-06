import URL from '../components/URL';

const login = (email, password) => (
    fetch(URL.URL_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(res => res.json())
);
module.exports = login;

