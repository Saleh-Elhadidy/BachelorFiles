import React from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator  } from 'react-native';
var t = require('tcomb-form-native');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from '@firebase/app'
var flag = false
export default class Home extends React.Component {
    static navigationOptions = {
      title: 'Home',
    };

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
  
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home Screen</Text>
          <Button
            title="Go to Register Page"
            onPress={() => this.props.navigation.navigate('Register',{ItemID:86,T:"4"})}
          />
          <Button
            title="Go to Login"
            onPress={() => this.props.navigation.navigate('Login',{ItemID:86,T:"4"})}
          />
          <Button
            title="Go to Upload"
            onPress={() => this.props.navigation.navigate('Upload',{ItemID:86,T:"4"})}
          />
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
  })