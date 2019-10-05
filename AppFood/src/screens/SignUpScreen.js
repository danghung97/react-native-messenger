import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      repeat_password: "",
    }
  }
  requestSignUp=()=>{
    const { email, password, repeat_password } = this.state
    if(email.trim() === '') alert("you should fill you email")
    if(password !== repeat_password) {
      alert("your repeat password wrong")
      return
    }
    axios.post(`https://serverappfood.herokuapp.com/api/user/new`, {
      email: this.state.email,
      password: this.state.password
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
      // if(res.status){
      //   alert("account has been created")
      // }
      alert(res.message)
    })
    .catch(err=>console.warn(err));
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.container}
          source={require("../Image/background.png")}
        >
          <View style={{ width: "90%" }}>
            <Text style={styles.title}>SIGN UP</Text>
            <View style={styles.block}>
              <TextInput
                style={styles.input}
                placeholder="Email or username"
                placeholderTextColor="#F9A825"
                onChangeText={text=>this.setState({email: text})}
              />
              <TextInput
                secureTextEntry
                style={[styles.input]}
                placeholder="password"
                placeholderTextColor="#F9A825"
                onChangeText={text=>this.setState({password: text})}
              />
              <TextInput
                secureTextEntry
                style={[styles.input]}
                placeholder="repeat password"
                placeholderTextColor="#F9A825"
                onChangeText={text=>this.setState({repeat_password: text})}
              />
              <TouchableOpacity style={styles.buttonsignup} onPress={()=>this.requestSignUp()}>
                <Text style={styles.textsignup}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonsignup, { marginBottom: 25 }]}
                onPress={() => {
                  this.props.navigation.navigate('loginScreen');
                }}
              >
                <Text style={styles.textsignup}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
  title: {
    marginTop: 100,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 20,
    lineHeight: 22,
    color: '#F9A825',
    textAlign: 'center'
  },
  block: {
    width: '100%',
    backgroundColor: "#4C4C4C",
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 25
  },
  input: {
    height: 44,
    width: '90%',
    backgroundColor: '#404040',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  buttonsignup: {
    width: "90%",
    height: 44,
    borderWidth: 1,
    borderColor: "#F9A825",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16
  },
  textsignup: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: "#F9A825",
  },
});