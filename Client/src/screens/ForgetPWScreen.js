import React, {Component} from 'react';
import{
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Modal from '../Component/SignUp/modal';
import ApiService from '../store/axios/AxiosInstance';
import PATH from '../store/axios/Url';

export default class ForgetPW extends Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      new_password: '',
      repeatNew_pw: '',
    }
  }

  requestSendEmail= async() => {
    try{
      const { email, new_password, repeatNew_pw } = this.state
      if (new_password.trim() !== repeatNew_pw.trim()) {
        alert("your repeat password wrong")
        return
      }
      const response = await ApiService.post(PATH.SEND_EMAIL, {
        email: email.trim(),
      })
      this.refs['loading'].hideModal()
      if( response.data && response.data.status){
        this.refs['Modal'].showModal()
      }else{
        alert(response.data.message)
      }
    }
    catch(err) { console.warn(err) }
  }
  requestForgetPW= async(code) => {
    try{
      const { email, new_password } = this.state
      const response = await ApiService.post(PATH.SEND_EMAIL, {
        email: email.trim(),
        password: new_password.trim(),
        code,
      })
      if (response.data.status) {
        alert("Your password has changed")
        return
      }
      alert(response.data.message)
    }
    catch(err) { console.warn(err) }
  }
  render(){
    return(
      <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
          source={require('../Assets/Image/background.png')}
          style={styles.container}
          >
            <View style={{ width: "90%" }}>
              <View style={styles.block}>
                <TextInput
                  value={this.state.email}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({email: text})}
                />
                <TextInput
                  value={this.state.new_password}
                  secureTextEntry
                  style={styles.input}
                  placeholder="New password"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({password: text})}
                />
                <TextInput
                  value={this.state.repeatNew_pw}
                  secureTextEntry
                  style={styles.input}
                  placeholder="Repeat new password"
                  placeholderTextColor="#F9A825"
                  onChangeText={text=>this.setState({password: text})}
                />

                <TouchableOpacity style={styles.buttonsignin} onPress={()=>this.requestSendEmail()}>
                    <Text style={styles.textsignin}>SEND</Text>
                </TouchableOpacity>
                <View style={styles.group}>
                  <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("loginScreen")}
                  >
                  <Text style={styles.textconnect}>Login</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => {
                      this.props.navigation.navigate("signUpScreen")
                  }}
                  >
                  <Text style={styles.textconnect}>SignUp</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
        <Modal
          ref="Modal"
          request={this.requestForgetPW}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
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
})