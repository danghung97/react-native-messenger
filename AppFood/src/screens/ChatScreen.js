import React, {Component} from 'react';
import {
    View,
    TextInput,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
// import io from 'socketio'

export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            name: ''
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                <TouchableOpacity style={styles.avatar}>
                    <Image style={styles.avatar} source={require('../Image/avatar.jpg')} />
                </TouchableOpacity>
                <Text style={styles.name}>DANG HUNG</Text>
                </View>
                <ScrollView style={styles.content}>

                </ScrollView>
                <View style={styles.send}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        backgroundColor: '#fff'
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
    Divider:{
        borderWidth: 0.5,
        borderColor: 'black',
        width: '100%',
    },
    content: {
        width: '100%'
    },
    send: {
        width: '100%',
        padding: 10,
        borderTopWidth: 0.5,
        height: 70,
    }
})