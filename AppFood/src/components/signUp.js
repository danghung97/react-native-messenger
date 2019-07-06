import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default class SignUp extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.container}
          source={require("../image/background.png")}
        >
          <View style={{ width: "90%" }}>
            <Text style={styles.title}>SIGN UP</Text>
            <View style={styles.block}>
              <TextInput
                style={styles.input}
                placeholder="Email or username"
                placeholderTextColor="#F9A825"
              />
              <TextInput
                secureTextEntry
                style={[styles.input]}
                placeholder="password"
                placeholderTextColor="#F9A825"
              />
              <TouchableHighlight style={styles.buttonsignup}>
                <Text style={styles.textsignup}>SIGN UP</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.buttonsignup, { marginBottom: 25 }]}
                onPress={() => {
                  this.props.navigation.navigate('loginScreen');
                }}
              >
                <Text style={styles.textsignup}>LOGIN</Text>
              </TouchableHighlight>
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
    alignItems: 'center'
  },
  title: {
    marginTop: 100,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: 20,
    lineHeight: 16,
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
