import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import { reset } from '../store/actions/UseAction';
import axios from 'axios';

class HomeScreen extends Component{
    
    LogOut=()=>{
        axios.post('https://serverappfood.herokuapp.com/api/user/logout', {
            fcm_token: global.fcmToken
        },{
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${this.props.user.user.token}`
            },
        }).then(res => {
            if(res.data.status){
                console.warn('success', res.data.message)
            }
        })
        AsyncStorage.removeItem("account");
        this.props.reset();
        global.isLogging = false;
        global.socket.close();
    }
    render(){
        return(
            <View>
                <TouchableOpacity onPress={()=>this.LogOut()}>
                    <Icons name="menu-fold" size={30}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps =  state => {
	return {
		user: state.user,
	}
}

const mapDispatchToProps = {
	reset: reset,
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen)
