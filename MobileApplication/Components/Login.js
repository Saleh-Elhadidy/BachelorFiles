import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    ActivityIndicator,
    TouchableHighlight,
    Image,
    TextInput
} from 'react-native';
var t = require('tcomb-form-native');
var flag = false;
import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"
const Form = t.form.Form;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
      inputContainer: {
          borderBottomColor: '#F5FCFF',
          backgroundColor: '#FFFFFF',
          borderRadius:30,
          borderBottomWidth: 1,
          width:300,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:15,
        width:250,
        borderRadius:30,
      },
      loginButton: {
        backgroundColor: "#00b5ec",
      },
      loginText: {
        color: 'white',
      }
});
var Password = t.refinement(t.String, (password) => {
    const reg = /^(?=\S+$).{8,20}$/;
    return reg.test(password);
});
Password.getValidationErrorMessage = function(value, path, context) {
    return "Password doesn't meet requirements minimum 8/20 characters"
};
var LoginForm = t.struct({
  email: t.String,
  password: Password
});
const errorStyle = StyleSheet.create({
    error:{
        color: "red",
        fontSize: 14,
        fontWeight: '500',
        borderRadius:50,
        width:250,
        height:65,
        flexDirection: 'row',
        alignItems:'center'
    }
   
})
function myCustomTemplate(locals) {
      var error =
        locals.hasError && locals.error ? (
          <Text accessibilityLiveRegion="polite" style = {errorStyle.error}>
            {locals.error}
          </Text>
        ) : null;
    return (
        <View>
      <View style = {styles.inputContainer}>
      
        <TextInput
        style={styles.inputs}
        placeholder={locals.placeholder}
        accessibilityLabel={locals.label}
        ref="input"
        allowFontScaling={locals.allowFontScaling}
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        editable={locals.editable}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        onBlur={locals.onBlur}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        onContentSizeChange={locals.onContentSizeChange}
        placeholderTextColor={locals.placeholderTextColor}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        numberOfLines={locals.numberOfLines}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        selectionState={locals.selectionState}
        onChangeText={value => locals.onChange(value)}
        onChange={locals.onChangeNative}
        value={locals.value}
        testID={locals.testID}
        textContentType={locals.textContentType}
         />
      </View>
      {error} 
      </View>

    );
  }
const options = {
  fields: {
      email: {
          placeholder: 'Email                                                                              ',
          error: 'Please enter your email address',
          template:myCustomTemplate,
          keyboardType:'email-address'
      },
      password: {
          placeholder: 'Password                                                                                 ',
          template:myCustomTemplate,
          password: true,
          secureTextEntry: true,
      },
  },
   //stylesheet: formStyles,
};


export default class Login extends React.Component {
  componentWillMount(){
    if(!flag){
      flag = true;
var config = {
  apiKey: "AIzaSyBede0WWhsauftbaKQYFWdQ_UxzN54MEmA",
  authDomain: "react-native-project-1b5ae.firebaseapp.com",
  databaseURL: "https://react-native-project-1b5ae.firebaseio.com",
  projectId: "react-native-project-1b5ae",
  storageBucket: "react-native-project-1b5ae.appspot.com",
  messagingSenderId: "290225293142"
};
firebase.initializeApp(config);

}
  }

  static navigationOptions = {
    title: 'Login',
};

FirebaseLogin = (Email,Password) =>{
  console.time("Login")
  firebase.auth().signInWithEmailAndPassword(Email, Password)
  .then(
    () => {
      console.timeEnd("Login")
        this.props.navigation.navigate('Loading')
      


      
    this.setState({value:{}})
   })
  
  .catch(error => 
    Alert.alert(
        'Email or Password incorrect',
        // error,
        // [{
        //     text: error,
        //     onPress: () => console.log('Ask me later pressed')
        // }, ], {
        //     cancelable: false
        // },
    ))
}

handleSubmit = () => {
  const value = this._form.getValue();
  if(value){
    if ((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.email))) {
      this.FirebaseLogin(value.email,value.password)
  } else {
      Alert.alert(
          '',
          "You must use a valid email",
          [{
              text: "Please re-enter your details using a valid email",
              onPress: () => console.log('Ask me later pressed')
          }, ], {
              cancelable: false
          },
      );
  }
  }
}
  render(){
    return(
    <View style={styles.container}>
    <Form 
    ref={d => this._form = d} // assign a ref
    type={LoginForm} 
    options = {options}
    />
    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleSubmit}>
    <Text style={styles.loginText}>Login</Text>
    </TouchableHighlight>
    <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
    <Text>Don't have an account? Sign up!</Text>
    </TouchableHighlight>
    </View>
);
}
}
