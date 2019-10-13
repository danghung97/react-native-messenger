import React, { Component } from 'react';
import { View } from 'react-native';
import Login from './src/screens/LoginScreen';
import SignUp from "./src/screens/SignUpScreen";
import ForgetPW from "./src/screens/ForgetPWScreen";
import Home from './src/screens/HomeScreen';
import Profile from './src/screens/ProfileScreen';
import Mess from './src/screens/Messenger';
import Chat from './src/screens/ChatScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import ImageZoom from './src/Component/ImageZoom';

const BottomNavigator = createBottomTabNavigator(
  {
    HomeScreen: Home,
    ProfileScreen: Profile,
    MessScreen: Mess
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: Home,
    ProfileScreen: Profile,
  }
)

const stackNavigator = createStackNavigator(
  {
    loginScreen: Login,
    signUpScreen: SignUp,
    ForgetPWScreen: ForgetPW,
    bottomScreen: BottomNavigator,
    chatScreen: Chat,
    drawer: DrawerNavigator,
    ImageZoomScreen: ImageZoom,
  },
  { headerMode: 'none', navigationOptions: { headerVisible: false } }
);
const App = createAppContainer(stackNavigator);
export default App;