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
import { UploadImage } from '../store/actions/UseAction';
import { connect } from 'react-redux';
import LoadingModal from './loading'

class Avatar extends Component{
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.upload.isLoading) this.refs['loading'].showModal()
    else {
      this.refs['loading'].hideModal()
      if(!nextProps.upload.err) {
        alert(nextProps.upload.err)
      }
    }
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
        this.props.UploadImage(data) // action update avatar
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

        this.props.UploadImage(data)
      }catch (error) {
        console.warn(error)
      }
    })
    .catch(err => {
      this.setState({ isVisible: false })
      alert('picker image error: ' + err)
    })
  }

  render(){
    const { isVisible } = this.state;
    let uri = !this.props.uri ? require('../Assets/Image/avatar.jpg') : {uri: this.props.uri};
    return(
      <>
        <View style={styles.container}>
          <TouchableOpacity style={styles.avatar} onPress={()=>this.props.navigation.navigate("ImageZoomScreen", {
            uri: uri
          })}>
            <Image style={{ width: 120, height: 120 }} source={uri} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.openPicker()} style={styles.camera} >
            <Icons name="camerao" size={30} />
          </TouchableOpacity>
          <BottomSheetDialog
            isVisible={isVisible} 
            closeModal={this.handleCloseModal}
            openImage={this.openImage}
            pickerImage={this.pickerImage}/>
        </View>
        <LoadingModal ref="loading" />
      </>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flexDirection: "row",
  },
  camera: {
    justifyContent: "flex-end",

  },
  avatar:{
    width: 120,
    height: 120,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
})

const mapStateToProps = state => {
  return {
    upload: state.upload
  }
}

const mapDispatchToProps = {
  UploadImage: UploadImage 
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Avatar)
