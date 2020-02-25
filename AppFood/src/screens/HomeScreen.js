import React, {Component} from 'react';
import { View, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import { logout } from '../store/actions/UseAction';
import { DrawerActions } from 'react-navigation-drawer';

class HomeScreen extends Component {
  LogOut = () => {
    // this.props.logout();
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.LogOut()}>
          <Icons name="menu-fold" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logout: logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
