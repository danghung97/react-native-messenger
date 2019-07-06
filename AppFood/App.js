import React, { Component } from 'react';
import { View } from 'react-native';
import Login from './src/components/login';
import SignUp from "./src/components/signUp";
import { createStackNavigator, createAppContainer } from 'react-navigation';

const stackNavigator = createStackNavigator(
  {
    signUpScreen: SignUp,
    loginScreen: Login
  },
  { headerMode: 'none', navigationOptions: { headerVisible: false } }
);
const App = createAppContainer(stackNavigator);
export default App;
