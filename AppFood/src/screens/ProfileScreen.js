import React, {Component} from 'react';
import{
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Avatar from '../Component/avatar'

export default class ProfileScreen extends Component{
    render(){
        return(
            <ScrollView style={{width: '100%'}}>
                <View style={styles.part1} />
                <View style={styles.avatar}>
                    <Avatar />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    part1:{
        height: 250,
        backgroundColor: 'skyblue',
        width: '100%',
    },
    avatar:{
        top: -75,
        alignItems: 'center',
    }
})