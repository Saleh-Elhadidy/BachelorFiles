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
    TextInput,
    Platform,
    ScrollView
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
var t = require('tcomb-form-native');
import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"
import { pushNotifications } from './Index';
const Form = t.form.Form;
var errFlag = false
const errorStyle = StyleSheet.create({
    error:{
        color: "red",
        fontSize: 14,
        fontWeight: '500',
        width:250,
        height:30,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    }
   
})
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
          width:300,
          height:40,
          marginBottom:20,
          flexDirection: 'column',
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
var done = false
var Password = t.refinement(t.String, (password) => {
    const reg = /^(?=\S+$).{8,20}$/;
    return reg.test(password);
});
var SocialLevel = t.enums({
    2: 'Non-Social User',
    1: 'Medium Interaction User',
    0: "Highly Social User",
  });
Password.getValidationErrorMessage = function(value, path, context) {
    return "Password doesn't meet requirements minimum 8/20 characters"
};
var Value = {
    SocialStyle:0
}
var User = t.struct({
    username: t.String,
    email: t.String,
    password: Password,
    confirmPass: Password,
    SocialStyle:SocialLevel
});

const options = {
    fields: {
        username: {
            placeholder: '                                  Username                            ',
            error: 'Please enter your username',
            template:myCustomTemplate
        },
        email: {
            placeholder: '                                    Email                                     ',
            error: 'Please enter your email address',
            keyboardType:'email-address',
            template:myCustomTemplate
        },
        password: {
            placeholder: '                                  Password                                     ',
            password: true,
            secureTextEntry: true,
            template:myCustomTemplate
        },
        confirmPass: {  
            placeholder: '                           Confirm Password                                  ',
            password: true,
            secureTextEntry: true,
            template:myCustomTemplate
        },
        SocialStyle:{
            nullOption: false
        },
    },
};


export default class Register extends React.Component {
        static navigationOptions = {
            title: 'Register',
        };



        handleSubmit = () => {
            const value = this._form.getValue();
            console.log(value)
            if (value != null) {
                if (value.password != value.confirmPass) {
                    this.setState({value:{}})
                    Alert.alert(
                        '',
                        "Passwords don't match",
                        [{
                            text: "Re-Enter Password ",
                            onPress: () => console.log('Ask me later pressed')
                        }, ], {
                            cancelable: false
                        },
                    );
                } else {
                    if ((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.email))) {
                        this.FireBaseRegister(value.email.toLowerCase(), value.password,value.username,value.SocialStyle)
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
        }
        navigate = (flag)=>{
            console.log("Method flag is " + flag)
            this.props.navigation.navigate('Questionaire')
        }
        navigate2 = (flag)=>{
            console.log("Method flag is " + flag)


        }
         FireBaseRegister = (Email, Password,Username,privacy) =>  {
             console.time("Register")
            errFlag = false;
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(Email, Password).then((RegisterdUser)=> {
                
                firebase.database().ref('users/' + RegisterdUser.user.uid).set({
                name: Username,
                Email: Email,
                login: false,
                social_level:privacy
                
                }).then(() => {

                    pushNotifications.localNotificationSec();
                    console.timeEnd("Register")
                    const resetAction = StackActions.reset({
                        index: 0, // <-- currect active route from actions array
                        actions: [
                          NavigationActions.navigate({ routeName: 'Questionaire' }),
                        ],
                      });
                      
                      this.props.navigation.dispatch(resetAction);
                }).catch((error) => {
                    errFlag = true
                });
                done = true
            }).catch((error) => {
                Alert.alert(
                    'Email Already Taken, Please enter another email',
                );
                errFlag = true
                done = true
                this.setState({value:{}})

            })

        }
        render(){
            return(
            <View style={styles.container}>
            <Form 
            ref={c => this._form = c} // assign a ref
            type={User} 
            value = {Value}
            options = {options}
            />
    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.handleSubmit}>
    <Text style={styles.loginText}>Register!</Text>
    </TouchableHighlight>
        </View>
   
        
        );
    }
  }
