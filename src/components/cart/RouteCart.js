import React, { Component } from 'react';
import {Router, Stack, Scene, Drawer, SideMenu} from 'react-native-router-flux';
import Home from "./Home"
import Login from "../SignupLoginAuth/Login"
import Signup from "../SignupLoginAuth/Signup"
import DrawerContent from './DrawerContent';
import icon from "../../../assets/menu.png"
import Profile from "./Profile"
import GoogleMaps from '../GoogleMaps/GoogleMaps'

export default class RouteCart extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>

							<Drawer
									leftButtonIconStyle={{tintColor: 'indigo'}}
									hideNavBar={true}
									contentComponent={DrawerContent}
									drawerWidth={250}
									drawerPosition="left"
									drawerImage={icon}>	

									<Scene key="home" component={Home} title="Home" />
									<Scene key="profile" component={Profile} title="My Profile" />
									<Scene key="maps" component={GoogleMaps} title="Map" />
							</Drawer>

							<Scene key="login" component={Login} title="Login" />
							<Scene key="signup" component={Signup} title="Signup" initial={true}/>

			    </Stack>
				
			 </Router>
                
            
			)
	}
}