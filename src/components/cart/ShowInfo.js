import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Zocial';
import call from 'react-native-phone-call'
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

                            <View style={styles.itemParent}>
                                <Text style={styles.items}>Place: {this.data.place}</Text>
                                <Text style={styles.items}>City: {this.data.name}</Text>
                                <Text style={styles.items}>Province: {this.data.Provice}</Text>
                                <Text style={styles.items}>Country: {this.data.country}</Text>
                                
                                <View style={styles.call}>
                                    <Icon
                                        name="call"
                                        size={35}
                                        color="green"
                                        onPress={this.oncall}
                                    />  
                                    <Text style={styles.items}>{this.data.phone}</Text>
                                </View>
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
        justifyContent: "center",
        bottom: 10
    },
    items: {
        fontSize: 30,
    },
    itemParent:{
        margin: 30
    },
    call: {
        alignContent: "space-around",
        flexDirection: "row"
    }
   
});