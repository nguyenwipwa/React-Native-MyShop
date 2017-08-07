import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import DialogBox from 'react-native-dialogbox';
import HeaderView from '../../components/OrderHistory/HeaderView';
import StylesAndroid from '../../Styles/StylesAndroid';
import getToken from '../../api/getToken';
import changeInfo from '../../api/changeInfo';
import Global from '../Global';

import icRight from '../../media/appIcon/backs.png';

const { styleChangeInfo } = StylesAndroid;
export default class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        console.log('====================================');
        console.log(user);
        console.log('====================================');
        this.state = {
            name: user.name,
            address: user.address,
            phoneNumber: user.phone
        };
    }
    onChangeInfo() {
        const { name, address, phoneNumber } = this.state;
        getToken()
            .then(token => changeInfo(token, name, phoneNumber, address))
            .then(user => { this.handleOnPress('Đổi thành công!'); Global.onSignIn(user); })
            .catch(err => this.handleOnPress('Đổi thất bại!'));
    }
    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }
    handleOnPress(message) {
        this.dialogbox.alert(message).then(() => {
            this.goBackToMain();
        });
    }
    render() {
        const { container, viewContent, txtInput, btnButton, txtButton } = styleChangeInfo;
        const { name, address, phoneNumber } = this.state;
        return (
            <View style={container}>
                <HeaderView
                    imgRight={icRight} clickRight={this.goBackToMain.bind(this)}
                >  OrderHistory
                </HeaderView>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-around'
                    }}
                >
                    <View style={viewContent}>
                        <TextInput
                            style={txtInput}
                            underlineColorAndroid='transparent'
                            placeholder='Nhập tên của bạn'
                            maxLength={20}
                            value={name}
                            onChangeText={txt => this.setState({ name: txt })}

                        />
                        <TextInput
                            style={txtInput}
                            underlineColorAndroid='transparent'
                            placeholder='Nhập địa chỉ'
                            maxLength={50}
                            value={address}
                            onChangeText={txt => this.setState({ address: txt })}
                        />
                        <TextInput
                            style={txtInput}
                            underlineColorAndroid='transparent'
                            placeholder='Nhập số điện thoại'
                            maxLength={20}
                            value={phoneNumber}
                            onChangeText={txt => this.setState({ phoneNumber: txt })}
                        />

                        <TouchableOpacity style={btnButton} onPress={this.onChangeInfo.bind(this)}>
                            <Text style={txtButton}>Xác nhận đổi thông tin</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/** dialogbox component */}
                <DialogBox ref={dialogbox => { this.dialogbox = dialogbox; }} />
            </View>
        );
    }
}
