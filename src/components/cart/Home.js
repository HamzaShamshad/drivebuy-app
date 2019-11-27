import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  View,
  Text,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Alert,
  StyleSheet
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.flashMessage()
    }
    ActionOnLocation(){
        Actions.tags()
    }
    ActionOnCart(){
        Actions.show()
    }
    flashMessage(){
       const {message} = this.props.reducer_data[0]
       if(message)
       {
        setTimeout(() => {
            this.dropDownAlertRef.alertWithType(
              'success',
              'Congratulation',
               message,
            );
          }, 1000);
       }
    }
    render(){
        console.log("HOME PRESSED",  this.props.reducer_data[0].success)

        return(
            <View style={styles.container}>
            
                {/* <Button title="press" onPress={this.simple()}></Button> */}
                <TouchableOpacity 
                    onPress={this.ActionOnLocation}>
                    <Text style={styles.secondaryText} >
                        Available Locations
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.ActionOnCart}>
                    <Text style={styles.secondaryText} >
                        Your Saved Locations
                    </Text>
                </TouchableOpacity>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} closeInterval={1000}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 500,
        height: hp('100%'), 
        width: wp('100%'),
    },
    titleText: {
        marginTop: "30%",
        fontSize: 25,
    },
    secondaryText: {
        fontSize: 20,
        color: "indigo"
    },
});

const mapStateToProps = state => {
    return {
      reducer_data: state.user
    };
  };


  export default connect(mapStateToProps, null)(Home);