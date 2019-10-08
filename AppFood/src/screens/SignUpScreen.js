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
  AsyncStorage
} from "react-native";
import axios from 'axios';
import Modal from 'react-native-modal';

export default class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      repeat_password: "",
      numberphone: "",
      address: "",
      isVisible: false,
      code: "",
    }
  }
  requestSendEmail=()=>{
    const { email, password, repeat_password } = this.state
    if(email.trim() === '') {
      alert("you should fill your email")
      return
    }
    if(password.trim() === ''){
      alert("you should fill your password")
      return
    }
    if(password !== repeat_password) {
      alert("your repeat password wrong")
      return
    }
    axios.post(`https://serverappfood.herokuapp.com/api/user/sendemail`, {
      email: this.state.email,
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
      if(res.data.status){
        this.setState({isVisible: true})
      }
    })
    .catch(err=>console.warn(err));
  }

  requestSignUp=()=>{
    axios.post(`https://serverappfood.herokuapp.com/api/user/new`, {
      email: this.state.email,
      code: this.state.code,
      password: this.state.password
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(res=>{
      console.log(res.data)
      if(res.data.status){
        AsyncStorage.setItem("email+password+token", `${this.state.email}+${this.state.password}+${res.data.account.token}`);
        this.props.navigation.navigate("bottomScreen")
      }
    })
    .catch(err=>console.warn(err));
  }

  closeModal=()=>{
    this.setState({isVisible: false, code: ""})
  }
  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            style={styles.container}
            source={require("../Image/background.png")}
          >
            <View style={{ width: "90%" }}>
              <Text style={styles.title}>SIGN UP</Text>
              <View style={styles.block}>
                <TextInput
                  value={this.state.email}
                  style={styles.input}
                  placeholder="Email or username"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({email: text})}
                />
                <TextInput
                  value={this.state.password}
                  secureTextEntry
                  style={[styles.input]}
                  placeholder="password"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({password: text})}
                />
                <TextInput
                  value={this.state.repeat_password}
                  secureTextEntry
                  style={[styles.input]}
                  placeholder="repeat password"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({repeat_password: text})}
                />
                <TextInput
                  value={this.state.numberphone}
                  style={styles.input}
                  placeholder="Your number phone"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({numberphone: text})}
                />
                <TextInput
                  value={this.state.address}
                  style={styles.input}
                  placeholder="Your address"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({address: text})}
                />
                <TouchableOpacity style={styles.buttonsignup} onPress={()=>this.requestSendEmail()}>
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
        <Modal 
          isVisible={this.state.isVisible}
          onBackdropPress={ () => this.closeModal()}
          onBackButtonPress={() => this.closeModal()}
          onSwipeComplete={() => this.closeModal()}
          style={styles.Modal}
          swipeDirection={["left","right","down"]}>
            <View style={{paddingHorizontal: 10, alignSelf: 'center', backgroundColor: 'white'}}>
              <Text style={styles.text}>fill your code you received from your email</Text>
              <TextInput
                value={this.state.code}
                style={[styles.input, {alignSelf: 'center'}]}
                placeholder="Your code"
                placeholderTextColor="#F9A825"
                onChangeText={text=>this.setState({code: text})}
              />
              <TouchableOpacity style={styles.button} onPress={()=>this.requestSignUp()}>
                <Text>SEND</Text>
              </TouchableOpacity>
            </View>
        </Modal>
      </View>
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
  Modal:{
    margin: 0,
    justifyContent: 'center'
  },
  text:{
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    marginTop: 15
  },
  button:{
    width: 60,
    height: 20,
    backgroundColor: 'skyblue',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15
  }
});