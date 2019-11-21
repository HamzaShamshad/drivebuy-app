/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
// Provider connects react app to redux store, here it will also wrap the App component, so we will mount provider as root component
import { Provider } from 'react-redux'; 
import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/store/configureStore';

const store = configureStore();

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);