import React from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, Image  } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
// Loading.js
// Omitted other imports...
import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"
import ImagePicker from 'react-native-image-picker';
const options = {
    title: 'Upload Picture!',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

export default class Upload extends React.Component {
  componentDidMount() {
    console.log(this.props.navigation)
    this.props.navigation.setParams({AddPicFunc: this.Test.bind(this)})
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Upload",
    headerRight: (
    <TouchableOpacity
     onPress={navigation.state.params.AddPicFunc}>
      <Image style = {{marginRight:10}}
        source={require('../camera.png')}
      />
    </TouchableOpacity>
    ),
  });

   Test = () => { 
    ImagePicker.showImagePicker(options, (response) => {
   console.log('Response = ', response);
  
   if (response.didCancel) {
     console.log('User cancelled image picker');
   } else if (response.error) {
     console.log('ImagePicker Error: ', response.error);
   } else if (response.customButton) {
     console.log('User tapped custom button: ', response.customButton);
   } else {
     const source = { uri: response.uri };
  
     // You can also display the image using data:
     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  
     this.setState({
       avatarSource: source,
     });
   }
 });}



  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    );
  }
}