import URL from '../components/URL';

const searchProduct = (key) => {
    const url = `${URL.URL_SEARCH_PRODUCT}?key=${key}`;
    return fetch(url)
        .then(res => res.json());
};
export default searchProduct;
