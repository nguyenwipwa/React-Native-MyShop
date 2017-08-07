import React, { Component } from 'react';
import { Image, View, Text, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import sp1 from '../../../../media/temp/sp1.jpeg';
import getListProduct from '../../../../api/getListProduct';
import URL from '../../../URL';

import backIcon from '../../../../media/appIcon/backList.png';

const { height } = Dimensions.get('window');
export default class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: []
        };
    }
    componentDidMount() {
        getListProduct(this.props.category.id, 1)
            .then(arrProduct => this.setState({ listProduct: arrProduct }))
            .catch(err => console.log(err));
    }
    gotoDetail(idProduct) {
        const { navigator } = this.props;
        navigator.push({ name: 'PRODUCT_DETAIL', idProduct });
    }
    goBack() {
        const { navigator } = this.props;
        navigator.pop();
    }
    render() {
        const { category } = this.props;
        const { listProduct } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backIcon}
                        onPress={this.goBack.bind(this)}
                    >
                        <Image
                            style={styles.backSytle}
                            source={backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.titleStyle}> {category.name} </Text>
                    <View style={styles.both} />
                </View>
                <FlatList
                    style={styles.wrapper}
                    data={listProduct}
                    renderItem={({ item }) =>
                        <View style={styles.productInfo}>
                            <View style={styles.viewImage}>
                                <Image style={styles.imageStyle} source={{ uri: `${URL.URL_IMAGES}${item.images[0]}` }} />
                            </View>
                            <View style={styles.viewInfo}>
                                <Text style={styles.txtName}> {item.name.toUpperCase()}</Text>
                                <Text style={styles.textPrice}> {item.price}$ </Text>
                                <Text style={styles.txtMaterial}> {item.material.toUpperCase()}</Text>
                                <View style={styles.infoBottom}>
                                    <Text> Color {item.color} </Text>
                                    <View style={[styles.circleColor, { backgroundColor: item.color.toLowerCase() }]} />
                                    <TouchableOpacity onPress={() => this.gotoDetail(item.id)}>
                                        <Text style={styles.txtShow}> {'SHOW detail'.toUpperCase()} </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                />
                {/* <Text onPress={this.goBack.bind(this)}> Back </Text> */}
            </View >
        );
    }
}
const styles = EStyleSheet.create({
    txtName: {
        color: '#acabac',
        fontSize: 15,

    },
    textPrice: {
        color: 'red',

    },
    txtMaterial: {

    },
    txtShow: {
        color: '#b97b95',
        fontSize: 10,
        fontWeight: 'bold'

    },
    imageStyle: {
        width: '100%',
        height: height * 0.18,

    },
    viewImage: {
        width: '32%',
        padding: 5,

    },
    viewInfo: {
        width: '70%',
        justifyContent: 'space-between',
        padding: 5,


    },
    container: {
        flex: 1,
        backgroundColor: 'gray',
        padding: 10,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height * 0.05,
        padding: 5,
        backgroundColor: 'white',
    },
    wrapper: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    backSytle: {
        width: 30,
        height: '100%'
    },
    both: {
        width: '10%',
    },
    titleStyle: {
        color: '#e62117',
        fontWeight: 'bold'
    },
    productInfo: {
        padding: 10,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#edeced',
        width: '95%',

    },
    infoBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    circleColor: {
        width: 15,
        height: 15,
        borderRadius: 100,
        marginTop: 3,

    }
});
