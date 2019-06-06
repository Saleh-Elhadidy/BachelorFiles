import React from 'react';
import { View, Text, Button, StyleSheet, Alert,TouchableOpacity,Image  } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

// Loading.js
// Omitted other imports...
import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"
import FirebaseModule from './FirebaseWrapper';
import ImagePicker from 'react-native-image-picker';
import { async } from '@firebase/util';
var nlp = require('compromise')
import { pushNotifications } from './Index';


let lexicon={
  c7:'Place',
  c6:'Place',
  c5:'Place',
  c3:'Place',
  c2:'Place',
  c1:'Place',
  d5:'Place',
  d4:'Place',
  d3:'Place',
  d2:'Place',
  d1:'Place',
  b5:'Place',
  b4:'Place',
  b3:'Place',
  b2:'Place',
  b1:'Place',
  c:'Place',
  b:'Place',
  d:'Place',
  GUC:'Place',
  Platform:'Place',
  Pronto:'Place',
  '3amSa3d':'Place',
  LaRoma:'Place',
  'La Roma':'Place',
  seroom:'Place',
  'SE Room':'Place',
  'gate 1':'Place',
  'gate 3':'Place',
  'gate 4':'Place',
  'gate1':'Place',
  'gate3':'Place',
  'gate4':'Place',


}
const options = {

  title: 'Upload Picture!',

  storageOptions: {

    skipBackup: true,

    path: 'images',

  },

  maxWidth:640,

  maxHeight:640

};

export default class Reverify extends React.Component {
  componentWillMount() {

    this.props.navigation.setParams({AddPicFunc: this.Upload.bind(this)})

  }
  static navigationOptions = ({ navigation }) => ({

    headerTitle: "Reverifiy",

    headerRight: (

    <TouchableOpacity

    onPress={navigation.state.params.AddPicFunc}>

      <Image style = {{marginRight:10}}

        source={require('../camera.png')}

      />

    </TouchableOpacity>

    ),

  });
  
   Upload = async () => { 
    var data;
    var chosen = false
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
      Blur(response.data)


      
     // You can also display the image using data:

     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

   }

 });

async function Blur(data){
  var {res}= await FirebaseModule.show(data,FirebaseModule.SHORT);
  console.log("Res is " + res)
}
};
 setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substr(0,index) + chr + str.substr(index+1);
}
BlurText(){
  var test = "This is a test for C7.305 and C5. and D5 and laroma and pronto we c7 tany and gate 1.This is the platform test"
  var dot = []
  for(var i =0;i<test.length;i++){
    if(test.charAt(i)=='.' && i!=test.length-1){
      dot.push(i)
      test = this.setCharAt(test,i," ")
    }
  }
  var doc = nlp(test,lexicon)
  var toRemove = doc.sentences().places().data()
  console.log(toRemove)
  for(var i = 0;i<dot.length;i++){
    test = this.setCharAt(test,dot[i],".")
  }
  console.log("The word after re-adding dots is " +test)
  for(var i =0;i<toRemove.length;i++){
    var startLoc = test.indexOf(toRemove[i]['text'].substring(1,toRemove[i]['text'].length))
    console.log(startLoc)
    if(startLoc!=-1){
      for(var j = startLoc;j<test.length;j++){
        if(test[j]== " "){
          break
        }else{
          test = this.setCharAt(test,j,"-")
          
        }
      }
    }

  }
  console.log(test)
}
    
    resendMail(){
      pushNotifications.Cancel();
    }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Verification Page</Text>
        <Button
          title="Press here to re-send verification email"
          onPress={() => this.resendMail()}
        />
      </View>
    );
  }
}