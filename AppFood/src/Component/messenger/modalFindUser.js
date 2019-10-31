import React, {Component} from 'react';
import{
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modal';

export default class ModalFindUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            isLoading: false,
            user: "",
        }
    }
    showModal = () => {
        this.setState({isVisible: true})
    }
    hideModal = () => {
        this.setState({isVisible: false})
    }

    catchUser = (user) => {
        this.setState({user: user})
    }
    render(){
        const {goChat} = this.props;
        return (
            <Modal 
                isVisible={this.state.isVisible}
                onBackdropPress={() => this.hideModal()}
                onBackButtonPress={() => this.hideModal()}
                onSwipeComplete={() => this.hideModal()}
                swipeDirection={["left","right","down"]}>
                <View style={{
                    padding: 10, 
                    alignSelf: 'center', 
                    backgroundColor: 'white', 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'space-between'}}>
                    <Image style={{
                        width: 50, 
                        height: 50, 
                        borderRadius: 25,
                        borderColor: '#fff',
                        borderWidth: 1
                        }} 
                        source ={{uri: this.state.user.avatar}} />
                    <Text style={{color: 'black'}}>{this.state.user.mail}</Text>
                    <TouchableOpacity style={{
                        width: 100, 
                        height: 40, 
                        backgroundColor: '#7FF6C1',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20,
                        borderRadius: 6,}} onPress={()=>goChat(this.state.user)} >
                        {!this.state.isLoading ? <Text style={{
                            fontSize: 18,
                            lineHeight: 20,
                            fontWeight: '800',
                            color: '#fff'}}>Chat</Text> : 
                            <ActivityIndicator size="large" color="#fff" />}
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}