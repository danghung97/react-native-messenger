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
import { connect } from 'react-redux'
import { signup } from '../store/actions/UseAction';
import axios from 'axios';
import Modal from '../Component/SignUp/modal';
import LoadingModal from '../Component/loading';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      email: "",
      password: "",
      repeat_password: "",
      numberphone: "",
      address: "",
      name: "",
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
    axios.post(`https://serverappfood.herokuapp.com/api/user/sendmail`, {
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
        this.refs['Modal'].showModal()
      }else{
        alert(res.data.message)
      }
    })
    .catch(err=>console.warn(err));
  }

  requestSignUp=(code)=>{
    this.props.signup({
      email: this.state.email,
      code,
      password: this.state.password,
      name: this.state.name,
    })
      // if(res.data.status){
      //   this.refs['Modal'].closeModal()
      //   this.props.navigation.navigate("bottomScreen")
      // }
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.user.isSucces) {
      this.refs['loading'].hideModal()
      this.refs['Modal'].hideModal()
			this.props.navigation.navigate("bottomScreen")
			return false;
		}else{
			if(nextProps.user.isLoadding) this.refs['loading'].showModal()
			if(nextProps.user.error) {
        this.refs['loading'].hideModal()
				this.refs['Modal'].showError(nextProps.user.error)        
			}
			return true;
		}
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
                  value={this.state.name}
                  secureTextEntry
                  style={[styles.input]}
                  placeholder="name"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({name: text})}
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
          ref="Modal"
          request={this.requestSignUp}
        />
        <LoadingModal ref="loading" />
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
    backgroundColor: '#fff',
    borderRadius: 8,
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

const mapStateToProps =  state => {
	return {
		user: state.user,
	}
}

const mapDispatchToProps = {
	signup: signup,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUp)