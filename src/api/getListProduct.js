import URL from '../components/URL';

const getListProduct = (idType, page) => {
    const url = `${URL.URL_LIST_PRODUCT}?id_type=${idType}&page=${page}`;
    return fetch(url)
        .then(res => res.json());
};

export default getListProduct;
