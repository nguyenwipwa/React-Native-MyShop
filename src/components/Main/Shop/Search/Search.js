import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';
import SearchView from './SearchView';
import ProductDetail from '../ProductDetail/ProductDetail';

class Search extends Component {
    render() {
        const { types, topProduct } = this.props;
        return (
            <Navigator
                initialRoute={{ name: 'SEARCH_VIEW' }}
                renderScene={(route, navigator) => {
                    switch (route.name) {
                        case 'SEARCH_VIEW': return <SearchView navigator={navigator} />;
                        case 'PRODUCT_DETAIL': return <ProductDetail navigator={navigator} idProduct={route.idProduct} />;
                        default: return;
                    }
                }}
            />
        );
    }
}

export default Search;
