import React from 'react';
import { View } from 'react-native';

import RouteCart from "./src/components/cart/RouteCart"

export default class App extends React.Component  {
  render(){
 
    return (
      <View >
          <View style={{flexDirection: 'column', height: 1000, padding: 10}}>

              <RouteCart/>

        </View>
      </View>
  );
  }
};