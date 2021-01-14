import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import TypeMessage from '../common/typeMessage';
import listGame from '../common/listGame';

export default class GameModal extends React.PureComponent {
  state = {
    isVisible: false,
    responsePlayGame: null,
    disableCancle: false,
    timing: 20,
  };

  showModal = () => {
    this.setState({isVisible: true});
  };

  hideModal = () => {
    this.clearTime()
    this.setState({
      isVisible: false,
      responsePlayGame: null,
      disableCancle: false,
      timing: 20
    });
  };

  setResponsePlayGame = (responsePlayGame, disableCancle) => {
    this.setState({responsePlayGame, disableCancle})
  }

  countDown = () => {
    let timing = this.state.timing;
    this.timer = setInterval(() => {
      timing--;
      this.setState({timing})
      if(timing <= 0){
        clearInterval(this.timer)
        this.timer = null
        this.hideModal();
        this.props.sendMessage(TypeMessage.PLAY_GAME, 'CANCEL')
      }
    }, 1000)
  }

  clearTime = () => {
    if(this.timer) {
      clearInterval(this.timer)
      this.timer=null
    }
  }
  componentWillUnmount(){
    this.clearTime()
  }

  InvitePlayGame = (item) => {
    this.props.sendMessage(TypeMessage.PLAY_GAME, `INVITE ${JSON.stringify(item)}`)
  }

  render() {
    const {disableCancle, timing} = this.state;

    if (!this.state.isVisible) {
      return null;
    }
    return (
      <Modal isVisible>
        <View style={{padding: 20, width: '80%', backgroundColor: '#fff', alignSelf: 'center'}}>
          {!this.state.responsePlayGame ? 
            <View>
              {listGame.map((item, index) => {
                return (
                  <TouchableOpacity key={item.id} style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=>this.InvitePlayGame(item)}>
                    <Image
                      style={styles.icon}
                      source={item.icon}
                    />
                    <Text
                      style={styles.game}>
                      {item.game}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View> :
            <View>
              <Text>{this.state.responsePlayGame}</Text>
            </View>}
          {disableCancle ? <Text style={{
            marginTop: 15,
            alignSelf: 'center',
            fontWeight: 'normal',
            fontStyle: 'normal',
            fontSize: 12,
            lineHeight: 14,
          }}>{timing}s</Text> : null}
          <TouchableOpacity
            disabled = {disableCancle}
            style={{
              padding: 5, 
              alignSelf: 'center', 
              borderRadius: 6, 
              backgroundColor: disableCancle ? 'grey' : '#40FF00', 
              marginTop: 20}}
            onPress={() => this.hideModal()}>
            <Text style={{fontWeight: '600'}}>CANCLE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  game: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    fontStyle: 'normal',
  }
})
