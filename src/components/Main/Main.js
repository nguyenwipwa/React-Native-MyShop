import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import Menu from './Menu';
import Shop from './Shop/Shop';
import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';
import Global from '../Global';
import ChangeInfo from '../ChangeInfo/ChangeInfo';


export default class Main extends Component {

    componentDidMount = () => {
        getToken()
            .then(token => token ? checkLogin(token)
                .then(res => Global.onSignIn(Global.user = res.user))
                : console.log(token)
            );
    }
    openControlPanel = () => {
        this.drawer.open();
    };

    closeControlPanel = () => {
        this.drawer.close();
    };
    render() {
        const drawerStyles = {
            drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
            main: { paddingLeft: 3 },
        };
        const { navigator } = this.props;
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<Menu navigator={navigator} />}
                openDrawerOffset={0.4} // 20% gap on the right side of drawer
                panCloseMask={0.4}
                closedDrawerOffset={-3}
                tapToClose
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}
            >
                 <Shop open={this.openControlPanel.bind(this)} /> 
                {/* <ChangeInfo open={this.openControlPanel.bind(this)} /> */}
            </Drawer>

        );
    }
}

