import React, {Component} from 'react';
import{
    View,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import Avatar from '../Component/avatar'

//Access key ID: AKIAQETU5M465K5VIRLW
//Secret access key: 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 


export default class ProfileScreen extends Component{

    
    render(){
        return(
            <ScrollView style={{width: '100%', display: "flex"}}>
                <View style={styles.part1} />
                <View style={styles.avatar}>
                    <Avatar navigation={this.props.navigation}/>
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.input}>

                    </Text>
                    <Text style={styles.input}>

                    </Text>
                    <Text style={styles.input}>

                    </Text>
                    <Text style={styles.input}>

                    </Text>
                    <Text style={styles.input}>

                    </Text>
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
        alignSelf: 'center',
        position: "absolute",
        marginTop: 160
    },
    containerInput:{
        width: '100%',
        alignItems:"center",
        marginTop: 60,
        paddingTop: 25
    },
    input: {
        height: 44,
        width: "90%",
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderColor: 'black',
        borderWidth: 2
    }
})