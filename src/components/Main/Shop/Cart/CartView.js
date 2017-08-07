import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import DialogBox from 'react-native-dialogbox';
import CartItem from './CartItem';
import URL from '../../../URL';
import sendOrder from '../../../../api/sendOrder';
import getToken from '../../../../api/getToken';
import saveCart from '../../../../api/saveCart';
import Global from '../../../Global';

import StylesAndroid from '../../../../Styles/StylesAndroid';

const styles = StylesAndroid.styleCart;
const { styleButton, styleTxt } = StylesAndroid;
class Cart extends Component {

    async onSendOrder() {
        try {
            const token = await getToken();
            const { cartArray } = this.props;
            const arrayDetail = cartArray.map(e => ({ id: e.key, quantity: e.number }));
            const kq = await sendOrder(token, arrayDetail);
            if (kq === 'THEM_THANH_CONG') {
                await saveCart([]);
                cartArray.forEach((element) => {
                    Global.deleteCart(element.key);
                }, this);
                this.showDialog('Đơn hàng đã gửi thành công!\n Cảm ơn bạn ^^');
            } else {
                console.log('THEM THAT BAI');
            }
        } catch (e) {
            console.log(e);
        }
    }
    showDialog(message) {
        // this.dialogbox.alert(message);
        // this.dialogbox.alert(1, 'two', message);
        this.dialogbox.tip({
            title: 'Thông báo',
            content: message,
            btn: {
                text: 'Ok'
            }
        });
    }
    render() {
        const { cartArray, navigator } = this.props;
        const arrTotal = cartArray.map(e => e.number * e.price);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={styles.container}>
                <DialogBox ref={dialogbox => { this.dialogbox = dialogbox; }} />
                <FlatList
                    data={cartArray}
                    renderItem={({ item }) => <CartItem navigator={navigator} id={item.key} number={item.number} img={{ uri: `${URL.URL_IMAGES}${item.images[0]}` }} name={item.nameProduct} price={item.price} />}
                />
                <TouchableOpacity style={styleButton.buttonDisplay} onPress={() => cartArray.length ? this.onSendOrder() : this.showDialog('Giỏ hàng rỗng\n Vui lòng mua hàng và thử lại!')}>
                    <Text style={[styleTxt.txtWhite, styleTxt.txtBold]}> TỔNG TIỀN: {total}$ </Text>
                    <Text style={[styleTxt.txtWhite, styleTxt.txtBold]}>THANH TOÁN NGAY</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Cart;
