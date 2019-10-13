import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign';
import BottomSheetDialog from './popUpPicker';
import ImagePicker from 'react-native-image-crop-picker';
export default class Avatar extends Component{
    constructor(props){
        super(props);
        this.state={
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
        ImagePicker.openCamera({
            width: 350,
            height: 300,
            cropping: true,
            mediaType: 'photo'
        }).then(image=>{
            this.setState({ isVisible: false})
            const data = new FormData();
            data.append('file',{
                type: image.mime,
                uri: image.path,
                name: "testing.jpg"
            })
            console.log(JSON.stringify(data))
            Axios(`https://serverappfood.herokuapp.com/api/user/uploading`, {
                method: "POST",
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(res=>{
                console.log('res', res)
            }).catch(err=>console.log('err', JSON.stringify(err)))
        })
    }

    pickerImage = () => {
        ImagePicker.openPicker({
            width: 350,
            height: 300,
            cropping: true,
            mediaType: 'photo'
        }).then(image=>{
            this.setState({isVisible: false})
            const data = new FormData();
            data.append('file', {type: 'image/jpg', uri: image.path, name: 'test.jpg'})

            Axios(`https://serverappfood.herokuapp.com/api/user/uploading`,{
                method: "POST",
                data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            }).then(res=>{
                console.log('res', res)
            }).catch(err=>console.log('err', err))
        })
    }

    render(){
        const { isVisible } = this.state;
        let uri= !this.props.uri ? require('../Image/avatar.jpg') : {uri: this.props.uri};
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.avatar} onPress={()=>this.props.navigation.navigate("ImageZoomScreen", {
                    uri: uri
                })}>
                    <Image style={styles.avatar} source={uri} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.openPicker()} style={styles.camera}>
                    <Icons name="camerao" size={30}/>
                </TouchableOpacity>
                <BottomSheetDialog
                    isVisible={isVisible} 
                    closeModal={this.handleCloseModal}
                    openImage={this.openImage}
                    pickerImage={this.pickerImage}/>
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