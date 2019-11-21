import React from 'react';
import {
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  View,
  Text,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
  Alert,
  StyleSheet
} from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import {Actions} from 'react-native-router-flux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';


import { connect } from 'react-redux';
import { userData } from '../../store/actions/places';

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
    borderWidth: 2,
    borderColor: 'indigo',
    marginBottom: -3,
    marginTop: 1,
    height: hp('8%'), // 70% of height device screen
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

const StyledSwitch = ({ formikKey, formikProps, label, ...rest }) => (
  <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
    <Switch
      value={formikProps.values[formikKey]}
      onValueChange={value => {
        formikProps.setFieldValue(formikKey, value);
      }}
      {...rest}
    />
  </FieldWrapper>
);

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
      this.state = {
          email: '',
          password: '',
          // confirmPassword: ''
      }
    }

    async LoginApiCall(JsonObj) {

      const url = 'https://space-rental.herokuapp.com/users/sign_in_call';
    
        
        try {
            const response = await fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(JsonObj), // data can be `string` or {object}!
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const json = await response.json();
            console.log('Results are :', JSON.stringify(json));
            
            this.props.onUserAction(json);
            console.log('state saved is  :', this.props.userObject);
        } 
        catch (error) {
            console.error('Error:', error);
        }
    }

    handleSubmit(values) {

      if (values){
        //creating obj with same keys for API call
        let obj = {};
        obj["email"] = values.email;
        obj["password"] = values.password;

        this.LoginApiCall(obj);
        this.toHome()
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
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Formik
                initialValues={this.state}
                
                onSubmit={this.handleSubmit.bind(this)}

                validationSchema={validationSchema}
                >
                {formikProps => (
                    <React.Fragment>
                   
                      <StyledInput 
                          label="Email"
                          formikProps={formikProps}
                          formikKey="email"
                          placeholder="  Email"
                      />
                    <StyledInput 
                        label="Password"
                        formikProps={formikProps}
                        formikKey="password"
                        placeholder="  Password"
                        secureTextEntry
                    />

                    {formikProps.isSubmitting ? (
                        <ActivityIndicator />
                    ) : (
                      <Button  color="white" style={styles.buttonMenu}  onPress={formikProps.handleSubmit} >Login</Button>
                    )}
                    <Text style={styles.info}>Don't have an account?</Text>
                    <TouchableOpacity style={styles.info} onPress={this.signup}><Text>Click here to Signup</Text></TouchableOpacity>

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
  marginTop: 10

},
  boldText: {
     fontSize: 30,
     color: 'red',
  },
  
  textWrapper: {
    height: hp('10%'), // 70% of height device screen
    width: wp('100%'),   // 80% of width device screen
    backgroundColor: "blue"
  },
  myText: {
    fontSize: hp('5%') // End result looks like the provided UI mockup
  },
  info: {
    marginLeft: 20,
    marginTop: 5
  },
  buttonMenu:{
    backgroundColor: "indigo",
    marginBottom: 10,
    width: wp("40%"),
    marginLeft: 20
  }
});


const mapStateToProps = state => {
  return {
    userObject: state.places.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserAction: obj => dispatch(userData(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);