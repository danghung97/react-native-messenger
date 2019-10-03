import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

export default class Avatar extends Component{
    constructor(props){
        super(props);
        this.state={
            path: '',
        }
    }
    openPicker=()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo'
        }).then(image=>{
            this.setState({path: image.path})
        })
    }
    render(){
        const { path } = this.state;
        let uri= !path ? require('../Image/avatar.jpg') : {uri: path};
        return(
            <View>
                <View style={styles.avatar} >
                    <Image style={styles.avatar} source={uri} />
                </View>
                <TouchableOpacity onPress={()=>this.openPicker()}>
                    <Text> picker image </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    avatar:{
        width: 120,
        height: 120,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'black'
    }
})