import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import Icons from 'react-native-vector-icons/AntDesign';
import BottomSheetDialog from './popUpPicker';
import ImagePicker from 'react-native-image-crop-picker';
import ApiService from '../store/axios/AxiosInstance';
import PATH from '../store/axios/Url';

export default class Avatar extends Component{
  constructor(props){
    super(props);
    this.state={
      isVisible: false,
      link: null,
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
    }).then( async (image) => {
      try{
        this.setState({ isVisible: false})
        const data = new FormData();
        let name = "image.png"
        if(image.mime === "image/jpeg") name = "image.jpg"
        data.append('file',{
          type: image.mime,
          uri: image.path,
          name,
        })
        const response = await ApiService.post(PATH.UPDATE_AVATAR, {
          data
        })
        if(response.data.status){
        }else{
          alert(res.data.message)
        }
      } catch (error){
        console.warn(error)
      }
    })
    .catch(err => {
      this.setState({ isVisible: false})
      alert('open image error: ' + err)
    })
  }

  pickerImage = () => {
    ImagePicker.openPicker({
      width: 350,
      height: 300,
      cropping: true,
      mediaType: 'photo'
    }).then( async (image) => {
      try{
        this.setState({isVisible: false})
        const data = new FormData();
        let name = "image.png"
        if(image.mime === "image/jpeg") name = "image.jpg"
        data.append('file', {type: image.mime, uri: image.path, name})

        const response = await ApiService.post(PATH.UPDATE_AVATAR, {
          data
        })
        if(response.data.status){
        }else {
          alert(res.data.message)
        }
      }catch (error) {
        console.warn(error)
      }
    })
    .catch(err => {
      this.setState({ isVisible: false})
      alert('picker image error: ' + err)
    })
  }

  render(){
    const { isVisible, link } = this.state;
    let uri = !this.props.uri ? require('../Assets/Image/avatar.jpg') : {uri: this.props.uri};
    if(!!link) uri = {uri: link}
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