import React from 'react';

import { View, Text, Button, StyleSheet, Alert, Dimensions  } from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import firebase from '@firebase/app'

import "@firebase/storage"

import "@firebase/database"

import "@firebase/auth"

import Icon from 'react-native-vector-icons/MaterialIcons'

import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const items = [

  {

    name: "Top Wear",

    id: 1,

    children: [{

        name: "Blouse",

        id: 10,

      },{

        name: "Cardigan",

        id: 11,

      },{

        name: "Coat",

        id: 12,

      },{

        name: "Crop Top",

        id: 13,

      },{

        name: "Hoodie",

        id: 14,

      },{

        name: "Jacket",

        id: 15,

      },{

        name: "Polo Shirt",

        id: 16,

      },{

        name: "Rain Coat",

        id: 17,

      },{

        name: "Tshirt",

        id: 18,

      },{

        name: "Shirt",

        id: 19,

      }]

  },

  {

    name: "Trousers and Shorts",

    id: 2,

    children: [{

        name: "Bell-bottom (Bootleg)",

        id: 20,

      },{

        name: "Formal trouser",

        id: 21,

      },{

        name: "High Waist pants",

        id: 22,

      },{

        name: "Running shorts (Sports Shorts)",

        id: 23,

      },{

        name: "Slim Jeans",

        id: 24,

      },{

        name: "Skinny Jeans",

        id: 25,

      },{

        name: "Skirts",

        id: 26,

      },{

        name: "Sweatpants",

        id: 27,

      },{

        name: "Shorts",

        id: 28,

      },{

        name: "Yoga pants",

        id: 29,

      }]

  },

  {

  name: "Suits and Dresses",

    id: 3,

  children: [{

        name: "Black Tie suit",

        id: 30,

      },{

        name: "Backless Dress",

        id: 31,

      },{

        name: "Gowns",

        id: 32,

      },{

        name: "Double breasted suits",

        id: 33,

      },{

        name: "Halterneck Dress",

        id: 34,

      },{

        name: "Kimono",

        id: 35,

      },{

        name: "Pant Suits",

        id: 36,

      },{

        name: "Sundress",

        id: 37,

      }]

  },

  {

    name: "Shoes and Accessories",

    id: 4,

    children: [{

        name: "Boots",

        id: 40,

      },{

        name: "Flats",

        id: 41,

      },{

        name: "Highheeled Shoes",

        id: 42,

      },{

        name: "Sandals",

        id: 43,

      },{

        name: "Sneakers",

        id: 44,

      },{

        name: "Belts",

        id: 45,

      },{

        name: "Glasses",

        id: 46,

      },{

        name: "Scraves",

        id: 47,

      },{

        name: "Veils",

        id: 48,

      },{

        name: "Watches",

        id: 49,

      }]

  },

  {

    name: "Colors",

    id: 5,

    children: [{

        name: "Black",

        id: 50,

      },{

        name: "Blue",

        id: 51,

      },{

        name: "Green",

        id: 52,

      },{

        name: "Orange",

        id: 53,

      },{

        name: "Pink",

        id: 54,

      },{

        name: "Purple",

        id: 55,

      },{

        name: "Red",

        id: 56,

      },{

        name: "White",

        id: 57,

      },{

        name: "Yellow",

        id: 58,

      }]

  },
  {
    name: "Laptops",

    id: 6,

    children: [
      {

        name: "Mac",

        id: 60,

      },
      {

        name: "Hp",

        id: 61,

      },
      {

        name: "Lenovo",

        id: 62,

      },
      {

        name: "Dell",

        id: 63,

      },
      {

        name: "Acer",

        id: 64,

      },
      {

        name: "Asus",

        id: 65,

      },
      {

        name: "Samsung",

        id: 66,

    }]
  },
  {
    name: "Mobiles",

    id: 7,

    children: [
      {

        name: "iPhone",

        id: 70,

      },
      {

        name: "Samsung",

        id: 71,

      },
      {

        name: "Huawei",

        id: 72,

      },
      {

        name: "Oppo",

        id: 73,

      },
      {

        name: "Nokia",

        id: 74,

      },
      {

        name: "Sony",

        id: 75,

    }]
  }, 
  {
    name: "Coding Languages",

    id: 8,

    children:[
    {

        name: "Java",

        id: 80,

      },{

        name: "Python",

        id: 81,

      },
      {

        name: "PHP",

        id: 82,

      },
      {

        name: "SQL",

        id: 83,

      },
      {

        name: "C",

        id: 84,

      },
      {

        name: "Javascript",

        id: 85,

      },
      {

        name: "HTML",

        id: 86,

      },
      {

        name: "IOS",

        id: 87,

      },
      {

        name: "Swift",

        id: 88,

      },
      {

        name: "Ruby",

        id: 89,

      },
      ]
  }

 

]

 

const bool = true

var select = []
var data = []
 

export default class Questionaire extends React.Component {

 

 

  static navigationOptions = {

    title: 'Questionaire',

};

      constructor(props){

          super(props);

          this.state = {

          Data: [],

          Test:false

        }

        //const currentuser = firebase.getInstance().getCurrentUser().getUid();
        super()

        this.state = {

          selectedItems: [],

        }

      }


      onSelectedItemObjectsChange = (Selected) => {
        data = Selected
      }
      onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
        select = selectedItems
      }

     

 

      addlist= ()=>{

       // firebase.database().ref('userChoices/').set({ selectedItems});
      console.log(data)

      var user = firebase.auth().currentUser;

 

      firebase.database().ref('users/' + user.uid).update({

                ChoiceID: select,
                ChoiceFull:data

                }).catch((error) => {

                });

       
                const resetAction = StackActions.reset({
                  index: 0, // <-- currect active route from actions array
                  actions: [
                    NavigationActions.navigate({ routeName: 'Preferences' }),
                  ],
                });
                
                this.props.navigation.dispatch(resetAction);


 

      }

 

 

     

 

  render() {

    return (

 

     

      <View>

 

        <SectionedMultiSelect

 

          items={items}

          uniqueKey='id'

          subKey='children'

          iconKey='icon'

          selectText='Please Choose Your Favourite Items to personalise your experince.'

          showDropDowns={true}

          readOnlyHeadings={true}

          onSelectedItemObjectsChange={this.onSelectedItemObjectsChange}

          onSelectedItemsChange = {this.onSelectedItemsChange}

          selectedItems={this.state.selectedItems}

        />

 

 

      <Button

        style={{position: 'absolute', bottom:0}}

        title="Done"

        onPress={this.addlist}

      /> 

 

      </View>

    );

  }

}