import React, { Component } from "react";
import {  StyleSheet, View , Text } from "react-native";
import MapView, { PROVIDER_GOOGLE , Polyline , Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNGooglePlaces from 'react-native-google-places';

import {Actions} from 'react-native-router-flux';
import DropdownAlert from 'react-native-dropdownalert';

import { connect } from "react-redux";
import {saveLocation} from "../../redux/actions/userLoc"
import { bindActionCreators } from 'redux';

import PlaceDetail  from './PlaceDetail'

class Home extends Component {
    constructor(props) {
      super(props);
      this.flashMessage()
      this.state = {
        mycoords: [
          {
            latitude: this.props.loc[0].coords.latitude,
            longitude: this.props.loc[0].coords.longitude,
          }
        ],
        currentCoords: {
          latitude: this.props.loc[0].coords.latitude,
          longitude: this.props.loc[0].coords.longitude,
        },
        availableLocations: null,
        selectedPlace: null,
      };
    }

    ActionOnLocation(){
      Actions.tags()
    }
    

    componentDidMount = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            currentCoords: {
              latitude:  position.coords.latitude,//this.state.latitude,
              longitude: position.coords.longitude,//this.state.longitude,
            }
          });
        },
        (error) => alert(error.message),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 2000 }
      );
    }

    degreesToRadians(degrees){
      return degrees * Math.PI / 180;
    }

    getDistanceBetweenPoints(lat1, lng1, lat2, lng2){
      // The radius of the planet earth in meters
      const R = 6378137;
      let dLat = this.degreesToRadians(lat2 - lat1);
      let dLong = this.degreesToRadians(lng2 - lng1);
      let a = Math.sin(dLat / 2)
              *
              Math.sin(dLat / 2) 
              +
              Math.cos(this.degreesToRadians(lat1)) 
              * 
              Math.cos(this.degreesToRadians(lat1)) 
              *
              Math.sin(dLong / 2) 
              * 
              Math.sin(dLong / 2);
  
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance = R * c;
  
      return distance;
    }

    nearByLocations = null;

    async LocationsApiCall() {
      const url = 'https://space-rental.herokuapp.com/users/19/all_locations';
      try {
        const res = await fetch(url);
        const responce = await res.json();
        this.nearByLocations = responce.city;
        console.log('locations are:-------    ' , responce.city);
      } 
      catch (error) {
          console.error('Error in gecoding call:', error);
      }
    }

    async getLocations(obj){

      await this.LocationsApiCall();

      const radius = 2000; 
      let withInDistance = [];

      this.nearByLocations.map((loc) => {
        
        var distanceInMeters = this.getDistanceBetweenPoints(obj.latitude , obj.longitude , loc.geometry.location.lat ,  loc.geometry.location.lng);
        
        if(distanceInMeters < radius ){
          withInDistance = withInDistance.concat(loc)
        }
      });

      this.setState({
        currentCoords: obj,
        availableLocations: withInDistance,
      });

    }

    setNewLocation(coordinate) {
      
      const obj = { latitude: coordinate.latitude , longitude: coordinate.longitude };
      this.getLocations(obj);

    }
    
    flashMessage(){
        const {message, user} = this.props.reducer_data[0]
        console.log("USER", user.first_name)
        if(message)
        {
          setTimeout(() => {
              this.dropDownAlertRef.alertWithType(
                'success',
                'Congratulation',
                `${message} as ${user.first_name}`,
              );
            }, 500);
        }
    }
      
    modalClosedHandler = () => {
      this.setState({
        selectedPlace: null
      });
    };

    showDetails(placeResult){
      // console.log("result of marker clicked is    " , placeResult);
      this.setState({
        selectedPlace: placeResult,
      });
    }

    createMarkers = (results) => {

        if (results === null){
            return( 
                <View></View> 
            )
        }

        return results.map((loc , index) => {
          console.log("coordinates of location    " , index , " are     " , loc.geometry);
          console.log("overall location   is     " , loc);
          return (
            <View>
              <Marker
                    coordinate={{latitude: loc.geometry.location.lat , longitude:  loc.geometry.location.lng}}
                    onPress={() => this.showDetails(loc)}
                    title={"these are locations"}
              />
            </View> 
          )
        })
    }

    render() {
      if(this.state.selectedPlace === null){
          console.log('selected places is         ' , this.state.selectedPlace)        
          return (
            <View style = {styles.container}>

                <MapView 
                    provider ={PROVIDER_GOOGLE}
                    style={styles.map} 
                    showsCompass={true}
                    showsMyLocationButton={true}
                    // showsUserLocation = {true}
                    // onUserLocationChange={event => this.setNewLocation(event.nativeEvent.coordinate)}
                    onPress={ (event) => this.setNewLocation(event.nativeEvent.coordinate) }
                    
                    initialRegion={{
                      latitude: 31.4728123 , //this.props.loc[0].coords.latitude,
                      longitude:  74.2688898 , //this.props.loc[0].coords.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>

                    <Marker
                        coordinate={{ latitude: this.props.loc[0].coords.latitude , longitude:  this.props.loc[0].coords.latitude}}
                        title={"I am here"}
                    />
                  
                    {this.createMarkers(this.state.availableLocations)}

                    {/* <Polyline
                        coordinates={ this.state.mycoords }
                        strokeColor="#000"
                        strokeColors={[ '#7F0000', '#00000000', '#B24112', '#E5845C', '#238C23', '#7F0000']}
                        strokeWidth={5}
                      /> */}

                </MapView>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} closeInterval={1000}/>
            </View>
        )
      }
      else{
        console.log('selected places is         ' , this.state.selectedPlace)
        return (
          <View style = {styles.container}>
            
            <PlaceDetail
              selectedPlace={this.state.selectedPlace}
              onModalClosed={this.modalClosedHandler}  
            />

          </View>
        )
      }
  }
}


const styles = StyleSheet.create ({
container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
  city: {
    fontSize: 25,
    color: '#604def',
  },
});

const mapStateToProps = (state) => {
  return {
     loc: state.loc,
     reducer_data: state.user
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  saveLocation: payload => saveLocation(payload),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
