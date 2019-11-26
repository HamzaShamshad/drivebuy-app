import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import {removeFromList} from "../../redux/actions/index"
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
class Tags extends Component {
    
    showInfo = () => {
        Actions.info()
    }

    renderProducts = (products) => {
        console.log("Products", products)
        console.log("this.props.listItems", this.props.listItems)
        return products.map((item, index) => {
            var fl = this.props.listItems.length > 0 && this.props.listItems.filter(itemList => itemList.id == item.id)
            // console.log("fl", fl[0])
            if(fl[0]){
                return (
                    <View key={index} style={styles.insideContiner}> 
                        <TouchableOpacity onPress={this.showInfo}> 
                            <View style={{alignItems: 'center'}}>        
                                <Text style={styles.font}>{item.city}</Text>
                            </View>
                        </TouchableOpacity>
                        <Button color="indigo" onPress={() => this.props.removeItemFromCart(fl[0])} title="remove"/>
                    </View>
                )
            } else {
                return (
                    <View key={index}  style={styles.insideContiner}>
                        <TouchableOpacity onPress={this.showInfo}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.font}>{item.city}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Button  color="indigo" style={styles.selectButton} onPress={() => this.props.onPress(item)} title="add to list"/>
                        </View>
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
                    <Button color = "#3c31e3" onPress={() => this.props.chngeLocs()} title="Change Locations"/>
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
        width: "60%",
        top: 40

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