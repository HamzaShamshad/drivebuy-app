import React, { Component } from "react";
import {  StyleSheet, View , Text } from "react-native";
import MapView, { PROVIDER_GOOGLE , Polyline , Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import { connect } from "react-redux";
import {saveLocation} from "../../redux/actions/userLoc"
import { bindActionCreators } from 'redux';
class Home extends Component {
    constructor(props) {
      super(props);

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
        }
      };
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
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      );
    }

    setNewLocation(coordinate) {
      
      let obj ={ latitude: coordinate.latitude , longitude: coordinate.longitude } 
      let newCoords = this.state.mycoords;
      
      newCoords = newCoords.concat(obj);
      console.log("called " ,  newCoords)
      this.setState({
            mycoords: newCoords,
            currentCoords: obj,
      });
    }



    render() {
      return (
        <View style = {styles.container}>

            <MapView 
                provider ={PROVIDER_GOOGLE}
                style={styles.map} 
                showsCompass={true}
                showsMyLocationButton={true}
                showsUserLocation = {true}
                onUserLocationChange={event => this.setNewLocation(event.nativeEvent.coordinate)}
                initialRegion={{
                  latitude: this.props.loc[0].coords.latitude,
                  longitude: this.props.loc[0].coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                
                <Marker
                  coordinate={ this.state.currentCoords }
                  title={"I am here"}
                />

                <Polyline
                    coordinates={ this.state.mycoords }
                    strokeColor="#000"
                    strokeColors={[ '#7F0000', '#00000000', '#B24112', '#E5845C', '#238C23', '#7F0000']}
                    strokeWidth={5}
                  />

                  <Text>{this.state.mycoords.latitude}</Text>
                  <Text>{this.state.mycoords.longitude}</Text>

            </MapView>

        </View>
    )
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
     loc: state.loc
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  saveLocation: payload => saveLocation(payload),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)