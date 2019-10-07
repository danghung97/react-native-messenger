import React, {Component} from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';

export default class HomeScreen extends Component{
    
    render(){
        this.LogOut=()=>{
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