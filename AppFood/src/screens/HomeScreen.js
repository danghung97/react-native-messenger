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

class HomeScreen extends Component{
    
    render(){
        this.LogOut=()=>{
            // axios.post(`https://serverappfood.herokuapp.com/api/user/logout/`,null,{
            //     headers:{
            //         Auth
            //     },
                
            // })
            // .then(res=>console.log(res.data))
            // .catch(err=>alert(err))
            AsyncStorage.removeItem("account");
            this.props.reset();
            this.props.navigation.navigate("loginScreen");
        }
        return(
            <View>
                <TouchableOpacity onPress={()=>this.LogOut()}>
                    <Icons name="menu-fold" size={30}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProp =  state => {
	return {
		user: state.user,
	}
}

const mapDispatchToProp = {
	reset: reset,
}


export default connect(
	mapStateToProp,
	mapDispatchToProp
)(HomeScreen)
