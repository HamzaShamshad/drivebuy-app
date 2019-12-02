import React from 'react';
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {userDetail} from "../../redux/actions/userDetail"
import {saveLocation} from "../../redux/actions/userLoc"
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import {isLoading} from "../../redux/actions/registered"
import Spinner from 'react-native-loading-spinner-overlay';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import DropdownAlert from 'react-native-dropdownalert';

const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
    <Text style={{ marginBottom: 3 }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);
const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    borderBottomWidth: 2,
    borderColor: 'indigo',
    marginBottom: "-1.2%",
    marginTop: "-2%",
    height: hp('6.4%'),
    width: wp('84%'),
  };
  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }
  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};
const validationSchema = yup.object().shape({
    email: yup
    .string()
    .label('Email')
    .email()
    .required(),
    password: yup
        .string()
        .label('Password')
        .required()
        .min(5, 'password should be greater than 5'),
});
class Login extends React.Component {
    constructor(props){
      super(props);
      this.flashMessage()
      this.state = {
        email: '',
        password: '',
        errorMsg: "",
      }
      

    }

    componentDidMount = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log("current position is  " , position);
          this.props.saveLocation(position)
          console.log("saved position is  " , this.props.loc);
        },
        (error) => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      );
    }
    
    async loginCall(JsonObj) { 
        

        const url = 'https://space-rental.herokuapp.com/users/sign_in_call';     
        try {
            const response = await fetch(url, {
              method: 'POST', 
              body: JSON.stringify(JsonObj), 
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const json = await response.json();
           
              this.props.loadingAction(true)
           
           
            if(json.success){
              console.log('Results:', JSON.stringify(json));

              this.props.userDetail(json);
              console.log('state saved is  :', this.props.user);
              
              this.toHome()
              this.props.loadingAction(false)

            }else{
                this.setState({
                  errorMsg: json.message,
                })
              this.dropDownAlertRef.alertWithType('error', 'Login Failed', this.state.errorMsg);     
            }
               
        } 
        catch (error) {
            console.error('Error:', error);
        }  
    }  

    async handleSubmit(values) {
      if (values){
        var obj = {};    
        console.log("EMAIL: ", values.email)
        console.log("PASSWORD: ", values.password)
        obj["email"] = values.email;
        obj["password"] = values.password; 
        this.props.loadingAction(false)
        // console.log("BEFORE CALL", this.props.register.loading)
        this.loginCall(obj); 
        // console.log("AFTER CALL", this.props.register.loading)
        this.props.loadingAction(false)
      }
    }
    toHome(){
      Actions.home()
    }
    test() {
	  	Actions.test()
    }
    simplemapping(){
      Actions.simpleMap()
    }
    maps(){
      Actions.maps()
    }
    maptest(){
      Actions.maptest()
    }
    map(){
      Actions.map()
    }
    signup(){
      Actions.signup()
    }
    goProfile(){
      Actions.profile()
    }
    flashMessage(){         
      // const {success} = this.props.registeredUser[0]
      if(this.props.registeredUser[0])
      {
       setTimeout(() => {
           this.dropDownAlertRef.alertWithType(
             'success',
             'Congratulation',
              "Registered Successfully",
           );
         }, 1000);
      }
    }
   
    render(){
      console.log("LOADING IN LOGIN :: ", this.props.loading);
      return(
          
            <SafeAreaView style={[styles.loginPage, styles.container]}>      
            {/* {this.props.loading ? (<Text>NO</Text>): <ActivityIndicator/>}   */}
                <Formik
                initialValues={this.state}      
                onSubmit={this.handleSubmit.bind(this)}
                validationSchema={validationSchema}
                
                >
                {formikProps => (
                  <React.Fragment>    
                    {/* <DropdownAlert imageStyle={{ padding: 8, width: 10, height: 10, alignSelf: 'center' }}containerStyle={{marginBottom: 30,  backgroundColor: 'transparent'}} messageStyle={{ fontSize: 10, textAlign: 'left', fontWeight: 'bold', color: 'white', backgroundColor: 'transparent', marginBottom: 30}} ref={ref => this.dropDownAlertRef = ref} closeInterval={1000}/> */}
                    
                   
                  {this.props.loading? (
                     <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                        <Spinner
                            visible={this.props.loading}
                            // textContent={'Logging in, Please wait'}
                        />
                        {/* <ActivityIndicator animating={this.props.loading} color="indigo" size="large" /> */}
                    </View>   
                  ) : (
                        null
                  )}
                
               
                            <StyledInput 
                          label="Email"
                          formikProps={formikProps}
                          formikKey="email"
                          placeholder="Please enter your email"
                      />
                    <StyledInput 
                        label="Password"
                        formikProps={formikProps}
                        formikKey="password"
                        placeholder="Please enter your Password"
                        secureTextEntry
                    />          
                    <Button
                      icon={
                        <Icon
                          name="login"
                          size={15}
                          color="white"
                        />
                      }
                      
                    buttonStyle={styles.buttonMenu}
                    iconLeft 
                    title="  Login  "
                    onPress={formikProps.handleSubmit}  

                  />
                   <View   style={styles.info} >
                <Text >Don't have an account? </Text>
                  <TouchableOpacity onPress={this.signup}><Text>Signup</Text></TouchableOpacity>
                </View>
                  </React.Fragment>
                )}
                </Formik>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} closeInterval={1000}/>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: "5%"
  },
  boldText: {
     fontSize: 30,
     color: 'red',
  },
  textWrapper: {
    height: hp('10%'), 
    width: wp('100%'),   
    backgroundColor: "blue"
  },
  myText: {
    fontSize: hp('5%') 
  },
  info: {
    marginLeft: "6%",
    marginTop: "-3%",
    flexDirection: "row",
    alignContent: "flex-start"
  }, 
  buttonMenu:{
    backgroundColor: "indigo",
    marginBottom: 10,
    width: wp("40%"),
    marginLeft: 20
  },
  error:{
    color: "red",
    marginLeft: 20
  },
  loginPage:{
    top: 50
  }
});

const mapStateToProps = (state) => {
  return {
     user: state.user,
     loc: state.loc,
     registeredUser: state.register,
     loading: state.register.loading
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  userDetail: payload => userDetail(payload),
  saveLocation: payload => saveLocation(payload),
  loadingAction: payload => isLoading(payload)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)