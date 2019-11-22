import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { connect } from 'react-redux'
import {removeFromList} from "../../redux/actions/index"
import { bindActionCreators } from 'redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Tags extends Component {

    renderProducts = (products) => {
        // console.log("Products", products)
        // console.log("this.props.listItems", this.props.listItems)
        return products.map((item, index) => {
            var fl = this.props.listItems.length > 0 && this.props.listItems.filter(itemList => itemList.id == item.id)
            // console.log("fl", fl[0])
            if(fl[0]){
                return (
                    <View key={index} style={{ padding: 20 }}>
                        <Text>{fl.city}</Text>
                        <Button color="indigo"onPress={() => this.props.removeItemFromCart(fl[0])} title="remove"/>
                    </View>
                )
            } else {
                return (
                    <View key={index} style={{ padding: 20 }}>
                        <Text>{item.city}</Text>
                        <Button color="indigo"onPress={() => this.props.onPress(item)} title="add to list"/>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: hp('100%'), 
        width: wp('100%'),
    },
    titleText: {
        fontSize: 25,
        textAlign: "center",
    },
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