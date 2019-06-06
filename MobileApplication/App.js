import React from 'react';
import { View, Text, Button, StyleSheet, Alert  } from 'react-native';
var t = require('tcomb-form-native');
import { createStackNavigator, createAppContainer } from 'react-navigation';
import firebase from '@firebase/app'
import "@firebase/storage"
import "@firebase/database"
import "@firebase/auth"
import Loading from './Components/Loading'
import Register from './Components/Register'
import Home from './Components/Home'
import Login from './Components/Login'
import Reverify from './Components/Reverify'
import Timeline from './Components/Timeline'
import Questionaire from './Components/Questionaire'
import Upload from './Components/Upload'
import Preferences from './Components/Preferences'
import Reviews from './Components/Reviews'
 // console.warn(this.props.navigation.getParam("ItemID"))
 import { pushNotifications } from './Components/Index';


 pushNotifications.configure();

const RootStack = createStackNavigator(
  {
    Home:Home,
    Register:Register,
    Loading:Loading,
    Login:Login,
    Reverify:Reverify,
    Timeline:Timeline,
    Questionaire:Questionaire,
    Upload:Upload,
    Preferences:Preferences,
    Reviews: Reviews,
  },
  {
    initialRouteName: 'Login',
    initialRouteParams:{"ItemID":45},
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerTintColor: '#0000ff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);


const AppContainer = createAppContainer(RootStack);
type Props = {};

export default class App extends React.Component {

  render() {
   return <AppContainer />;
  }
}
