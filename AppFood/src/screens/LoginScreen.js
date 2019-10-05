import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";
import axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
    }
  }
  // SendRequestLogin = ()=>{
  //   axios.post(`https://serverappfood.herokuapp.com/api/user/login`, {
  //       email: this.state.email,
  //       password: this.state.password
  //     },
  //     {
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //   })
  //   .then(res => {
  //     if(res.status){
  //       this.props.navigation.navigate("HomeScreen")
  //     }
  //     else{
  //       alert(res.message)
  //     }
  //   })
  // }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../Image/background.png')}
          style={styles.container}
        >
          <View style={{ width: "90%", alignSelf: "center", marginBottom: 30 }}>
            <Text style={styles.textconnect}>Connect with</Text>
            <View style={styles.button}>
              <TouchableHighlight style={{ flex: 1 }}>
                <Text style={[styles.fbgg, { marginLeft: 10 }]}>facebook</Text>
              </TouchableHighlight>
              <Entypo
                name="facebook-with-circle"
                style={styles.iconFacebook}
                size={40}
              />
            </View>
            <View style={styles.button}>
              <TouchableHighlight style={{ flex: 1 }}>
                <Text style={[styles.fbgg, { marginLeft: 10 }]}>google</Text>
              </TouchableHighlight>
              <Entypo
                name="google--with-circle"
                style={[styles.iconFacebook, { color: "#DC4E41" }]}
                size={40}
              />
            </View>
            <Text style={[styles.textconnect, { marginTop: 24 }]}>Or</Text>
            <View style={styles.block}>
              <TextInput
                style={styles.input}
                placeholder="Email or username"
                placeholderTextColor="#F9A825"
                onChangeText={text=>this.setState({email: text})}
              />
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholder="password"
                placeholderTextColor="#F9A825"
                onChangeText={text=>this.setState({password: text})}
              />

              <TouchableHighlight style={styles.buttonsignin} onPress={()=>this.props.navigation.navigate("bottomScreen")}>
                <Text style={styles.textsignin}>SIGN IN</Text>
              </TouchableHighlight>
              <View style={styles.group}>
                <TouchableHighlight
                  onPress={() => this.props.navigation.navigate("signUpScreen")}
                >
                  <Text style={styles.textconnect}>Create Account</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    alert("hello");
                  }}
                >
                  <Text style={styles.textconnect}>Forget password</Text>
                </TouchableHighlight>
              </View>
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
    justifyContent: 'flex-end',
  },
  textconnect: {
    alignSelf: 'center',
    fontFamily: "Roboto",
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '300',
    color: "#C4C4C4",
  },
  button: {
    width: "100%",
    height: 50,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 20,
    marginTop: 8,
    backgroundColor: '#4C4C4C'
  },
  iconFacebook: {
    width: 42,
    height: 42,
    borderRadius: 42,
    color: "#314E8C",
  },
  fbgg: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "300",
    fontSize: 14,
    lineHeight: 16,
    color: '#C4C4C4',
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
    width: "90%",
    backgroundColor: "#404040",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  buttonsignin: {
    width: "90%",
    height: 44,
    borderWidth: 1,
    borderColor: "#F9A825",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  textsignin: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    color: '#F9A825'
  },
  group: {
    width: '90%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 23,
    marginBottom: 23,
  },
});