import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import StylesAndroid from '../../../../Styles/StylesAndroid';
import Global from '../../../Global';


const styles = StylesAndroid.styleCart;
const { styleTxt, styleButton } = StylesAndroid;
class CartItem extends Component {

    gotoDetail(idProduct) {
        const { navigator } = this.props;
        console.log('====================================');
        console.log(idProduct);
        console.log('====================================');
        navigator.push({ name: 'PRODUCT_DETAIL', idProduct });
    }
    render() {
        const { viewTop, viewBottom, viewImage, viewInfo, viewNumber, wrapper, imgStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={viewImage}>
                    <Image style={imgStyle} source={this.props.img} />
                </View>
                <View style={viewInfo}>
                    <View style={viewTop} >
                        <Text> {this.props.name} </Text>
                        <TouchableOpacity
                            onPress={() => {
                                Global.deleteCart(this.props.id);
                            }}
                        >
                            <Text> X</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styleTxt.txtPrice}> {this.props.price} </Text>
                    <View style={viewBottom}>
                        <View style={viewNumber}>
                            <TouchableOpacity
                                onPress={() => {
                                    Global.incrNumber(this.props.id);
                                }}
                            >
                                <Text style={styleButton.buttonSmall}> + </Text>
                            </TouchableOpacity>
                            <Text> {this.props.number} </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    Global.decrNumber(this.props.id);
                                }}
                            >
                                <Text style={styleButton.buttonSmall}> - </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.gotoDetail(this.props.id)}>
                            <Text style={styleTxt.txtShow}> {'Show Details'.toUpperCase()} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default CartItem;
