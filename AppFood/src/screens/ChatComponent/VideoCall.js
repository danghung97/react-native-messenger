import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity
} from 'react-native';
import {
    RTCPeerConnection,
    RTCMediaStream,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStreamTrack,
    mediaDevices,
  } from 'react-native-webrtc';
import { connect } from 'react-redux';

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const pcPeers = {}
let localStream;

class VideoCall extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
    }
    this.userId = props.navigation.getParam('userId')
    this.rid = props.navigation.getParam('rid')
  }

  getLocalStream = (isFront, callback) => {
    // let videoSourceId
  
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices.getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30
          },
          facingMode: (isFront ? "user" : "environment"),
          optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
        }
      })
      .then(stream => {
        // Got stream!
        callback(stream);
      })
      .catch(error => {
        // Log error
      })
    })
  }
  sendMessage = (type_message, msg) => {
    const message = {
      uid: this.userId,
      rid: this.rid,
      type_message,
      message: msg,
    }
    try{
      global.socket.send(JSON.stringify(message));
    } catch (error) {
      alert('send message failed: ' + error)
    }
  }

  createPC = (userId, isOffer) => {
    const pc = new RTCPeerConnection(configuration)
    pcPeers[userId] = pc
  
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendMessage('WebRTC', JSON.stringify(event.candidate))
      }
    }
  
    // createOffer = () => {
    //   pc.createOffer(function (desc) {
    //     pc.setLocalDescription(desc, function () {
    //       this.sendMessage('WebRTC', JSON.stringify(pc.localDescription))
    //     }, this.logError)
    //   }, this.logError)
    // }

    pc.onnegotiationneeded = () => {
      if(isOffer) {
        pc.createOffer((desc) => {
          pc.setLocalDescription(desc, () => {
            this.sendMessage('WebRTC', JSON.stringify(pc.localDescription))
          }, this.logError)
        }, this.logError)
      }
    }
  
    pc.onconnectionstatechange = (event) => {
      if(event.target.iceConnectionState === 'completed') {
        // setTimeout(()=> {
        //   this.getStats()
        // }, 1000)
      }
      if(event.target.iceConnectionState === 'connected'){
        // createDataChannel()
      }
    }
  
    pc.onsignalingstatechange = (event) => {

    }
  
    pc.onaddstream = (event) => {
      const remoteList = this.state.remoteList
      remoteList[userId] = event.stream.toURL()
      this.setState({remoteList})
    }

    pc.onremovestream = (event) => {

    }

    pc.addStream(localStream);
    return pc;
  }
  
  logError = (error) => {
    console.log("logError", error);
  }

  componentDidMount() {
    this.getLocalStream(true, (stream) => {
      localStream = stream
      this.setState({ selfViewSrc: stream.toURL() })
    })
    setTimeout(()=>{
      this.createPC(this.userId, true)
    },500)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data.message === 'leave') {
      this.leave(nextProps.data.uid)
    }
    if (nextProps.data) {
      const fromId = nextProps.data.uid
      let pc;
      if (fromId in pcPeers) {
        pc = pcPeers[fromId]
      } else {
        pc = this.createPC(fromId, false)
      }
      if (JSON.parse(nextProps.data.message).sdp) {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp), () => {
          if (pc.remoteDescription.type === "offer") {
            pc.createAnswer((desc) => {
              pc.setLocalDescription(desc, () => {
                this.sendMessage('WebRTC', JSON.stringify(pc.localDescription))
              }, this.logError);
            }, this.logError);
          }
        })
      }else {
        console.log('exchange candidate', data);
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    }
  }

  mapHash = (hash, func) => {
    const array = [];
    for (const key in hash) {
      const obj = hash[key];
      array.push(func(obj, key));
    }
    return array;
  }

  leave = (userId) => {
    const pc = pcPeers[userId]
    pc.close()
    delete pcPeers[userId]
    const remoteList = this.state.remoteList
    delete remoteList[userId]
    this.setState({remoteList})
  }

  handleLeave = () => {
    this.sendMessage('WebRTC', 'leave')
    this.props.navigation.goBack()
  }
  _switchVideoType = () => {
    const isFront = !this.state.isFront
    this.setState({isFront});
    this.getLocalStream(isFront, (stream) => {
      if(localStream) {
        for (const id in pcPeers) {
          const pc = pcPeers[id]
          pc && pc.removeStream(localStream)
        }
        localStream.release()
      }
      localStream = stream
      this.setState({selfViewSrc: stream.toURL()})

      for (const id in pcPeers) {
        const pc = pcPeers[id]
        pc && pc.addStream(localStream)
      }
    })
  }

  render(){
    return(
      <View style={{width: '100%', height: '100%', justifyContent: 'space-between'}}>
        <RTCView streamURL={this.state.selfViewSrc} style={{width: '100%', height: '45%'}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>
            {this.state.isFront ? "Use front camera" : "Use back camera"}
          </Text>
          <TouchableOpacity
            style={{borderWidth: 1, borderColor: 'black', marginLeft: 15}}
            onPress={this._switchVideoType}>
            <Text>Switch camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{borderWidth: 1, borderColor: 'black', marginLeft: 15}}
            onPress={this.handleLeave}>
            <Text>LEAVE</Text>
          </TouchableOpacity>
        </View>
        {
          this.mapHash(this.state.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
          })
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.socket.data_webrtc
  }
}

export default connect(mapStateToProps, null)(VideoCall)