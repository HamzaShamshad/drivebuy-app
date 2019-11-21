/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
} from 'react-native';
import Tags from './src/components/Tags/TagsSearch'
import RouteCart from "./src/components/cart/RouteCart"
import configureStore from "./src/redux/store/index"
import {Provider} from "react-redux"
const store = configureStore()
export default class App extends React.Component  {
  render(){
    return (
      <View >
          <View style={{flexDirection: 'column', height: 1000, padding: 10}}>  
                 
            <Provider store={store}> 
              <RouteCart/>
              {/* <Tags/>*/}
            </Provider>

        </View>
      </View>
  );
  }
  
};