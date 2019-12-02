import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import Tags from './Tags'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {userDetail} from "../../redux/actions/userDetail"
import {addToList,removeFromList} from "../../redux/actions/index"

import Geolocation from '@react-native-community/geolocation';
class ElectronicsScreen extends Component {
    static navigationOptions = {
        headerTitle: 'Available Locations'
    }

    watchID = null;
    cities = null;
    i=1;

    constructor(props) {
        super(props);

        this.state = {
          latitude: 'unknown',
          longitude: 'unknown',
          loading: true
        };

        Geolocation.getCurrentPosition(
            (position) => {
              console.log("current Position is:     " , position);
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
        );
    }
  
  
    componentDidMount = () => {
        this.watchID = Geolocation.watchPosition( 
            (position) => {
                // this.setState({
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                // });
                console.log("watch Position is:     " , position);
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 , distanceFilter: 1}
        );

        this.setState({
            loading: true,
        });

        this.getLocation();
    }

    componentWillUnmount = () => {
        console.log("watchButton before:  " , this.watchID);
        Geolocation.clearWatch(this.watchID);
        console.log("watchButton after:  " , this.watchID);
    }
    

    async MapsApiCall(JsonObj) {

        const url = 'https://space-rental.herokuapp.com/users/location_call';
      
        try {
            const response = await fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(JsonObj), // data can be `string` or {object}!
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const json = await response.json();
            console.log('Results are :', JSON.stringify(json));
            
            this.props.userDetail(json);
     
            console.log('state saved is :', this.props.userObject);
            console.log('cites  are      ' , this.props.userObject[0].city )

            this.cities = this.props.userObject[0].city;
        } 
        catch (error) {
            console.error('Error in call:', error);
        }
    }

    async getLocation(){
        
        const obj = {};
        obj["id"] = this.props.userObject[0].user.id;
        obj["list_num"] = this.i;
  
        await this.MapsApiCall(obj);

        this.setState({
            loading: false,
        });
    }

    getNewlocs = () => {
        this.i = this.i + 1;
        if(this.i == 5)
            this.i=1;
        this.getLocation();

    }

    render() {

        return (
            
            <View style={styles.container}>

                {this.state.loading ? 
                    (<ActivityIndicator />) : (
                        <View>
                            <Tags chngeLocs={this.getNewlocs} products={this.cities} onPress={this.props.addItemToCart} />
                        </View>
                        )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return {
      userObject: state.user
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addItemToCart: payload => addToList(payload),
    removeItemFromCart: payload => removeFromList(payload),
    userDetail: obj => userDetail(obj)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ElectronicsScreen);