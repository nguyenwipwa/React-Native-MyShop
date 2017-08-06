import URL from '../components/URL';

const register = (email, name, password) => (
    fetch(URL.URL_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, name, password })
    })
);
module.exports = register;
