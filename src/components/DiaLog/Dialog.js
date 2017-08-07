import React, { Component } from 'react';
import DialogBox from 'react-native-dialogbox';

export default class Dialog extends Component {
    showDialog(message) {
        this.dialogbox.tip({
            title: 'Thông báo',
            content: message,
            btn: {
                text: 'done'
            }
        });
    }
    render() {
        return (
            <DialogBox ref={dialogbox => { this.dialogbox = dialogbox; }} />
        );
    }

}
