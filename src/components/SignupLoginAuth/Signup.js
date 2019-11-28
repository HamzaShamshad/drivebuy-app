import React from 'react';
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import {registeredUser} from "../../redux/actions/registered"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {isLoading} from "../../redux/actions/registered"
import Spinner from 'react-native-loading-spinner-overlay';
const FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 20, marginVertical: 3 }}>
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
  firstname: yup
  .string()
  .label('firstname')
  .required(),
  lastname: yup
  .string()
  .label('lastname')
  .required(),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  password: yup
    .string()
    .label('Password')
    .required()
    .min(6, 'password should be greater than 6'),
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
});
class Signup extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: '',
          avatarSource: null,
          photo: null,
          errorMsg: '',
      }
    }
    test() {
	  	Actions.test()
    }
    goSignup(){
      Actions.signup()
    }
    goBack() {
      Actions.pop();
    }
    goLogin(){
      Actions.login()
    }
    h1 = async (values, actions) => {
      alert(JSON.stringify(values))
    };

    simplemapping(){
      console.log("MAPPING")
      Actions.simpleMap()
    }
    goHome(){
      Actions.home()
    }
    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response after getting picture from Camera = ', response);   
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } 
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } 
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } 
          else {
            let source = {uri: response.uri};
            this.setState({
              avatarSource: source,
              photo: response,
            });
          }
        });
      }
      createFormData(pic, body) {
        const data = new FormData(); 
        if(pic === null){
          data.append("avatar", {
            name: "general",
            type: "avatar",
            uri: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          });
        }
        else {
          data.append("avatar", {
            name: pic.fileName,
            type: pic.type,
            uri:
              Platform.OS === "android" ? pic.uri : pic.uri.replace("file://", "")
          });
        }
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
        return data;
      };

      async SignupApiCall(photo , otherParams) {
        console.log("responce of picture :" , photo );
        console.log("object is   " , otherParams);
        const url = 'https://space-rental.herokuapp.com/users/create_user';
        try {
            const response = await fetch(url, {
              method: 'POST', 
              body:  this.createFormData(photo, otherParams),
            });
            const json = await response.json();

            this.props.loadingAction(true)

            console.log("Signup responce is: ", JSON.stringify(json));
            this.props.registeredUser(json)
            if(!json.success){
              console.log("THERE IS ERROR")
              this.setState({
                errorMsg: `email ${json.user.email}`,
              })
              this.dropDownAlertRef.alertWithType('error', 'Error', this.state.errorMsg);
            }else{
              

                this.goLogin()
                this.props.loadingAction(true)

            }
        } 
        catch (error) {
            console.error('Error:', error);
        }
      }
        
      
      handleSubmit(values) { 
        if (values){
              let obj = {};
              obj["first_name"] = values.firstname;
              obj["last_name"] = values.lastname;
              obj["email"] = values.email;
              obj["password"] = values.password;
              obj["password_confirmation"]= values.confirmPassword;
              this.props.loadingAction(false)
              this.SignupApiCall(this.state.photo , obj);
              this.props.loadingAction(false)
              
        } 
      }
      goLogin(){
        Actions.login()
      }
    render(){
        console.log("LOADING IN SIGNUP", this.props.loading)
        return(
            <SafeAreaView style={styles.container}>  
            {/* {this.state.isLoading ? (<ActivityIndicator/>) : (this.goLogin())} */}
            {/* <Button onPress={this.loading()}/> */}
                <Formik 
                  initialValues={this.state}
                  onSubmit={this.handleSubmit.bind(this)}
                  validationSchema={validationSchema}
                  >
                  {formikProps => (
                      <React.Fragment>
                      <DropdownAlert ref={ref => this.dropDownAlertRef = ref} closeInterval={1000}/>
                      <StyledInput 
                          label="firstname"
                          formikProps={formikProps}
                          formikKey="firstname"
                          placeholder="Please enter your first name"
                      />
                        <StyledInput 
                          label="lastname"
                          formikProps={formikProps}
                          formikKey="lastname"
                          placeholder="Please enter your last name"
                      />
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
                          placeholder="Please enter your password"
                          secureTextEntry
                      />
                      <StyledInput 
                          label="Confirm Password"
                          formikProps={formikProps}
                          formikKey="confirmPassword"
                          placeholder="Confirm your password"
                          secureTextEntry
           
                      />
                      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                            <View
                              style={[styles.avatar, styles.avatarContainer, {marginBottom: 30, marginTop: "-1%"}]}>
                              {this.state.avatarSource === null ? (
                                  <View>
                                  <Text style={{marginLeft: "7%"}}>Select Photo</Text>       
                                  </View>
                              ) : (
                                <Image style={styles.avatar} source={this.state.avatarSource} />
                              )}
                            </View>
                        </TouchableOpacity>
                      {this.props.loading ? (
                          
                          <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                            {/* <Spinner
                              visible={this.props.loading}
                              textContent={'Loading, Please wait'}
                        /> */}
                        <ActivityIndicator/>
                          </View>  
                      ) : (
                       null
                      )}
                       <Button
                          icon={
                            <Icon
                              name="user-plus"
                              size={15}
                              color="white"
                            />
                          }
                          buttonStyle={styles.buttonMenu}
                          iconLeft 
                          title="  Sign up  "
                          onPress={formikProps.handleSubmit} 
                      />
                      <View style={styles.info}>
                      <Text >Have an account? </Text>
                      <TouchableOpacity onPress={this.goLogin}><Text>Login</Text></TouchableOpacity>
                      </View>
                      </React.Fragment>
                  )}
                </Formik>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignContent: "center",
    marginTop: "-1%"
},
  boldText: {
     fontSize: 30,
     color: 'red',
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
  marginBottom: "2%",
  marginTop: "-4%",
  width: wp("40%"),
  marginLeft: 20,
},
error:{
  color: "red",
  marginLeft: 20
}
});

const mapStateToProps = state => {
  return {
     registerUser: state.register,
     loading: state.register.loading

  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  registeredUser: payload => registeredUser(payload),
  loadingAction: payload => isLoading(payload)

}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Signup)