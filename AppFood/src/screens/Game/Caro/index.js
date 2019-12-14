import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Rectangle from './Rectangle';
import {connect} from 'react-redux';

import _ from 'lodash';

class Caro extends Component {
  row= new Array(20).fill(null);
  column= new Array(15).fill(null);
  constructor(props){
    super(props);
    this.state = {
      
      boardChess: new Array(20*15).fill(null),
      myTurn: this.props.navigation.getParam('myTurn'),
    };
    this.rid = props.navigation.getParam('roomId');
    // this.friend = this.props.navigation.getParam('friend');
    this.user = props.navigation.getParam('user');
  }

  sendMessage = (type, msg) => {
    let newMessage = msg.trim();
    if (newMessage === '') {
      return;
    }
    const message = {
      uid: this.user.ID,
      rid: this.rid,
      type_message: type,
      message: newMessage,
    };
    try {
      global.socket.send(JSON.stringify(message));
    } catch (error) {
      alert('send message failed: ' + error);
    }
  };
  toHit = (posX, posY) => {
    this.sendMessage('playing', `${posX} ${posY}`) // strike position
  }

  componentWillReceiveProps(nextProps){
    this.receiveMessage(nextProps)
  }
  receiveMessage = props => {
    const messageOfRoom = props.socket.message.filter(
      msg => msg.rid === this.rid,
    );
    if(messageOfRoom.length === 0 || _.get(messageOfRoom[0], 'type_message', '') !== 'playing'){
      return
    }
    else{
      const splited = _.get(messageOfRoom[0], 'message', '').split(' ')
      let posX = !!Number(splited[0]) || Number(splited[0]) === 0 ? Number(splited[0]) : null
      let posY = !!Number(splited[1]) || Number(splited[1]) === 0 ? Number(splited[1]) : null
      let isWin = splited[3]
      let boardChess = this.state.boardChess
      if ((!posX && posX !== 0) || (!posY && posY !== 0)) {
        return;
      }
      else if(_.get(messageOfRoom[0], 'uid', 0) === this.user.ID) {
        boardChess[posX*this.row.length+posY] = 'X'
        this.setState({boardChess, myTurn: false})
      } else {
        boardChess[posX*this.row.length+posY] = 'O'
        this.setState({boardChess, myTurn: true})
      }
    }
  }

  render() {
    const {boardChess, myTurn} = this.state;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <Text style={{ marginBottom: 10 }}>{myTurn ? 'Your turn' : `Your friend's turn`}</Text>
        <View>
          {this.row.map((r, row_idx) => {
            return (
              <View key={`${row_idx}`} style={{flexDirection: 'row'}}>
                {this.column.map((c, column_idx) => {
                  return (
                    <TouchableOpacity
                      disabled = {!myTurn}
                      key={`${column_idx}`}
                      onPress={() => this.toHit(row_idx, column_idx)}>
                      <Rectangle
                        numberOfRows = {this.row.length}
                        numberOfColumns = {this.column.length}
                        value={boardChess[row_idx*this.row.length+column_idx]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Caro);


