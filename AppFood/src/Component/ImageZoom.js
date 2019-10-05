import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Image
} from 'react-native';

export default class ImageZoom extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.Image} resizeMode="cover" source={this.props.navigation.getParam('uri')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image:{
        width: 350,
        height: 300,
    }
})