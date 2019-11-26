import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Button,
    TouchableOpacity
} from "react-native";

import call from 'react-native-phone-call'
import Icon from 'react-native-vector-icons/FontAwesome';

const args = {
    number: null, // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
  }

export default class Info extends Component {

    data = null;

    constructor(props) {
        super(props);

        this.state = {
          loading: true,
        };
    }

    componentDidMount = () => {
        this.setState({
            loading: true,
        });

        this.getData();
    }

    async InfoApiCall() {
        const url = 'https://space-rental.herokuapp.com/users/info_call';
      
        try {
            const response = await fetch(url, {
              method: 'POST', // or 'PUT'
              body: null, // data can be `string` or {object}!
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const json = await response.json();

            console.log('Results are :', JSON.stringify(json));
            this.data = json.info;

        } 
        catch (error) {
            console.error('Error in call:', error);
        }
    }

    async getData() {

        await this.InfoApiCall();

        this.setState({
            loading: false,
        });
    }

    oncall = () => {
        args.number = this.data.phone
        console.log("args.number" , args)
        call(args).catch(console.error)
    }

    render(){
        return (
            
            <View style={styles.container}>

                {this.state.loading ? 
                    (<ActivityIndicator />) : (
                            <View style={styles.insideContainer}>
                            <Text style={styles.font}>Place: {this.data.place}</Text>
                            <Text style={styles.font}>City: {this.data.name}</Text>
                            <Text style={styles.font}>Province: {this.data.Provice}</Text>
                            <Text style={styles.font}>Country: {this.data.country}</Text>
                            <Icon.Button
                                name="angle-right"
                                backgroundColor="#3b5998"
                                onPress={this.loginWithFacebook}
                            >
                                Login with Facebook
                            </Icon.Button>
                            <TouchableOpacity  onPress={this.oncall}>
                            

                                <Text style={styles.font}>Phone: {this.data.phone}</Text>
                            </TouchableOpacity>
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
        justifyContent: "center"
    },
    insideContainer: {
        marginBottom: 400,
    },
    font: {
        fontSize: 20,
        color: "red"
    }
});