import React, {PureComponent} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

class HomeToolBar extends PureComponent {
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    const {title} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => this.toggleDrawer()}>
          <Icons name="menu-fold" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    alignSelf: 'flex-start',
  },
  title: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    marginRight: 30,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default HomeToolBar;
