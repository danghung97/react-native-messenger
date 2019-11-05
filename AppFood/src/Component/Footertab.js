import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/AntDesign'

class CustomTabBarItem extends React.PureComponent {
    render() {
  
      const {name, focused, onPressItem, nameIcon} = this.props;
  
      return (
        <TouchableOpacity style={{flex: 1, alignItems: 'center', backgroundColor: focused ? '#BBEBEB': '#fff'}}
          onPress={()=>onPressItem(name)}>
          {nameIcon ==='message1' ? <View style={{ marginBottom: 20, paddingHorizontal: 5, backgroundColor: '#FA0606', position: 'absolute' }}>
            <Text style={{color: '#fff'}}>11</Text>
          </View> : <View />}
          <Icons name={nameIcon} size={30} color="#333" />
          <Text >{name}</Text>
        </TouchableOpacity>
      );
    }
  }
export default class CustomTabBar extends React.Component {
    navigationHandler = (name) => {

        const {navigation} = this.props;
        navigation.navigate(name);
    }

  render() {

    // a tab bar component has a routes object in the navigation state
    const {navigation} = this.props;
    const routes = navigation.state.routes;
    const listIcon = [{"name": "home"}, {"name": "profile"}, {"name": "message1"}]

    return (
        <View>
            <View style={{borderWidth: 1, borderColor: '#BBEBEB'}} />
            <View style={styles.container}>
                {routes.map((route, index) => {

                    return (<CustomTabBarItem
                        nameIcon={listIcon[index].name}
                        key={index}
                        name={route.routeName}
                        onPressItem={this.navigationHandler}
                        focused={navigation.state.index === index}
                    />);
                })}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row'
  }
})
