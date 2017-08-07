import React, { Component } from 'react';
import { ScrollView, View, FlatList } from 'react-native';
import StylesAndroid from '../../Styles/StylesAndroid';
import HeaderView from './HeaderView';
import OrderModel from './OrderModel';
import getOrderHistory from '../../api/getOrderHistory';
import getToken from '../../api/getToken';

import icRight from '../../media/appIcon/backs.png';

const styleHeader = StylesAndroid.style1;

export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOrder: [],
        };
    }
    componentDidMount = () => {
        getToken()
            .then(token => getOrderHistory(token))
            .then(arrOrder => this.setState({ arrOrder }));
        // this.drawer.open();
        // console.log(styleHeader);
    }
    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }
    render() {
        const { arrOrder } = this.state;
        return (
            <View style={styleHeader.containerGray}>
                <HeaderView
                    imgRight={icRight} clickRight={this.goBackToMain.bind(this)}
                >  OrderHistory
                </HeaderView>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={arrOrder}
                    renderItem={({ item }) => (
                        <OrderModel id={item.id} time={item.date_order} status={item.status} total={item.total} />
                    )}
                />
                {/* <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <OrderModel id={'ORD0001'} time={'2017-07-39 08:30:13'} status={'Pending'} total={'392$'} />
                        <OrderModel id={'ORD0001'} time={'2017-07-39 08:30:13'} status={'Pending'} total={'392$'} />
                        <OrderModel id={'ORD0001'} time={'2017-07-39 08:30:13'} status={'Pending'} total={'392$'} />
                        <OrderModel id={'ORD0001'} time={'2017-07-39 08:30:13'} status={'Pending'} total={'392$'} />
                        <OrderModel id={'ORD0001'} time={'2017-07-39 08:30:13'} status={'Pending'} total={'392$'} />
                    </View>
                </ScrollView> */}
            </View>
        );
    }
}
