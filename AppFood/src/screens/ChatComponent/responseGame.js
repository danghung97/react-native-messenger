import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import TypeMessage from '../common/typeMessage';
import listGame from '../common/listGame';

export default class GameModal extends React.PureComponent {
  state = {
    isVisible: false,
    game: null,
  };
  showModal = (game) => {
    this.setState({isVisible: true, game});
  };

  hideModal = () => {
    this.setState({isVisible: false, game: null});
  };

  Accept = () => {
    this.props.sendMessage(TypeMessage.PLAY_GAME, 'ACCEPT');
  }

  Decline = () => {
    this.props.sendMessage(TypeMessage.PLAY_GAME, 'DECLINE');
    this.hideModal();
  }

  render() {
    const {isVisible, game} = this.state
    if (!isVisible) {
      return null;
    }
    return (
      <Modal isVisible>
        <View style={{padding: 20, width: '80%', backgroundColor: '#fff', alignSelf: 'center'}}>
          <Text>
              {`Your friend invite you play game ${!game ? '' : game}`}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
            <TouchableOpacity
                style={{padding: 5, alignSelf: 'center', borderRadius: 6, backgroundColor: '#FB0000', marginTop: 20}}
                onPress={() => this.Accept()}>
                <Text style={{fontWeight: '600'}}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{padding: 5, alignSelf: 'center', borderRadius: 6, backgroundColor: '#40FF00', marginTop: 20}}
                onPress={() => this.Decline()}>
                <Text style={{fontWeight: '600'}}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
