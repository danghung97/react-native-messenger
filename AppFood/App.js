import React, { Component } from 'react';
import { View } from 'react-native';
import Login from './src/screens/LoginScreen';
import SignUp from "./src/screens/SignUpScreen";
import Home from './src/screens/HomeScreen';
import Profile from './src/screens/ProfileScreen'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import ImageZoom from './src/Component/ImageZoom'

const BottomNavigator = createBottomTabNavigator(
  {
    HomeScreen: Home,
    ProfileScreen: Profile,
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
    // signUpScreen: SignUp,
    // loginScreen: Login,
    bottomScreen: BottomNavigator,
    // drawer: DrawerNavigator,
    ImageZoomScreen: ImageZoom,
  },
  { headerMode: 'none', navigationOptions: { headerVisible: false } }
);
const App = createAppContainer(stackNavigator);
export default App;