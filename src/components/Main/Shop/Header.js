import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Dimensions, Image, StyleSheet,
    TextInput
} from 'react-native';
import searchProduct from '../../../api/searchProduct';

import icLogo from '../../../media/appIcon/ic_logo.png';
import icmenu from '../../../media/appIcon/ic_menu.png';
import Global from '../../Global';


const { height } = Dimensions.get('window');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    onSearchProduct() {
        const { text } = this.state;
        searchProduct(text)
            .then(arr => {
                Global.setListSearch(arr);
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <View style={styleHeader.wrapp}>
                <View style={styleHeader.headr}>
                    <TouchableOpacity onPress={this.props.onOpen}>
                        <Image source={icmenu} style={styleHeader.iconStyle} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}> Shop Nguyễn Văn Trọng </Text>
                    <Image source={icLogo} style={styleHeader.iconStyle} />
                </View>
                <TextInput
                    blurOnSubmit
                    onSubmitEditing={() => this.onSearchProduct()}
                    onFocus={() => Global.gotoSearch()}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text} style={styleHeader.textStyle}
                    placeholder='Nhập sản phẩm tìm kiếm' underlineColorAndroid='#f0ffff'
                />
            </View>
        );
    }
}
const styleHeader = StyleSheet.create({
    wrapp: {
        height: height / 8,
        padding: 10,
        justifyContent: 'space-around',
        backgroundColor: '#329576'
    },
    headr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        height: height / 25,
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 10,
        color: 'gray',
        paddingVertical: 0,

    },
    iconStyle: {
        height: 25,
        width: 25
    }
});
export default Header;
