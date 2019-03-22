/**
 * Aday Application
 *
 * @flow
 */
import store from './src/store';

import {Provider} from "react-redux";
import React, {Component} from 'react';
import {
    AppRegistry,
    Text
} from 'react-native';

import App from './src/App';
console.disableYellowBox = true;
Text.defaultProps.allowFontScaling=false;

class Aday extends Component {

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    };
}

AppRegistry.registerComponent('Aday', () => Aday);
