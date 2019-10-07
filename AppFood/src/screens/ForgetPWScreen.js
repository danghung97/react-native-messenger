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
import Icons from 'react-native-vector-icons/AntDesign';

export default class ForgetPW extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            new_password: '',
            repeatNew_pw: '',
        }
    }
    render(){
        return(
        <View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
            source={require('../Image/background.png')}
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

                        <TouchableOpacity style={styles.buttonsignin} onPress={()=>this.SendrequestEmail()}>
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
        backgroundColor: '#404040',
        borderRadius: 10,
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