import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import DialogBox from 'react-native-dialogbox';
import {
    View, Text, TouchableOpacity, Dimensions, Image, StyleSheet
    , TextInput
} from 'react-native';
import register from '../../api/register';
import login from '../../api/login';
import Global from '../Global';
import saveToken from '../../api/saveToken';
import getToken from '../../api/getToken';

import icLogo from '../../media/appIcon/ic_logo.png';
import icBack from '../../media/appIcon/back_white.png';

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#329576',
        padding: 6,
        justifyContent: 'space-between',
        height: '100%'
    },
    viewInput: {
        flex: 1,
        alignItems: 'center',
        marginTop: '30%'

    },
    viewButton: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    },
    styleTextInput: {
        width: '80%',
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 15,
        // textShadowColor: 'red',
        // textShadowOffset: { width: 0, height: 5 }

    },
    styleButtonLeft: {
        borderColor: 'white',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        marginRight: 1
    },
    styleButtonRight: {
        borderColor: 'white',
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        marginLeft: 1,
    },
    styleButtonTransfer: {
        borderRadius: 20,
        borderWidth: 0.6,
        borderColor: 'white',
        width: '80%',
        height: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%'
    },
    inactiveStyle: {
        color: '#34aa77'
    },
    activeStyle: {
        color: '#d0cfd0'
    },
    buttonText: {
        color: 'white'
    }

});

const { height } = Dimensions.get('window');
export default class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignIn: true,
            name: '',
            mail: '',
            password: '',
            repassword: ''
        };
    }
    componentDidMount() {
        getToken()
            .then(a => console.log(a));
    }
    onSignIn() {
        const { email, password } = this.state;
        login(email, password)
            .then(res => {
                console.log(res.user);
                Global.onSignIn(res.user);
                saveToken(res.token);
                this.showDialog2('Đăng nhập thành công!')
                    .then(() => this.goBackToMain());
            })
            .catch(err => this.showDialog2('Đăng nhập thất bại!'));
    }
    signIn() {
        this.setState({ isSignIn: true });
    }
    signUp() {
        this.setState({ isSignIn: false });
    }
    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }
    registerUser() {
        const { name, email, password, repassword } = this.state;
        register(email, name, password)
            .then(res => {
                if (res._bodyText === 'THANH_CONG') {
                    this.setState({ isSignIn: true });
                    this.showDialog('Thông báo', 'Đăng kí thành Công!');
                } else {
                    this.showDialog('Thông báo', 'Đăng kí thất bại!');
                }
            });
    }

    showDialog(title, message) {
        this.dialogbox.alert(message);
    }
    showDialog2(message) {
        return this.dialogbox.tip({
            title: 'Thông báo',
            content: message,
            btn: {
                text: 'Ok'
            }
        });
    }
    render() {
        const isSignIn = this.state.isSignIn;
        const signInJSX =
            (
                <View style={styles.viewInput}>
                    <TextInput
                        placeholderTextColor='#e4e2e4'
                        placeholder='Nhập tài khoản' underlineColorAndroid='transparent'
                        style={styles.styleTextInput}
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput
                        secureTextEntry
                        placeholderTextColor='#e4e2e4'
                        placeholder='Nhập mật khẩu' underlineColorAndroid='transparent'
                        style={styles.styleTextInput}
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                    />
                    <TouchableOpacity
                        style={styles.styleButtonTransfer}
                        onPress={this.onSignIn.bind(this)}
                    >
                        <Text style={styles.buttonText}> ĐĂNG NHẬP NGAY </Text>
                    </TouchableOpacity>
                </View>
            );
        const signUpJSX =
            (
                <View style={styles.viewInput}>
                    <TextInput
                        placeholderTextColor='#e4e2e4'
                        placeholder='Nhập tên của bạn' underlineColorAndroid='transparent'
                        style={styles.styleTextInput}
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <TextInput
                        placeholderTextColor='#e4e2e4'
                        placeholder='Nhập tài khoản email' underlineColorAndroid='transparent'
                        style={styles.styleTextInput}
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput
                        secureTextEntry
                        placeholderTextColor='#e4e2e4'
                        placeholder='Nhập mật khẩu' underlineColorAndroid='transparent'
                        style={styles.styleTextInput}
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                    />
                    <TextInput
                        secureTextEntry
                        placeholderTextColor='#e4e2e4'
                        placeholder='Nhập lại mật khẩu' underlineColorAndroid='transparent'
                        style={styles.styleTextInput}
                        value={this.state.repassword}
                        onChangeText={text => this.setState({ repassword: text })}
                    />
                    <TouchableOpacity
                        style={styles.styleButtonTransfer}
                        onPress={this.registerUser.bind(this)}
                    >
                        <Text style={styles.buttonText}> ĐĂNG KÍ NGAY </Text>
                    </TouchableOpacity>
                </View>
            );
        const mainJSX = this.state.isSignIn ? signInJSX : signUpJSX;
        return (
            <View style={styles.container}>
                {/*header  */}
                <View style={styleHeader.headr}>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={icBack} style={styleHeader.iconStyle} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}> Shop Nguyễn Văn Trọng </Text>
                    <Image source={icLogo} style={styleHeader.iconStyle} />
                </View>
                {/*Content  */}
                {mainJSX}
                {/*bottom  */}
                <View style={styles.viewButton}>
                    <TouchableOpacity
                        style={styles.styleButtonLeft}
                        onPress={this.signIn.bind(this)}
                    >
                        <Text
                            style={isSignIn ? styles.inactiveStyle : styles.activeStyle}
                        >
                            ĐĂNG NHẬP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.styleButtonRight}
                        onPress={this.signUp.bind(this)}
                    >
                        <Text
                            style={isSignIn ? styles.activeStyle : styles.inactiveStyle}
                        >
                            ĐĂNG KÍ </Text>
                    </TouchableOpacity>
                </View>
                <DialogBox ref={dialogbox => { this.dialogbox = dialogbox; }} />
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
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle: {
        height: height / 25,
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 10,
        color: 'gray'

    },
    iconStyle: {
        height: 25,
        width: 25
    }
});
