import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DialogBox from 'react-native-dialogbox';

export default class ChangeInfo extends Component {
    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }
    handleOnPress = () => {
        // alert 
        // this.dialogbox.alert(1);
        this.dialogbox.alert('promise example').then(() => this.dialogbox.alert('dismissed'));
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#195691' }}>
                <Text> ChangeInfo </Text>
                <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                    <Text> go back </Text>
                </TouchableOpacity>
                <Text style={{}} onPress={this.handleOnPress}>click me !</Text>

                {/** dialogbox component */}
                <DialogBox ref={dialogbox => { this.dialogbox = dialogbox; }} />
            </View>
        );
    }
}
