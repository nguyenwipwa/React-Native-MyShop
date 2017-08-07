import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import CartItem from './CartItem';
import URL from '../../../URL';

import StylesAndroid from '../../../../Styles/StylesAndroid';

const styles = StylesAndroid.styleCart;
const { styleButton, styleTxt } = StylesAndroid;
class Cart extends Component {
    render() {
        const { cartArray, navigator } = this.props;
        const arrTotal = cartArray.map(e => e.number * e.price);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={styles.container}>
                <FlatList
                    data={cartArray}
                    renderItem={({ item }) => <CartItem navigator={navigator} id={item.key} number={item.number} img={{ uri: `${URL.URL_IMAGES}${item.images[0]}` }} name={item.nameProduct} price={item.price} />}
                />
                <TouchableOpacity style={styleButton.buttonDisplay}>
                    <Text style={[styleTxt.txtWhite, styleTxt.txtBold]}> TỔNG TIỀN: {total}$ </Text>
                    <Text style={[styleTxt.txtWhite, styleTxt.txtBold]}>THANH TOÁN NGAY</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Cart;
