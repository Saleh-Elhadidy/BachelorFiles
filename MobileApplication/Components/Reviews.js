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
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"


var uri="";

 class Reviews extends React.Component {

    constructor(props){
          super(props);
          }


    rate= (number) => {
        var count;
        var rate;
    
    firebase.database().ref('reviews/' + firebase.auth().currentUser.uid ).push({
            rate:number, 
            uri: uri
        });

    Alert.alert("Thank you for rating");
    }



    render(){

        return(

        <ScrollView>

        <View style={{ flex: 1,flexDirection: 'row'}}>
        <Text style={{margin: 2}}> Rate this </Text>
         <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:30, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(1)}}

      >
      <Text style={{color:'#2196F3'}}> 1 </Text>
      </TouchableHighlight> 

      <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(2)}}

      >
      <Text style={{color:'#2196F3'}}> 2 </Text>
      </TouchableHighlight> 

     <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(3)}}

      >
      <Text style={{color:'#2196F3'}}> 3 </Text>
      </TouchableHighlight> 

      <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(4)}}

      >
      <Text style={{color:'#2196F3'}}> 4 </Text>
      </TouchableHighlight> 
     <TouchableHighlight 
        style={{position: 'relative', alignSelf:'flex-end', backgroundColor:'#ffffff',margin:3,
                borderRadius:23, borderBottomWidth: 1,borderColor: '#fff', justifyContent:'center'}}
        onPress={()=>{this.rate(5)}}

      >
      <Text style={{color:'#2196F3'}}> 5 </Text>

      </TouchableHighlight> 
        </View>

        </ScrollView>

        );
    }
}

 module.exports = Reviews;