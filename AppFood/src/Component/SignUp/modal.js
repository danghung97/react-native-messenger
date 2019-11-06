import React, {Component} from 'react';
import{
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';

export default class ModalCode extends Component {
    constructor(props){
        super(props);
        this.state={
            isVisible: false,
            code: '',
            error: '',
        }
    }

    showModal = () => {
        this.setState({isVisible: true})
    }
    hideModal=  () => {
        this.setState({isVisible: false, code: ""})
    }
    showError = (err) => {
        this.setState({error: err})
    }
    render(){
        return(
        <Modal 
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.hideModal()}
          onBackButtonPress={() => this.hideModal()}
          onSwipeComplete={() => this.hideModal()}
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
              {!!this.state.error && <Text style={{color: 'red'}}>
                  error: {this.state.error}
              </Text>}
              <TouchableOpacity style={styles.button} onPress={()=>this.props.request(this.state.code)}>
                <Text>SEND</Text>
              </TouchableOpacity>
            </View>
        </Modal>
        )
    }
}

const styles = StyleSheet.create({
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
})