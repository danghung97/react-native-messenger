import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    KeyboardAvoidingView,
    FlatList,
    Dimensions
} from 'react-native';
// import SocketIOClient from 'socket.io-client';
import Icons from 'react-native-vector-icons/Feather';
import _ from 'lodash';
import Unstated from '../store/Unstated'
export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            message: props.navigation.getParam('initMessage') || [],
            msg: "",
            connect: '',
        }
        this.maxWidth = Dimensions.get('screen').width * 0.6
    }


    componentWillMount(){
        this.connectSocket()
    };

    connectSocket = () => {
        if (_.isUndefined(global.socketIO)){
            global.socket = new WebSocket('ws://serverappfood.herokuapp.com/ws')
        }
        let that = this
        var connectInterval
        global.socket.onopen=()=>{
            this.setState({connect: 'connected'})
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        }

        global.socket.onclose=(e)=>{
            this.setState({connect: 'closed: '})
            // global.socket.removeAllListeners()
            connectInterval = setTimeout(this.check, 3000)
        }

        global.socket.onerror=(err)=>{
            this.setState({connect: 'err: ' + err.message})
            global.socket.close()
        }

        // global.socket.on('error')
        global.socket.onmessage=(msg)=>{
            const data = JSON.parse(msg.data)
            let temp = this.state.message
            temp = [{...data}].concat(temp)
            this.setState({message: temp})
        }
    }

    check = () => {
        if (!global.socket || global.socket.readyState === WebSocket.CLOSED) this.connectSocket()
    }
    
    handletext=(text)=>{
        this.setState({msg: text})
    }

    sendMessage=(msg)=>{
        if(msg.trim()===''){
            return
        }
        var message = {
            uid: this.props.navigation.getParam('authid'),
            rid: this.props.navigation.getParam('roomId'),
            message: msg,
        }
        try{
            global.socket.send(JSON.stringify(message));
        } catch (error) {
            alert('send message failed: ' + error)
        }
        this.setState({msg: ""})
    }

    loadMoreMessage = () => {

    }

    renderItem = (item, uri) => {
        {
            if(item.item.uid === this.props.navigation.getParam('authid')){
                return(
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
                        <View style={[styles.box, {backgroundColor: "#C1EEF7"}]}>
                            <Text style={{color: 'black'}}>{item.item.message}</Text>
                        </View>
                        <Image style={[styles.avatar, {marginLeft: 10}]}
                            source={{uri: Unstated.state.account.avatar}} />
                    </View>
                )
            }else {
                return(
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                        <Image style={[styles.avatar, {marginRight: 10}]} 
                            source = {{ uri }} />
                        <View style = {[styles.box, {backgroundColor: '#fff'}]} >
                            <Text style={{color: 'black'}}> {item.item.message} </Text>
                        </View>
                    </View>
                )
            }
        }
    }
    
    render(){
        const user = this.props.navigation.getParam('user')
        return(
        <TouchableWithoutFeedback >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.avatar}>
                        <Image style={styles.avatar} source={{uri: user.avatar}} />
                    </TouchableOpacity>
                    <Text style={styles.name}>{user.email}</Text>
                    <Text style={{
                        alignSelf: 'flex-end', 
                        fontSize: 14, 
                        lineHeight: 16, 
                        color: '#FF8000', 
                        fontWeight: '500'}}>{this.state.connect}</Text>
                </View>
                <FlatList
                style={styles.content}
                data={this.state.message}
                keyExtractor={(item, index)=>`message + ${index}`}
                inverted
                removeClippedSubviews
                renderItem={item => this.renderItem(item, user.avatar)}
                onEndReached={this.loadMoreMessage()}
                />
                <View style={styles.send}>
                    <TextInput
                    value={this.state.msg}
                    placeholder="message"
                    onChangeText={text => this.handletext(text)}
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={()=>this.sendMessage(this.state.msg)} style={{marginLeft: 15}}>
                        <Icons name="send" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff'
    },
    header: {
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 0.5, 
        borderColor: '#FFF',
    },
    name: {
        fontSize: 10,
        lineHeight: 12,
        fontWeight: '800',
        marginLeft: 10
    },
    Divider:{
        borderWidth: 0.5,
        borderColor: 'black',
        width: '100%',
    },
    content: {
        width: '100%',
        // height: 400,
        // flex: 1,
        backgroundColor: '#C4C4C4',
    },
    send: {
        width: '100%',
        padding: 10,
        borderTopWidth: 0.5,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        height: 44,
        width: "80%",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#404040',
        marginLeft: 10
    },
    box: {
        borderWidth: 1,
        borderColor: 'black', 
        borderRadius: 4,
        maxWidth: this.maxWidth, 
        paddingHorizontal: 7,
        paddingVertical: 10, 
        minWidth: 20
    }
})