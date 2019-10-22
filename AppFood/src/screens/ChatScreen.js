import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
// import SocketIOClient from 'socket.io-client';
import Icons from 'react-native-vector-icons/Feather';
import _ from 'lodash'
export default class Chat extends Component {
    constructor(props){
        super(props);
        // this.state={
        //     name: '',
        //     message: ''
        // }
        // global.socket = SocketIOClient('https://serverappfood.herokuapp.com/')
        // global.socket = new WebSocket('ws://serverappfood.herokuapp.com/ws')
        // global.socket = new WebSocket('ws://localhost:8000/ws')
        this.msg = "";
    }


    componentWillMount(){
        if (_.isUndefined(global.socketIO)){
            global.socket = new WebSocket('ws://serverappfood.herokuapp.com/chat')
        }
        global.socket.onopen=()=>{
            console.warn('connected')
        }

        // global.socket.
        
        global.socket.onclose=()=>{
            console.log('closed')
        }

        global.socket.onerror=()=>{
            console.log('err')
        }

        global.socket.onmessage=(msg)=>{
            console.log('msg', msg.data)
            const data = JSON.parse(msg.data)
            console.log(data.body)
                // appendLog(item);
            }
    };
    
    handletext=(text)=>{
        this.msg=text
    }

    sendMessage=(msg)=>{
        if(msg.trim()===''){
            return
        }
        var time = new Date()
        var currentTimeStamp = time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
        var message = {
            // userid: 1,
            // timestamp: currentTimeStamp,
            body: msg,
        }
        console.log('sendMessage')
        global.socket.send(JSON.stringify(message));
        // global.socket.send(JSON.stringify(msg))
        // this.setState({message: ''})
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.avatar}>
                        <Image style={styles.avatar} source={require('../Image/avatar.jpg')} />
                    </TouchableOpacity>
                    <Text style={styles.name}>DANG HUNG</Text>
                </View>
                <ScrollView style={styles.content}>

                </ScrollView>
                <View style={styles.send}>
                    <TextInput
                    placeholder="message"
                    onChangeText={text => this.handletext(text)}
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={()=>this.sendMessage(this.msg)} style={{marginLeft: 15}}>
                        <Icons name="send" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        width: '100%',
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
        height: 500,
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
})