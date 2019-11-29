import React, { Component } from 'react';
import {Router, Stack, Scene, Drawer, SideMenu} from 'react-native-router-flux';
import Home from "./Home"
import ElectronicsScreen from './ElectronicsScreen';
import ShowCart from "./ShowCart"
import Login from "../SignupLoginAuth/Login"
import Signup from "../SignupLoginAuth/Signup"
import DrawerContent from './DrawerContent';
import icon from "../../../assets/menu.png"
import Profile from "./Profile"
import GoogleMaps from "../GoogleMaps/GoogleMaps"
import Info from "./ShowInfo";
export default class RouteCart extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={false}>
				  
					<Drawer
				  	leftButtonIconStyle={{tintColor: 'indigo'}}
						hideNavBar={true}
						contentComponent={DrawerContent}
						drawerWidth={250}
						drawerPosition="left"
						drawerImage={icon}
						>	
							<Scene key="home" component={Home} title="Home" />
							<Scene key="tags" component={ElectronicsScreen} title="tags" />
							<Scene key="show" component={ShowCart} title="Your saved Locations" />
							<Scene key="profile" component={Profile} title="My Profile" />
							<Scene key="maps" component={GoogleMaps} title="Maps" />
							<Scene key="info" component={Info} title="Location Info" />
						</Drawer>					
					<Scene key="login" component={Login} title="Login" initial={true}/>
					<Scene key="signup" component={Signup} title="Signup" />
			    
					</Stack>	
			 </Router>        
			)
	}
}