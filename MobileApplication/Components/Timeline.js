import React from 'react';

import { View, Text, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Image, TextInput,TouchableHighlight } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import 'react-native-console-time-polyfill';
// Loading.js

// Omitted other imports...

import firebase from '@firebase/app'

import "@firebase/storage"

import "@firebase/database"

import "@firebase/auth"

import ImagePicker from 'react-native-image-picker';
import FirebaseModule from './FirebaseWrapper';

import Reviews from './Reviews';
var nlp = require('compromise')
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

    maxWidth:720,

    maxHeight:720

  };

var t = []

var social_level = 9;

var CardData = []

var t1 = []

var TextCard = []

var user

var textTest =""

const styles = StyleSheet.create({

input: {

    width:"100%",

    backgroundColor:'#FFFFFF'

},

});

export default class Timeline extends React.Component {

  componentWillMount() {
     user = firebase.auth().currentUser;

    this.props.navigation.setParams({AddPicFunc: this.Upload.bind(this)})
    firebase.database().ref('users/').on('value',(snapshot) => {

      snapshot.forEach(function(child){
        if(user.email==child.val()["Email"]){
          social_level = child.val()["social_level"]
          console.log(social_level)
        }
      })


    })


  }

  static navigationOptions = ({ navigation }) => ({

    headerTitle: "Timeline",

    headerRight: (

    <TouchableOpacity

    onPress={navigation.state.params.AddPicFunc}>

      <Image style = {{marginRight:10}}

        source={require('../camera.png')}

      />

    </TouchableOpacity>

    ),

  });

   shuffle(a) {

    for (let i = a.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [a[i], a[j]] = [a[j], a[i]];

    }

    return a;

}

    addarrays(a,b){
      let len = a.length + b.length;
      let newarray = [];
      for(let i = 0; i < a.length; i++)
      {
        newarray.push(a[i]);
      } 
      for(let i = 0; i < b.length; i++)
      {
        newarray.push(b[i]);
      } 

      return newarray;
    }
    


  

    Upload = async () => {

    ImagePicker.showImagePicker(options, (response) => {
   console.log(response);
   console.log('Response = ', response.longitude);
   console.log('Response = ', response.latitude);
   console.log('Response = ', response.timestamp);

  
   console.time("Pic")
   if (response.didCancel) {

     console.log('User cancelled image picker');

   } else if (response.error) {

     console.log('ImagePicker Error: ', response.error);

   } else if (response.customButton) {

     console.log('User tapped custom button: ', response.customButton);

   } else {
    
    if(social_level==2 || social_level == 1){
      Blur(response.data)
    }
    else{
      firebase.database().ref('users/' + user.uid + "/images/").push({

        base64:response.data,

        uploadedby:user.uid,

        likes:[]

      },function(error){

        if(error){

          console.log(error)

        }else{
          
          // console.log(this.state.uniqueValue)

           

          }

      })
      this.setState({uniqueValue:this.state.uniqueValue+1})

    }
    console.timeEnd("Pic")
    
   }

 });
 async function Blur(data){
   console.log("Blurring")
  var {res}= await FirebaseModule.show(data,FirebaseModule.SHORT);
  console.log("Res is " + res)
  firebase.database().ref('users/' + user.uid + "/images/").push({

        base64:res,

        uploadedby:user.uid,

        likes:[]

      },function(error){

        if(error){

          console.log(error)

        }else{
          
          }

      })

}

}

