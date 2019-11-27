import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { removenotifi } from '../store/actions/UseAction'
import Icons from 'react-native-vector-icons/AntDesign'
import axios from 'axios';

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
class CustomTabBar extends React.Component {
    navigationHandler = (name) => {

        const {navigation} = this.props;
        navigation.navigate(name);
    }
    
    async componentWillReceiveProps(nextProps){
      const { navigation } = this.props
      const {user, data_notification} = nextProps
      const received = JSON.parse(data_notification.data.author || "{}")

      if (data_notification.data.screen === "ChatScreen"){
        axios.post(`https://serverappfood.herokuapp.com/api/loadroom`,
        {
            authid: user.user.ID,
            received: received.ID
        },
        {
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${user.user.token}`
            },
        }).then(res=>{
          if(res.data.status){
              navigation.navigate("chatScreen", {
              roomId: res.data.rid, 
              user: received,
              authid: user.user.ID,
              initMessage: res.data.arrayMessage})
              this.props.removenotifi()
              // let tempArr = arrMessenger.filter(rs => rs.ID !== received.ID)
              
              // let temp = tempArr.concat(received)
              // AsyncStorage.setItem("arrayMessenger", JSON.stringify(temp))
              // this.setState({arrMessenger: temp})
          }else {
              alert(res.data.message)
          }
        }).catch(err => console.warn(err))
      }
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

const mapStateToProps = state => {
  return {
    user: state.user,
    data_notification: state.notifi
  }
}

const mapDispatchToProps = {
  removenotifi: removenotifi
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar)
