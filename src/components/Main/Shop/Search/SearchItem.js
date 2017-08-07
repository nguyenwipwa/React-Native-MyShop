import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import StylesAndroid from '../../../../Styles/StylesAndroid';

const { stylesSearch } = StylesAndroid;

class CartItem extends Component {
    gotoProductDetail(idProduct) {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL', idProduct });
    }
    render() {
        return (
            <View style={stylesSearch.wrapper}>
                <View style={stylesSearch.productInfo}>
                    <View style={stylesSearch.viewImage}>
                        <Image style={stylesSearch.imageStyle} source={this.props.img} />
                    </View>
                    <View style={stylesSearch.viewInfo}>
                        <Text style={stylesSearch.txtName}> {this.props.name.toUpperCase()}</Text>
                        <Text style={stylesSearch.textPrice}> {this.props.price}$ </Text>
                        <Text style={stylesSearch.txtMaterial}> {this.props.material.toUpperCase()}</Text>
                        <View style={stylesSearch.infoBottom}>
                            <Text> Color </Text>
                            <View style={[stylesSearch.circleColor, { backgroundColor: this.props.color.toLowerCase() }]} />
                            <TouchableOpacity onPress={() => this.gotoProductDetail(this.props.id)} >
                                <Text style={stylesSearch.txtShow}> {'Show detail'.toUpperCase()} </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        );
    }
}

export default CartItem;
