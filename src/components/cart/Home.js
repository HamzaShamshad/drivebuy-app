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
        availLocs: null,
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
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    }

    setNewLocation(coordinate) {
      
      const obj ={ latitude: coordinate.latitude , longitude: coordinate.longitude }
      const radius = 2000
      const type = 'grocery_or_supermarket'
      const Api_Key = 'AIzaSyBcbnPdk93hL3stLX3XNlYZtABAyPkJ914'
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinate.latitude},${coordinate.longitude}&radius=${radius}&type=${type}&key=${Api_Key}`

      // let newCoords = this.state.mycoords;
      // newCoords = newCoords.concat(obj);

      fetch(url)
        .then(res => {
          return res.json()
        })
        .then(res => {
          console.log("near by pharmarcies are     " , res)
            if(res.status === "OK"){

              this.setState({
              // mycoords: newCoords,
              currentCoords: obj,
              availLocs: res.results
            });

          }
        })
        .catch(error => {
          console.log("error in google place api call" , error);
        });  
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
                      latitude: this.props.loc[0].coords.latitude,
                      longitude:  this.props.loc[0].coords.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>

                    <Marker
                        coordinate={{ latitude: this.props.loc[0].coords.latitude , longitude:  this.props.loc[0].coords.latitude}}
                        title={"I am here"}
                    />
                  
                    {this.createMarkers(this.state.availLocs)}

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
