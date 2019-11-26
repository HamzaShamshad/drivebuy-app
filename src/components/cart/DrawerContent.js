import React from 'react';
import { View, Text, StyleSheet , Dimensions} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}
export default class DrawerContent extends React.Component {
    goHome(){
        Actions.home()
    }
    goLogin(){
        Actions.login()
    }
    goSignup(){
        Actions.signup()
    }
    goCart(){
        Actions.show()
    }
    goAvailible(){
        Actions.tags()
    }
    goProfile(){
        Actions.profile()
    }
    goMaps(){
        Actions.maps()
    }
    render(){
        return (
            <View style={ styles.container }>
                <View style={styles.topDrawer}>
                    <Text style={styles.drawerText}>Location Saving</Text>
                    <Text style={styles.drawerText}>Application</Text>
                </View>
                <View style={styles.bottomDrawer}>
                    <Button color="white" style={styles.button1st} onPress={this.goHome}>Home</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goCart}>Saved</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goAvailible}>Availible</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goProfile}>Profile</Button>
                    <Button color="white" style={styles.buttonMenu} onPress={this.goMaps}>Maps</Button>

                </View>
            </View>
            );
            }        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'indigo',
    }, 
    topDrawer: {
        flex: 2,
        backgroundColor: 'indigo',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    drawerText: {
        fontSize: dimensions.fullWidth/20,
        color: '#fff',
    },

    bottomDrawer: {
        flex: 10,
        alignItems: 'center',
        backgroundColor: '#fff',    
    },
    button1st: {
        backgroundColor: "indigo",
        marginTop: "6%",
        width: "75%",
    },
    buttonMenu:{
        backgroundColor: "indigo",  
        marginTop: "6%",
        width: "75%",
    }
});