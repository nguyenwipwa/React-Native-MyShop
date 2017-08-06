import URL from '../components/URL';

const login = (token) => (
    fetch(URL.URL_CHECK_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    }).then(res => res.json())
);
module.exports = login;

