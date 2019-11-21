import React, { Component } from 'react';
import { Dimensions } from 'react-native';

// import Signup from './src/components/screens/Signup';
import Login from './src/components/screens/Login';
import ListInput from './src/components/Listing/ListInput';
import EditProfile from './src/components/EditProfile/EditProfile';

import { Router, Scene , Stack , Drawer } from 'react-native-router-flux';
import Content from './DrawerContent'

const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}

export default class Routes extends Component {


  render() {
    return (

        <Router>

            <Stack key="root"  hideNavBar = {true}>
                <Drawer
                            hideNavBar
                            key="drawerMenu"
                            contentComponent={Content}
                            drawerWidth={dimensions.fullWidth/1.5}
                            drawerPosition="left"
                        >	

                    <Scene key="Login"  component={Login} title="Login" initial/>
                    <Scene key="List" component={ListInput} title="Save Your Location"/>
                    <Scene key="EditProfile" component={EditProfile} title="Edit your Profile"/>
                
                </Drawer>
            </Stack>
        </Router>
  );
  }
}

// if (!this.state.isSignedIn && !this.state.isLoggedIn) 
//       return <Signup onSignInPress={this.signInhandler} letMego={this.GoToLogin}/>;
//     if (this.state.isSignedIn)
//       return <Login onLoginInPress={this.logInhandler} />;
//     if (this.state.isLoggedIn) 
//       return <Map />;