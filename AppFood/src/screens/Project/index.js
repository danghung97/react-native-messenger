import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { messageSocket } from '../../store/actions/UseAction'
import AppNavigation from '../../navigation/AppNavigation'

class Project extends Component {

    componentDidMount(){
        this.connectSocket()
    };

    connectSocket = () => {
        if (_.isUndefined(global.socketIO)){
            global.socket = new WebSocket('ws://serverappfood.herokuapp.com/ws')
        }
        // let that = this
        var connectInterval
        global.socket.onopen=()=>{
            alert('Connected Websocket')
            const message = {
                uid: this.props.user.user.ID,
                rid: 0,
                type_message: "client-connected",
                message: "connected",
            }
            try{
                global.socket.send(JSON.stringify(message));
            } catch (error) {
                alert('send message failed: ' + error)
            }
            // global.socket.send
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        }

        global.socket.onclose=(e)=>{
            alert('Websocket closed')
            if (global.isLogging){
                connectInterval = setTimeout(this.check, 3000)
            }
        }

        global.socket.onerror=(err) => {
            // alert('Websocket error')
            console.log('socket err', err)
            global.socket.close()
        }

        global.socket.onmessage=(msg)=>{
            const data = JSON.parse(msg.data)
            // console.log('onmessage', data)
            this.props.messageSocket(data)
        }
    }

    check = () => {
        if (!global.socket || global.socket.readyState === WebSocket.CLOSED) this.connectSocket()
    }
    
    render() {
        return(
            <AppNavigation />
        )
    }
}

const mapStateToProps = state => {
	return {
        user: state.user
    }
}

const mapDispatchToProps = {
	messageSocket: messageSocket,
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Project)