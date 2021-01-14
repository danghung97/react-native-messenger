import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import Icons from 'react-native-vector-icons/AntDesign';

class CustomDrawer extends Component {

  render() {
    const {navigation} = this.props;
    const routes = navigation.state.routes;
    return (
      <View style={styles.container}>
        <View style={styles.avatar} >
          <Image style={{ width: 100, height: 100 }} source={{uri: this.props.user.user.avatar}} />
        </View>
        {/* {routes.map((route, index) => {
          return (<CustomDrawerItem
              nameIcon={listIcon[index].name}
              key={index}
              name={route.routeName}
              onPressItem={this.navigationHandler}
              focused={navigation.state.index === index}
          />);
        })} */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // active color: #5EB8FF
  container: {
    backgroundColor: '#0288D1',
    flex: 1,
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#fff',
    marginTop: 15,
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps, null)(CustomDrawer);