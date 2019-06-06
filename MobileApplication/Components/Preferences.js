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
    Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { StackActions, NavigationActions } from 'react-navigation';
var t = require('tcomb-form-native');
import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"

const options = {

  title: 'Upload Picture!',

  storageOptions: {

    skipBackup: true,

    path: 'images',

  },

  maxWidth:640,

  maxHeight:640

};

  var uris = [];
  var count = 0;


export default class Preferences extends React.Component {

  static navigationOptions = {

    title: 'Preferences',

};

constructor(props){
  super(props);
  this.state = {
    num: 0,
  }

}



  Test = () => { 
    ImagePicker.launchImageLibrary(options, (response) => {
   console.log('Response = ', response);
  
   if (response.didCancel) {
     console.log('User cancelled image picker');
   } else if (response.error) {
     console.log('ImagePicker Error: ', response.error);
   } else if (response.customButton) {
     console.log('User tapped custom button: ', response.customButton);
   } else {
     const source = { uri: response.uri };

     uris.push(response.data);
     count = count + 1;
     this.setState({num: uris.length})

     this.setState({
       avatarSource: source,
     });
   }
 });}

    putdb = () => {
      firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/preferencephotos').update({
        uris
      });

      const resetAction = StackActions.reset({
        index: 0, // <-- currect active route from actions array
        actions: [
          NavigationActions.navigate({ routeName: 'Loading' ,params:{ItemID:86,T:"4"}}),
        ],
      });
      
      this.props.navigation.dispatch(resetAction); 
    }




        
        render(){
          return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{fontWeight:'bold', textAlignVertical:'center'}}> Share with us photos of yourself or
            of things you like. </Text>

            {count < 10 ? 
            <Button 
            style={{marginTop:10, marginBottom:10}}
            title = "Choose Photos"
            onPress = {this.Test}
            />
            :
            null
          }

          <Text> {this.state.num} photo(s) chosen </Text>

            <Button 
            style={{marginTop:10, marginBottom:10}}
            title = "Done"
            onPress = {this.putdb}
            />
          </View>
            
            );
    }
  }