import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {DrawerActions} from 'react-navigation-drawer';
import TouchID from 'react-native-touch-id';
import HomeToolBar from './toolbar/HomeToolBar';
import HomeNewFeed from './Feed/HomeNewFeed';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSupported: false,
    };
  }

  LogOut = () => {
    this.props.navigation.toggleDrawer();
  };

  componentDidMount() {
    TouchID.isSupported()
      .then(type => {
        this.setState({
          isSupported: true,
        });
      })
      .catch(err => {
        this.setState({
          isSupported: false,
        });
      });
  }

  authenticateWithTouchID = () => {
    if (this.state.isSupported) {
      TouchID.authenticate('Wait for finger scan', {
        title: 'Scan',
        fallbackTitle: 'Scan',
      });
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <HomeToolBar navigation={this.props.navigation} title="Home" />
        <HomeNewFeed />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);
