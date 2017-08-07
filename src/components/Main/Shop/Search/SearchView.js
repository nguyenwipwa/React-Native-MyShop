import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import StylesAndroid from '../../../../Styles/StylesAndroid';
import SearchItem from './SearchItem';
import Global from '../../../Global';
import URL from '../../../URL';


const styles = StylesAndroid.styleCart;
export default class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSearch: []
        };
        Global.setListSearch = this.setListSearch.bind(this);
    }
    setListSearch(arr) {
        this.setState({ listSearch: arr || [] });
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    render() {
        const { listSearch } = this.state;
        return (
            <View style={styles.container} >
                <FlatList
                    data={listSearch}
                    renderItem={({ item }) => (
                        <SearchItem id={item.id} navigator={this.props.navigator} name={item.name} color={item.color} material={item.material} price={item.price} img={{ uri: `${URL.URL_IMAGES}${item.images[0]}` }} />
                    )}
                />
            </View>
        );
    }
}

