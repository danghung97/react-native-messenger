import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import {
    RTCPeerConnection,
    RTCMediaStream,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStreamTrack,
    getUserMedia,
  } from 'react-native-webrtc';

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
const pcPeers = {}
let localStream;

function getLocalStream(isFront, callback) {
  let videoSourceId

  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources(sourceInfos => {
      console.log("sourceInfos: ", sourceInfos);

      for (const i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind === "video" && sourceInfo.facing === (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.id;
        }
      }
    });
  }
  getUserMedia({
    audio: true,
    video: {
      mandatory: {
        minWidth: 640, // Provide your own width, height and frame rate here
        minHeight: 360,
        minFrameRate: 30,
      },
      facingMode: (isFront ? "user" : "environment"),
      optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
    }
  }, function (stream) {
    console.log('getUserMedia success', stream);
    callback(stream);
  }, logError)
}

export default class VideoCall extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
    }
  }

  createPC = (userId, isOffer) => {
    const pc = new RTCPeerConnection(configuration)
    pcPeers[userId] = pc
  
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const message = {
          
        }

      }
    }
  
    createOffer = () => {
      pc.createOffer(function (desc) {
        pc.setLocalDescription(desc, function () {
          //socket
        }, logError)
      }, logError)
    }
  
    pc.onconnectionstatechange = (event) => {
      if(event.target.iceConnectionState === 'completed') {
        setTimeout(()=> {
          this.getStats()
        }, 1000)
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
    getLocalStream(true, function(stream) {
      localStream = stream
      this.setState({ selfViewSrc: stream.toURL() })
    })
    global.pc.createOffer().then(desc => {
      global.pc.setLocalDescription(desc).then(() => {
        console.warn('pc', pc.localDescription)
        // send pc.localDescription to peer
      })
    })
  }

  //when somebody sends us an offer 
  handleOffer = (offer) => {
    global.pc.setRemoteDescription(new RTCSessionDescription(offer))
    global.pc.createAnswer((answer) => { 
      global.pc.setLocalDescription(answer, ()=>{
        
      }); 
      //send
   })
  }

  //when we got an answer from a remote user
  handleAnswer = (answer) => {
    global.pc.setRemoteDescription(new RTCSessionDescription(answer))
  }

  //when we got an ice candidate from a remote user 
  handleCandidate = (candidate) => { 
    global.pc.addIceCandidate(new RTCIceCandidate(candidate)); 
  };

  handleLeave = () => {
    global.pc.close()
  }

  _switchVideoType = () => {
    const isFront = !this.state.isFront
    this.setState({isFront});
    getLocalStream(isFront, function(stream) {
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
        <RTCView streamURL={this.state.selfViewSrc} style={{width: '100%', height: '4459%', backgroundColor: 'black'}} />
        <View style={{flexDirection: 'row'}}>
          <Text>
            {this.state.isFront ? "Use front camera" : "Use back camera"}
          </Text>
          <TouchableOpacity
            style={{borderWidth: 1, borderColor: 'black'}}
            onPress={this._switchVideoType}>
            <Text>Switch camera</Text>
          </TouchableOpacity>
        </View>
        <RTCView style={{width: '100%', height: '45%', backgroundColor: 'black'}} />
      </View>
    )
  }
}