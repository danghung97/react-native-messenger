import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

export default class GameModal extends React.PureComponent {
  state = {
    isVisible: false,
    responsePlayGame: null,
  };
  showModal = () => {
    this.setState({isVisible: true});
  };

  hideModal = () => {
    this.setState({isVisible: false});
  };

  Accept = () => {
    this.props.sendMessage('play_game', 'Accept');
  }

  Decline = () => {
    this.props.sendMessage('play_game', 'Decline');
    this.hideModal();
  }

  render() {
    if (!this.state.isVisible) {
      return null;
    }
    return (
      <Modal isVisible>
        <View style={{padding: 20, width: '80%', backgroundColor: '#fff', alignSelf: 'center'}}>
          <Text>
              {`Your friend invite you play game`}
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
