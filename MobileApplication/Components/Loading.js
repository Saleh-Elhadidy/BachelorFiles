import React from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator  } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
// Loading.js
// Omitted other imports...
import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"

export default class Loading extends React.Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
     if(user!=null){
      const resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        actions: [
          NavigationActions.navigate({ routeName: 'Timeline' ,params:{ItemID:86,T:"4"}}),
        ],
      });
      
      this.props.navigation.dispatch(resetAction); 

     }else{
       
     }
    })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }
}