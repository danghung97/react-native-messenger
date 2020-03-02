import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import {logout} from '../store/actions/UseAction';
import TouchID from 'react-native-touch-id';

class CustomDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false,
      canAuthenticate: true,
    };
  }

  componentDidMount() {
    TouchID.isSupported()
      .then(type => {
        this.setState({canAuthenticate: true});
      })
      .catch(err => {
        this.setState({canAuthenticate: false});
      });
  }

  swithAuthenTouchID = value => {
    this.setState({switchValue: value});
  };

  render() {
    const {navigation} = this.props;
    const {avatar} = this.props.user.user;
    const {canAuthenticate, switchValue} = this.state;
    const routes = navigation.state.routes[0].routes[0].routes;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => {
            navigation.navigate('ImageZoomScreen', {
              uri: avatar,
            });
          }}>
          <Image style={{width: 100, height: 100}} source={{uri: avatar}} />
        </TouchableOpacity>
        {canAuthenticate ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            <Text>Authenticate with touch ID</Text>
            <Switch
              value={switchValue}
              onValueChange={value => this.swithAuthenTouchID(value)}
            />
          </View>
        ) : null}
        {routes.map(route => {
          return (
            <View key={route.key} style={styles.btnScreen}>
              <TouchableOpacity
                onPress={() => {
                  ToastAndroid.show(route.routeName, ToastAndroid.SHORT);
                }}>
                <Text>{route.routeName}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        <TouchableOpacity
          style={{bottom: 0, position: 'absolute', marginBottom: 25}}
          onPress={() => this.props.logout()}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // active color: #5EB8FF
  container: {
    backgroundColor: '#0288D1',
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  avatar: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#fff',
    marginTop: 15,
  },
  btnScreen: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'grey',
  },
});

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {logout: logout})(CustomDrawer);
