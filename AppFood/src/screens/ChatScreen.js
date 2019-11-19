import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions
} from 'react-native';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';
import Icons from 'react-native-vector-icons/Feather';
import Icons1 from 'react-native-vector-icons/AntDesign';
import _ from 'lodash';
import Unstated from '../store/Unstated'
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import { connect } from 'react-redux';

class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            message: props.navigation.getParam('initMessage') || [],
        }
        this.rid = props.navigation.getParam('roomId')
        this.authid = props.navigation.getParam('authid')
    }

    componentWillReceiveProps(nextProps) {
        this.receiveMessage(nextProps)
    }
    componentDidMount() {
        this.receiveMessage(this.props)
    }

    receiveMessage = (props) => {
        const messageOfRoom = props.socket.message.filter(
            msg => msg.rid === this.rid)
        if(messageOfRoom.length !== 0 && 
            _.get(messageOfRoom[0], 'ID', null) !== _.get(this.state.message[0], 'ID', null)){
            let temp = [{...messageOfRoom[0]}].concat(this.state.message)
            this.setState({message: temp})
        }
    }

    loadMoreMessage = () => {

    }

    renderItem = (item, uri) => {
        {
            if(item.item.uid === this.authid){
                const showAvatar = item.index === 0 || 
                _.get(this.state.message[item.index-1], 'uid', null) !== this.authid 
                return(
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10}}>
                        {item.item.type_message === 'image' ? 
                        <Image style={{width: 200, height: 150}} source={{uri: item.item.message}} resizeMode="cover" /> :
                        <View style={[styles.box, {backgroundColor: "#C1EEF7"}]}>
                            <Text style={{color: 'black'}}>{item.item.message}</Text>
                        </View>}
                        {showAvatar ? <Image style={[styles.avatar, {marginLeft: 10}]}
                            source={{uri: Unstated.state.account.avatar}} /> : <View style={{width: 30, height: 30, marginLeft: 10}} /> }
                    </View>
                )
            }else {
                const showAvatar = item.index === 0 || 
                _.get(this.state.message[item.index-1], 'uid', null) === this.authid
                return(
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                        {showAvatar ? <Image style={[styles.avatar, {marginRight: 10}]} 
                            source = {{ uri }} /> : <View style={{width: 30, height: 30, marginRight: 10}} /> }
                        {item.item.type_message === 'image' ? 
                        <Image style={{width: 200, height: 150}} source={{uri: item.item.message}} resizeMode="cover" /> :
                        <View style = {[styles.box, {backgroundColor: '#fff'}]} >
                            <Text style={{color: 'black'}}> {item.item.message} </Text>
                        </View>}
                    </View>
                )
            }
        }
    }
    
    render(){
        const user = this.props.navigation.getParam('user')
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.avatar}>
                            <Image style={styles.avatar} source={{uri: user.avatar}} />
                        </TouchableOpacity>
                        <Text style={styles.name}>{user.email}</Text>
                    </View>
                </View>
                <FlatList
                style={styles.content}
                data={this.state.message}
                keyExtractor={item => `message ${item.ID}`}
                inverted
                showsVerticalScrollIndicator={false}
                removeClippedSubviews
                renderItem={(item) => this.renderItem(item, user.avatar)}
                onEndReached={this.loadMoreMessage()}
                />
                <View>
                    <InputMessage
                    authId = {this.authid}
                    rid = {this.rid}
                    />
                </View>
            </View>
        )
    }
}

class InputMessage extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            msg: "",
            selfViewSrc: null,
            remoteList: {},
        }
    }
    sendMessage=(type, msg)=>{
        if(msg.trim()===''){
            return
        }
        const { authId, rid } = this.props
        const message = {
          uid: authId,
          rid,
          type_message: type,
          message: msg,
        }
        try{
            global.socket.send(JSON.stringify(message));
        } catch (error) {
            alert('send message failed: ' + error)
        }
        this.setState({msg: ""})
    }

    openImage = () => {
      ImagePicker.openCamera({
        width: 350,
        height: 300,
        cropping: true,
        mediaType: 'photo'
      }).then(image=>{
        const data = new FormData();
        let name = "image.png"
        if(image.mime === "image/jpeg") name = "image.jpg"
        data.append('file',{
          type: image.mime,
          uri: image.path,
          name,
        })
        Axios(`https://serverappfood.herokuapp.com/api/user/uploading`, {
          method: "POST",
          data,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Unstated.state.account.token}`
          },
        }).then(res=>{
          if(res.data.status){
            this.sendMessage('image', res.data.link)
          }else{
            alert(res.data.message)
          }
        }).catch(err=>console.log('err', JSON.stringify(err)))
      }).catch(err => {
        alert('open image error: ' + err)
      })
    }

    pickerImage = () => {
        ImagePicker.openPicker({
            width: 350,
            height: 300,
            cropping: true,
            mediaType: 'photo'
        }).then(image=>{
            const data = new FormData();
            let name = "image.png"
            if(image.mime === "image/jpeg") name = "image.jpg"
            data.append('file', {type: image.mime, uri: image.path, name})

            Axios(`https://serverappfood.herokuapp.com/api/user/uploading`,{
                method: "POST",
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${Unstated.state.account.token}`
                  },
            }).then(res=>{
                if(res.data.status){
                    this.sendMessage('image', res.data.link)
                }else{
                    alert(res.data.message)
                }
            }).catch(err=>console.log('err', err))
        }).catch(err => {
            alert('picker image error: ' + err)
        })
    }
    render(){
        return(
            <View>
              <RTCView streamURL={this.state.selfViewSrc} style={{ width: 200, height: 150 }} />
              <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5}}>
                <TouchableOpacity onPress={() => this.openImage()}>
                  <Icons1 name="camera" size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.pickerImage()}>
                  <Icons1 name="picture" size={25} style={{marginLeft: 10}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.requestCall()}>
                  <Icons name="phone-call" size={25} style={{marginLeft: 10}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => 
                this.props.navigation.navigate('VideoCallScreen', {

                })}>
                  <Icons name="phone-call" size={25} style={{marginLeft: 10}} />
                </TouchableOpacity>
              </View>
              <View style={{borderWidth: 1, borderColor: '#9FF7EF'}} />
              <View style={styles.send}>
                <TextInput
                value={this.state.msg}
                placeholder="message"
                onChangeText={text => this.setState({msg: text})}
                style={styles.input}
                />
                <TouchableOpacity onPress={()=>this.sendMessage('text', this.state.msg)} style={{marginLeft: 15}}>
                  <Icons name="send" size={25} />
                </TouchableOpacity>
              </View>
            </View>
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
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: '#FFFFFF',

        elevation: 5,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 0.5, 
        borderColor: '#FFF',
        alignSelf: 'flex-end'
    },
    name: {
        fontSize: 10,
        lineHeight: 12,
        fontWeight: '800',
        marginLeft: 20
    },
    content: {
        width: '100%',
        // height: 400,
        // flex: 1,
        backgroundColor: '#E5E5E5',
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
        maxWidth: Dimensions.get('screen').width * 0.6, 
        paddingHorizontal: 7,
        paddingVertical: 10, 
        minWidth: 20
    }
})

const mapStateToProps = state => {
    return {
        socket: state.socket
    }
}

export default connect(mapStateToProps, null)(Chat)