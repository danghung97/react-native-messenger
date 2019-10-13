import React, {Component} from 'react';
import{
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import Avatar from '../Component/avatar'

//Access key ID: AKIAQETU5M465K5VIRLW
//Secret access key: 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 


export default class ProfileScreen extends Component{

    
    render(){
        return(
            <ScrollView style={{width: '100%' }}>
                <View style={styles.part1} />
                <View style={styles.avatar}>
                    <Avatar navigation={this.props.navigation}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    part1:{
        height: 220,
        backgroundColor: 'skyblue',
        width: '100%',
    },
    avatar:{
        top: -75,
        alignItems: 'center',
    }
})