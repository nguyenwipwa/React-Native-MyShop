import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import StylesAndroid from '../../../../Styles/StylesAndroid';
import URL from '../../../URL';
import Global from '../../../Global';


import icLeft from '../../../../media/appIcon/back.png';
import icCartfull from '../../../../media/appIcon/cartfull.png';
import maxiIcon from '../../../../media/temp/sp1.jpeg';
import partyIcon from '../../../../media/temp/sp2.jpeg';


const { height, width } = Dimensions.get('window');
const { style1, styleProductDetail } = StylesAndroid;

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '', nameProduct: '', idType: '0', nameType: '', price: '0', color: '', material: '', description: '', images: []
        };
    }

    componentDidMount = () => {
        const { idProduct } = this.props;
        fetch(`${URL.URL_PRODUCT}?id=${idProduct}`) // eslint-disable-line
            .then(res => res.json())
            .then(resJSON => {
                const { id, nameProduct, idType, nameType, price, color, material, description, images } = resJSON;
                this.setState({ id, nameProduct, idType, nameType, price, color, material, description, images });
                console.log('====================================');
                console.log(resJSON.nameProduct);
                console.log('====================================');
            })
            .catch(err => console.log(err));
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    addThisProducToCart() {
        const product = {
            key: this.state.id,
            nameProduct: this.state.nameProduct,
            idType: this.state.idType,
            nameType: this.state.nameType,
            price: this.state.price,
            color: this.state.color,
            material: this.state.material,
            description: this.state.description,
            images: this.state.images,
            number: 1,
        };
        Global.addProductToCart(product);
    }
    render() {
        const {
            wrapper,
            header,
            content,
            imageStyle,
            viewImage,
            imageViewStyle,
            viewInfo,
            viewDescription,
            viewTop
        } = styleProductDetail;
        const { id, nameProduct, idType, nameType, price, color, material, description, images } = this.state;
        return (
            <View style={style1.containerGray}>
                <View style={wrapper}>
                    <View style={header}>
                        <TouchableOpacity onPress={this.goBack.bind(this)}>
                            <Image style={imageStyle} source={icLeft} />
                        </TouchableOpacity>
                        <Text />
                        <TouchableOpacity onPress={this.addThisProducToCart.bind(this)}>
                            <Image source={icCartfull} style={imageStyle} />
                        </TouchableOpacity>
                    </View>
                    <View style={content} >
                        <ScrollView>
                            <View style={{ justifyContent: 'space-around' }}>
                                <View style={viewTop}>
                                    <View style={viewImage}>
                                        <Swiper
                                            showsPagination
                                            width={width / 2.5}
                                            height={height / 3.5}
                                            style={{ borderRadius: 5 }}
                                        >
                                            <Image style={imageViewStyle} source={{ uri: (`${URL.URL_IMAGES}${images[0]}`).trim() }} />
                                            <Image style={imageViewStyle} source={{ uri: (`${URL.URL_IMAGES}${images[1]}`).trim() }} />
                                        </Swiper>
                                    </View>
                                    <View
                                        style={viewInfo}
                                    >
                                        <Text> Name: {nameProduct.toUpperCase()}</Text>
                                        <Text> Type: {idType}</Text>
                                        <Text> Price: {price}$</Text>
                                        <Text> Color: {color}</Text>
                                        <Text> Material: {material}</Text>
                                    </View>
                                </View>
                                <View style={viewDescription}>
                                    <Text>
                                        {description}
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* <Text onPress={this.goBack.bind(this)}> Back </Text> */}
            </View >
        );
    }
}
