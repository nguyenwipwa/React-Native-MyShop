import URL from '../components/URL';

const initData = () => (
    fetch(URL.URL_INDEX) // eslint-disable-line
        .then(res => res.json())

);
export default initData;
