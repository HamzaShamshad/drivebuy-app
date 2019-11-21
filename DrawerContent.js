import React, { Component } from 'react';
import { View, StyleSheet , Button , Text , Dimensions} from 'react-native';
import Signup from './src/components/screens/Signup';
import Login from './src/components/screens/Login';
import Map from './src/components/GoogleMaps/GoogleMaps';
import ListInput from './src/components/Listing/ListInput';
import { Actions } from 'react-native-router-flux';

const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export default class Content extends Component {

    onLogin(){
        Actions.Login()
    }

    onAdd(){
        Actions.List()
    }

    render () {
        return (
            <View style={ styles.container }>

                <View style={styles.topDrawer}>
                    <Text style={styles.drawerText} >Save Your location</Text>
                </View>

                <View style={styles.bottomDrawer}>
                    <View style={styles.forButton1}>
                        <Button 
                            // style={styles.buttonMenu}
                            title="Add Location"    
                            onPress={this.onAdd}
                                
                        />
                    </View>  

                    <View style={styles.forButton2}>
                        <Button 
                            title="Login Up!"  
                            onPress={this.onLogin}
                        />
                    </View> 
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff'
    },
    topDrawer: {
        flex: 2,
        backgroundColor: '#7cbbb9',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    drawerText: {
        fontSize: dimensions.fullWidth/18,
        // fontSize:35,
        color: '#fff'
    },
    bottomDrawer: {
        flex: 4,
        backgroundColor: '#fff',
        // paddingHorizontal: 50,
        // paddingVertical: 20,
         // margin: 40,
        // justifyContent: "center",
        // alignItems: "center",
        // width: "70%",
        // marginLeft: "15%",
        // marginBottom: "10%",
        // height: 300
        //  paddingTop: 120,
        
    },
    forButton1: {
        flex: 2,
        backgroundColor: '#fff',
        // paddingHorizontal: 50,
        // paddingVertical: 20,
         // margin: 40,
        justifyContent: "flex-end",
        // alignItems: "center",
        width: "60%",
        marginLeft: "15%",
        marginBottom: "5%",
        // height: 300
        //  paddingTop: 120
    },
    forButton2: {
        flex: 2,
        backgroundColor: '#fff',
        // paddingHorizontal: 50,
        // paddingVertical: 20,
         // margin: 40,
        justifyContent: "flex-start",
        // alignItems: "center",
        width: "60%",
        marginLeft: "15%",
        // marginBottom: "10%",
        // height: 300
        //  paddingTop: 120
    },
    buttonMenu:{
        // backgroundColor: "#d0d4ab",
        // marginBottom: 50,
        // color: "orange",
       

    }
});

// if (!this.state.isSignedIn && !this.state.isLoggedIn) 
//       return <Signup onSignInPress={this.signInhandler} letMego={this.GoToLogin}/>;
//     if (this.state.isSignedIn)
//       return <Login onLoginInPress={this.logInhandler} />;
//     if (this.state.isLoggedIn) 
//       return <Map />;