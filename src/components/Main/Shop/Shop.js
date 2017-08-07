import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home/Home';
import Contact from './Contact/Contact';
import Cart from './Cart/Cart';
import Search from './Search/Search';
import Header from './Header';
import Global from '../../Global';
import initData from '../../../api/initData';
import saveCart from '../../../api/saveCart';
import getCart from '../../../api/getCart';


import homeIcon0 from '../../../media/appIcon/home0.png';
import homeIcon from '../../../media/appIcon/home.png';
import cart0 from '../../../media/appIcon/cart0.png';
import cart from '../../../media/appIcon/cart.png';
import search0 from '../../../media/appIcon/search0.png';
import search from '../../../media/appIcon/search.png';
import contact0 from '../../../media/appIcon/contact0.png';
import contact from '../../../media/appIcon/contact.png';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
            types: [],
            topProduct: [],
            cartArray: [],
        };
        Global.addProductToCart = this.addProductToCart.bind(this);
        Global.deleteCart = this.deleteCart.bind(this);
        Global.incrNumber = this.incrNumber.bind(this);
        Global.decrNumber = this.decrNumber.bind(this);
        Global.gotoSearch = this.gotoSearch.bind(this);
    }
    componentDidMount() {
        initData()
            .then(resJSON => {
                const { type, product } = resJSON;
                this.setState({ types: type, topProduct: product });
            })
            .catch(err => console.log(err));
        getCart()
            .then(cartArray => this.setState({ cartArray }));
    }
    gotoSearch() {
        this.setState({ selectedTab: 'search' });
    }
    incrNumber(key) {
        const newCart = this.state.cartArray.map(e => {
            if (e.key === key) {
                e.number += 1;
            }
            return e;
        });
        this.setState({ cartArray: newCart }, () => saveCart(newCart));
    }
    decrNumber(key) {
        const newCart = this.state.cartArray.map(e => {
            if (e.key === key && e.number > 1) {
                e.number -= 1;
            }
            return e;
        });
        this.setState({ cartArray: newCart }, () => saveCart(newCart));
    }
    deleteCart(key) {
        const cartArray = this.state.cartArray.filter(e => e.key !== key);
        this.setState({ cartArray }, () => saveCart(cartArray));
    }
    addProductToCart(product) {
        const cartArray = this.state.cartArray;
        let isChuaTonTai = true;
        const newCart = cartArray.map(e => {
            if (e.key === product.key) {
                e.number += 1;
                isChuaTonTai = false;
            }
            return e;
        });
        if (isChuaTonTai) {
            cartArray.push(product);
            this.setState({ cartArray },
                () => saveCart(cartArray));
        } else {
            this.setState({ cartArray: newCart }, () => saveCart(cartArray)
            );
        }
    }

    openMenu() {
        const { open } = this.props;
        open();
    }

    render() {
        const { cartArray, types, topProduct } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <Header onOpen={this.openMenu.bind(this)} />
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        renderIcon={() => <Image style={styleApp.iconStyle} source={homeIcon0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={homeIcon} />}
                        title="Home"
                        onPress={() => this.setState({ selectedTab: 'home' })}
                    >
                        <Home types={types} topProduct={topProduct} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        renderIcon={() => <Image style={styleApp.iconStyle} source={cart0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={cart} />}
                        selected={this.state.selectedTab === 'cart'}
                        title="Cart"
                        badgeText={cartArray.length}
                        onPress={() => this.setState({ selectedTab: 'cart' })}
                    >
                        <Cart cartArray={cartArray} />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        renderIcon={() => <Image style={styleApp.iconStyle} source={search0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={search} />}
                        selected={this.state.selectedTab === 'search'}
                        title="Search"
                        onPress={() => this.setState({ selectedTab: 'search' })}
                    >
                        <Search />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        renderIcon={() => <Image style={styleApp.iconStyle} source={contact0} />}
                        renderSelectedIcon={() =>
                            <Image style={styleApp.iconStyle} source={contact} />}
                        selected={this.state.selectedTab === 'contact'}
                        title="Contact"
                        onPress={() => this.setState({ selectedTab: 'contact' })}
                    >
                        <Contact />
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}
const styleApp = StyleSheet.create({
    iconStyle: {
        width: 20, height: 20
    }
});
export default Shop;
