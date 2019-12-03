import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux'
import {removeFromList} from "../../redux/actions/index"
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
class Tags extends Component {
    
    showInfo = () => {
        Actions.info()
    }

    renderProducts = (products) => {
        console.log("this.props.listItems", this.props.listItems)
        return products.map((item, index) => {
            var fl = this.props.listItems.length > 0 && this.props.listItems.filter(itemList => itemList.id == item.id)     
            if(fl[0]){
                return (
                    <View key={index} style={styles.insideContiner}> 
                        <Icon
                            name="minuscircleo"
                            size={25}
                            color="red"
                            onPress={() => this.props.removeItemFromCart(item)}
                        />
                        <Text style={{fontSize: 20, marginLeft: 10 , marginRight: "40%"}}>{item.city}</Text>                        
                        <Icon
                            name="menuunfold"
                            size={25}
                            color="black"
                            onPress={this.showInfo}                        
                        />  
                    </View>
                )
            } else {
                return (
                    <View key={index}  style={styles.insideContiner}>
                         <Icon
                            name="pluscircleo"
                            size={25}
                            color="green"
                            onPress={() => this.props.onPress(item)}   
                        />
                            <Text style={{fontSize: 20, marginLeft: 10, marginRight: "40%"}}>{item.city}</Text>
                        <Icon
                            name="menuunfold"
                            size={25}
                            color="black"
                            onPress={this.showInfo}
                        /> 
                    </View>
                )
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{this.props.products.length} locations are availible</Text>
                {this.renderProducts(this.props.products)}
                <View style={styles.changeButton}>
                    <Button buttonStyle={styles.buttonMenu} onPress={() => this.props.chngeLocs()} title="Change Locations"/>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    insideContiner: {
        width: "100%",
        top: 60,
        margin: 15,
        flexDirection: "row",
        alignContent: "center",
    

    },
    buttonMenu:{
        backgroundColor: "indigo",
      },
    titleText: {
        fontSize: 25,
        textAlign: "center",
    },
    changeButton:{
        marginTop: "10%",
        marginBottom: "10%",
        width: "100%",
        position: "absolute",
        top: 10
    }
});

const mapStateToProps = (state) => {
    return {
        listItems: state.carts
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    removeItemFromCart: payload => removeFromList(payload),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tags)