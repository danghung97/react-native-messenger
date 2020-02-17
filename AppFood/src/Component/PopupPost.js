import React from 'react';
import { 
  View, 
  Modal,
  Text,
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions } from 'react-native';
import _ from 'lodash';

const WIDTH_SCREEN = Dimensions.get('screen').width;
const HEIGHT_SCREEN = Dimensions.get('screen').height;

class PopupPost extends React.Component {
  _index = 0;
  _item = null;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({ show: true });
  };

  hide = () => {
    this.setState({ show: false });
  };

  render() {
    const { show } = this.state;
    if (!show) {
      return null;
    }
    return (
      <Modal animationType="fade" transparent visible onRequestClose={() => {}}>
        <View style={styles.backdrop} />
        <TouchableWithoutFeedback onPress={this.hide}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View style={styles.modalContainer}>
              <View style={styles.contentContainer}>
                <TouchableOpacity onPress={this._onDelete} style={styles.contentButton}>
                  <Text style={styles.contentButtonText}>Edit Post</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#FFF',
                  }}
                />
                <TouchableOpacity onPress={this._onDelete} style={styles.contentButton}>
                  <Text style={styles.contentButtonText}>Delete Post</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.hide} style={styles.contentButton}>
                  <Text style={styles.contentButtonText}>Cancle</Text>
                </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#353131',
    opacity: 0.3,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN,
  },
  modalContainer: {
    width: WIDTH_SCREEN,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentContainer: {
    marginBottom: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  contentButton: {
    backgroundColor: '#FFFF',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentButtonText: {
    fontSize: 18,
    lineHeight: 25,
    color: '#007AFF',
  },
  doneButton: {
    backgroundColor: '#FFFF',
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PopupPost;