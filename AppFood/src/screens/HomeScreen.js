import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

export default class HomeScreen extends Component{
    
    render(){
        this.LogOut=()=>{
            // axios.post(`https://serverappfood.herokuapp.com/api/user/logout/`,null,{
            //     headers:{
            //         Auth
            //     },
                
            // })
            // .then(res=>console.log(res.data))
            // .catch(err=>alert(err))
            this.props.navigation.navigate("loginScreen");
            AsyncStorage.removeItem("email+password+token");
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