    constructor(props) {

        super(props);

        this.state = {

          Data: [],

          APIDONE:false,

          uniqueValue: 1

        }



        this.flag = false;

        firebase.database().ref('users/').on('value',(snapshot) => {

          var temp = []

          CardData = []

          snapshot.forEach(function(child){

            t.push(child.val())

            t[t.length - 1]['Key'] = child.key;

          })

          //this.shuffle(t)

            t.forEach(element => {

              //console.log(element)

              if(element['images']!=null || element['images']!=null || element['images']!= undefined ){

              Object.keys(element["images"]).forEach(function (key) {

                img = element['images'][key]['base64']

                likes = element['images'][key]['likes']

                poster = element['images'][key]['uploadedby']

                name = element['name']

                full = {base64:img,likes:likes,poster:poster,name:name}

                temp.push(full)

            });

          }

            });

        

        t = []

        CardData = []

        CardData = temp



        //console.log("Card Data Array" )

        //console.log(CardData.length)

        //console.log("Temp Data Array" )

        //console.log(temp.length)

        temp = []

        this.setState({APIDONE:true})

        })

        temp = []



        this.state = {

          Data1: [],

          APIDONE:false,

          uniqueValue: 1,

          textVal:"", 

          name:""

        }



        this.flag = false;

        firebase.database().ref('statusList/').on('value',(snapshot) => {

          var temp1 = []

          TextCard = []

          snapshot.forEach(function(child){

            t1.push(child.val())

            t1[t1.length - 1]['Key'] = child.key;

          })

          //this.shuffle(t)

            t1.forEach(element => {

              //console.log(element)

              userid = element['userid']

              text = element['text']

              name = element['name']

              full = {text: text, userid:userid, name:name}

              temp1.push(full) 

            });

        

        t1 = []

        TextCard = []

        TextCard = temp1



        //console.log("StatusCard Data Array" )

        //console.log(TextCard.length)

        //console.log("Status Temp Data Array" )

        //console.log(temp1.length)

        temp1 = []

        this.setState({APIDONE:true})

        })

        temp1 = []

      }
      setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
      }



      addStatus= ()=>{
        var dot = []
        var StatusToAdd = textTest
        if(social_level==2){
          for(var i =0;i<StatusToAdd.length;i++){
            if(StatusToAdd.charAt(i)=='.' && i!=StatusToAdd.length-1){
              dot.push(i)
              StatusToAdd = this.setCharAt(StatusToAdd,i," ")
            }
          }
        var doc = nlp(StatusToAdd,lexicon)
        var toRemove = doc.sentences().places().data()
        for(var i = 0;i<dot.length;i++){
          StatusToAdd = this.setCharAt(StatusToAdd,dot[i],".")
        }
        for(var i =0;i<toRemove.length;i++){
          var startLoc = StatusToAdd.indexOf(toRemove[i]['text'].substring(1,toRemove[i]['text'].length))
          console.log(startLoc)
          if(startLoc!=-1){
            for(var j = startLoc;j<StatusToAdd.length;j++){
              if(StatusToAdd[j]== " "){
                break
              }else{
                StatusToAdd = this.setCharAt(StatusToAdd,j,"-")
                
              }
            }
          }
  
        }
          
        }else{
        }
       var user = firebase.auth().currentUser;

       var json;

       firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
         json = snapshot.val().name;

        
       }).then(() => {
    


       firebase.database().ref('statusList/' ).push({

                 userid: user.uid,

                 name: json,

                 text: StatusToAdd, 

                 likers:[user.uid]

                 }).catch((error) => {

                 });

                 });

                 this.textInput.clear();

               status = '';

      
    }

      addlike = (statusText) => {
        //Alert.alert(statusText)
        var keyid;
        var likes;

        var id = firebase.database().ref('statusList/').orderByChild('text').equalTo(statusText);

        id.once('value').then(snapshot => {

        snapshot.forEach(function(child) {
          keyid = child.key;
          likes = {likers: child.val().likers};
          likes.push(firebase.auth().currentUser.uid);
          firebase.database().ref('statusList/' + child.key).update({likers:likes});
          

          });

       });
       
    }
    rate= (number, uri) => {
      var count;
      var rate;
      //Alert.alert(number.toString(),uri);

  firebase.database().ref('reviews/' + firebase.auth().currentUser.uid ).push({
          rate:number, 
          uri: uri
      });

  Alert.alert("Thank you for rating");
  }

    renderButtons() {
      const {navigate} = this.props.navigation;

      console.log("rendering UI")

        var tmp = this.shuffle(this.addarrays(TextCard, CardData))

        return tmp.map((item,i) => {

          return (

              <Card key = {i}>

              {item['text'] != null ? 
              <CardTitle
                style={{color:'#000000'}}

                subtitle={item["name"]}

              /> :

              <CardImage 

                 source={{uri: 'data:image/jpeg;base64,' + item['base64']}}/>
                 
                 } 

              {item['text'] != null ? 
              <CardContent text={item["text"]} /> 
              :
              <CardTitle

                subtitle={"Uploaded by: " + item["name"]}

              />}

              <CardAction 

                separator={true} 

                inColumn={false}>


                {item['text'] != null ? 
                <CardButton

                  onPress={() => {this.addlike(item['text'])}}

                  title="Like"

                  color="#2196F3"

                />
                :
                // <CardButton

                //   onPress={() => {this.props.navigation.navigate("Reviews", {uri:item["base64"],
                //     name:item["name"]
                // })}}

                //   title="Rate"

                //   color="#FEB557"

                // />
                <View style={{ flex: 1,flexDirection: 'row'}}>
        <Text style={{margin: 2}}> Rate this </Text>
         <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:30, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(1,item['base64'])}}

      >
      <Text style={{color:'#2196F3'}}> 1 </Text>
      </TouchableHighlight> 

      <TouchableHighlight 
        callbackFromParent={this.myCallback}
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(2,item['base64'])}}

      >
      <Text style={{color:'#2196F3'}}> 2 </Text>
      </TouchableHighlight> 

     <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(3,item['base64'])}}

      >
      <Text style={{color:'#2196F3'}}> 3 </Text>
      </TouchableHighlight> 

      <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(4,item['base64'])}}

      >
      <Text style={{color:'#2196F3'}}> 4 </Text>
      </TouchableHighlight> 
     <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(5,item['base64'])}}

      >
      <Text style={{color:'#2196F3'}}> 5 </Text>

      </TouchableHighlight> 
        </View>
              }

              </CardAction>

            </Card>

            );
        });

    }

  render() {

    return (

      <ScrollView key={this.state.uniqueValue} style = {{backgroundColor:'#b2b2b2'}}>

      <TextInput 

               style={styles.input}

               underlineColorAndroid = "transparent"

               placeholder = "Would you like to share?"

               placeholderTextColor = "#9a73ef"

               autoCapitalize = "none"

               onChangeText = {(text) => textTest=text}

               style={styles.input}

               multiline={true}

               underlineColorAndroid='transparent'

               clearButtonMode='always'

               ref={input => { this.textInput = input }} />

        <Button

        style={{position: 'relative', alignSelf:'flex-end', width:'20%'}}

        title="Submit"

        onPress={this.addStatus}

      /> 

        { this.state.APIDONE ?this.renderButtons():null }

        </ScrollView>

    );

  }

}
