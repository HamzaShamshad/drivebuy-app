import React from 'react';
import { View, Text, StyleSheet , Dimensions , ActivityIndicator , TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image , Avatar } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {userDetail} from "../../redux/actions/userDetail"

const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}
class DrawerContent extends React.Component {

    state = {
        icon: 'home'
    };

    goHome(){
        Actions.home()
    }
    goLogin(){
        Actions.login()
    }
    goSignup(){
        Actions.signup()
    }
    goCart(){
        Actions.show()
    }
    goAvailible(){
        Actions.tags()
    }
    goProfile(){
        Actions.profile()
    }
    goMaps(){
        Actions.maps()
    }
    render(){
        return (
            <View style={ styles.container }>
                {/* <Text  style={{ marginTop: 10 , marginLeft: 20 , fontSize: 20 , color: "black"}}>Near by Locations</Text> */}

                <View style={styles.topDrawer}>
                    <View style={styles.pic}>
                        <Avatar
                            rounded
                            size="large"
                            source={{ uri: this.props.reducer_data[0].user.image_url}}
                        />

                        <Text style={{marginTop: 15 , color: "white"}}>{this.props.reducer_data[0].user.first_name}</Text>
                        <Text style={{color: "white"}}>{this.props.reducer_data[0].user.email}</Text>
                    </View>
                </View>

                <View style={styles.bottomDrawer}>

                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name={this.state.icon}
                        size={25}
                        color="green"
                        style={styles.iconStyle}
                        backgroundColor= "grey"
                    />
                    <TouchableOpacity style={{width: 100}} onPress={this.goHome}>
                        <Text style={styles.textInIcons}>Home</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                    <SimpleLineIcons
                        name="star"
                        size={25}
                        color="green"
                        style={styles.iconStyle}
                    />
                    <TouchableOpacity style={{width: 100}} onPress={this.goCart}>
                        <Text style={styles.textInIcons}>Saved</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                    <SimpleLineIcons
                        name="layers"
                        size={25}
                        color="green"
                        style={styles.iconStyle}
                    />
                    <TouchableOpacity style={{width: 100}} onPress={this.goAvailible}>
                        <Text style={styles.textInIcons}>Available</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        name="person-pin"
                        size={25}
                        color="green"
                        style={styles.iconStyle}
                    />
                     <TouchableOpacity style={{width: 100}} onPress={this.goProfile}>
                        <Text  style={styles.textInIcons}>Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                        name="google-maps"
                        size={25}
                        color="green"
                        style={styles.iconStyle}
                    />
                     <TouchableOpacity style={{width: 100}} onPress={this.goMaps}>
                        <Text style={styles.textInIcons}>Maps</Text>
                    </TouchableOpacity>
                </View>

                

                </View>
            </View>
            );
            }        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'indigo',
    }, 
    topDrawer: {
        flex: 1.5,
        backgroundColor: '#6c48c7',
    },
    pic: {
        marginTop: 12,
        marginLeft: 15,
    },
    textAfterPic: {
        marginTop: 12,
        marginLeft: 15
    },
    drawerText: {
        fontSize: dimensions.fullWidth/20,
        color: '#fff',
    },

    bottomDrawer: {
        flex: 8,
        // alignContent: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        
    },
    button1st: {
        backgroundColor: "indigo",
        marginTop: 60,
        width: "75%",
    },
    buttonMenu:{
        backgroundColor: "indigo",
        
        marginTop: 12,
        color: "orange",
        width: "75%",
    },
    textInIcons: {
        color: 'black', 
        marginTop: 22 , 
        fontSize: 17
    },
    iconStyle: {
        marginTop: 20, 
        marginLeft: 10 , 
        marginRight: 20,
        width: 30,
    }
});
const mapStateToProps = state => {
    return {
      reducer_data: state.user
    };
  };
  const mapDispatchToProps = dispatch => bindActionCreators({
    userDetail: payload => userDetail(payload)
  }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);