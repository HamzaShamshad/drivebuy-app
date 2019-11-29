import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { bindActionCreators } from 'redux';
import {removeFromList} from "../../redux/actions/index"
import Icon from 'react-native-vector-icons/AntDesign';
 class ShowCart extends Component {
    deleteItemt(index){
        this.props.removeItemFromCart(index);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Locations saved in List</Text>
                <Text style={styles.secondaryText}>You have {this.props.listItems.length} saved locations </Text>
                <FlatList
                    data={this.props.listItems}
                    renderItem={({item, index,separators}) => (
                        <TouchableOpacity                        
                            onShowUnderlay={separators.highlight}
                            onHideUnderlay={separators.unhighlight}>
                            <View style={styles.insideContiner}>
                                    <Icon
                                        name="minuscircleo"
                                        size={25}
                                        color="red"
                                        onPress={()=>this.deleteItemt(item)}
                                    />      
                                    <Text style={{fontSize: 20, marginLeft: 10 , marginRight: "30%"}}>{item.city}</Text>
                                <View>
                               
                                </View>
                            </View>
                        </TouchableOpacity>
                    
                    )}
                    keyExtractor={(x,i)=>i}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        listItems: state.carts
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    removeItemFromCart: payload => removeFromList(payload),
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ShowCart)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    insideContiner: {
        width: "100%",
        margin: 15,
        flexDirection: "row",
        alignContent: "center",
    
    },
    titleText: {
        fontSize: 25,
        textAlign: 'center',
    },
    secondaryText: {
        fontSize: 20,
        color: "indigo",
    },
    itemsInFlatList: {
        marginBottom: "30"
    }
});