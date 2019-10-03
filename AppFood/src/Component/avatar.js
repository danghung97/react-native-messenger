import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign'
import BottomSheetDialog from './popUpPicker'
import ImagePicker from 'react-native-image-crop-picker'

export default class Avatar extends Component{
    constructor(props){
        super(props);
        this.state={
            path: '',
            isVisible: false,
        }
    }
    openPicker=()=>{
        this.setState({
            isVisible: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            isVisible: false
        })
    }

    openImage = () => {
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
        const { path, isVisible } = this.state;
        let uri= !path ? require('../Image/avatar.jpg') : {uri: path};
        return(
            <View style={styles.container}>
                <View style={styles.avatar} >
                    <Image style={styles.avatar} source={uri} />
                </View>
                <TouchableOpacity onPress={()=>this.openPicker()} style={styles.camera}>
                    <Icons name="camerao" size={30}/>
                </TouchableOpacity>
                <BottomSheetDialog 
                    isVisible={isVisible} 
                    closeModal={this.handleCloseModal}
                    openImage={this.openImage}/>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flexDirection: "row"
    },
    avatar:{
        width: 120,
        height: 120,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: 'black'
    },
    camera: {
        justifyContent: "flex-end"
    }
})