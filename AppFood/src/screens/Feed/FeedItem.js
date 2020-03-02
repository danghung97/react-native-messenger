import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

class ItemFeed extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLike: false,
    };
  }

  onMore = () => {};

  onTriggerLike = () => {
    this.setState({isLike: !this.state.isLike});
  };

  onTriggerComment = idPost => {};

  onTriggerShare = () => {};

  render() {
    const item = this.props.item;
    const time = new Date(item.CreatedAt);
    const {isLike} = this.state;

    return (
      <View key={item.ID} style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <View style={styles.avatar}>
              <Image style={{width: 40, height: 40}} source={{uri: avatar}} />
            </View> */}
            <View style={{marginLeft: 10}}>
              {/* <Text>{name}</Text> */}
              <Text>{`${time.toDateString()}`}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.onMore()}>
            <Icons name="ellipsis1" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={{marginTop: 10}}>{item.content_text}</Text>
        {!!item.content_image && (
          <Image
            style={{width: '100%', height: 150, marginTop: 10}}
            source={{uri: item.content_image}}
          />
        )}
        <View
          style={{
            marginTop: 10,
            borderWidth: 0.5,
            borderColor: '#E0E0E0',
          }}
        />
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.itemFooter}
            onPress={() => this.onTriggerLike()}>
            <Text>{}</Text>
            {isLike ? (
              <Icons name="like1" size={30} color="blue" />
            ) : (
              <Icons name="like2" size={30} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemFooter}
            onPress={() => this.onTriggerComment()}>
            <Text>{}</Text>
            <Icons name="message1" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemFooter}
            onPress={() => this.onTriggerShare()}>
            <Text>{}</Text>
            <Icons name="sharealt" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  itemFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ItemFeed;
