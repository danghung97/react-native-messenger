import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icons from "react-native-vector-icons/AntDesign";
import axios from 'axios';

export default class Mess extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
        }
    }

    sendRequestLoadRoom=()=>{
        axios.post('https://serverappfood.herokuapp.com/api/loadroom',{
            // 
        })
        this.props.navigation.navigate("chatScreen")
    }

    render(){
        return (
         <View style={styles.container}>
             <View style={styles.header}>
                <TouchableOpacity style={styles.avatar} onPress={()=> this.props.navigation.navigate("chatScreen")}>
                    <Image style={styles.avatar} source={require('../Image/avatar.jpg')} />
                </TouchableOpacity>
                <Text style={styles.name}>DANG HUNG</Text>
             </View>
             <View style={styles.Divider} />
             <View style={styles.mess}>
                 {/* <View style={styles.search}>
                    <Icons name="search1" size={20}/>
                    <View style={styles.wrapper}>
                        <TextInput
                        value
                        placeholder="search your friend"
                        placeholderTextColor="#F9A825"
                        style={styles.input}
                        onChangeText={text => this.RequestFindName(text)}
                        />
                        {this.state.listFriends.map(fr=>{
                            return(
                            <View style={styles.result}>
                                <TouchableOpacity style={styles.avatar} onPress={()=>this.props.navigation.navigate("ProfileScreen")}>
                                    <Image style={styles.avatar} source={require('../Image/avatar.jpg')} />
                                </TouchableOpacity>
                                <Text style={styles.name}>DANG HUNG</Text>
                            </View>
                            )
                        })}
                    </View>
                 </View> */}
             </View>
         </View>   
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: '#fff',
    },
    header: {
        padding: 15,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    name: {
        fontSize: 10,
        lineHeight: 12,
        fontWeight: '800',
        marginLeft: 10
    },
    Divider :{
        borderWidth: 0.5,
        borderColor: 'black',
        width: '100%',
    },
    mess: {
        width: '100%',
        padding: 10,
    },
    search:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    wrapper: {
        height: 40,
        width: '80%',
        marginLeft: 10,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    input: {
        height: 40,
        width: '100%',
        // borderWidth: 0.5,
        // borderColor: 'black',
    },
    result: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        width: '100%',
        borderColor: 'black',
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
    }
})