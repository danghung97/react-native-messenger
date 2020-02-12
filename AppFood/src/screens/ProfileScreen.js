import React, {Component} from 'react';
import{
    View,
    ScrollView,
    StyleSheet,
    Text,
    RefreshControl,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';
import Avatar from '../Component/avatar'
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/AntDesign'
import { AddPost } from '../store/actions/UseAction';

class ProfileScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      refreshing: false
    }
    this.content_text = "";
    this.content_image = "";
  }
  onRefresh = () => {
    this.setState({refreshing: true})
    // axios.get("https://serverappfood.herokuapp.com/api/user/login",{
    //     headers:{
    //         Accept: 'application/json'
    //     }
    // }).then(res=>console.log(res))
  }

  ToPost = () => {
    AddPost({
      content_text: this.content_text,
      content_image: this.content_image,
      Public: true,
    })
  }

  render(){
    const {refreshing} = this.state
    
    const {email, name, address, phone, avatar} = this.props.user.user
    console.warn(this.props.posts)
    return(
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={()=>this.onRefresh()} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <View style={styles.part1} />
          <View style={[styles.avatar, { position: 'absolute', marginTop: 160 }]} >
            <Avatar
              style={styles.avatar}
              user={this.props.user.user} 
              uri={avatar} 
              navigation={this.props.navigation}
            />
          </View>
        </View>
        <View style={styles.containerInFo}>
          <View style={styles.rectangle}>
            <Text style={styles.Text}>Name: </Text>
            {!!name && <Text style={styles.Text}>
              {name}
            </Text>}
          </View>
          <View style={[styles.rectangle, { marginTop: 15 }]}>
            <Text style={styles.Text}>Address: </Text>
            {!!address && <Text style={styles.Text}>
              {address}
            </Text>}
          </View>
          <View style={[styles.rectangle, { marginTop: 15 }]}>
            <Text style={styles.Text}>Number phone: </Text>
            {!!phone && <Text style={styles.Text}>
              {phone}
            </Text>}
          </View>
          <View style={[styles.rectangle, { marginTop: 15 }]}>
            <Text style={styles.Text}>Email: </Text>
            {!!email && <Text style={styles.Text}>
              {email}
            </Text>}
          </View>
        </View>
        <View style={styles.AddPost}>
          <Text style={styles.Post}>
            Post
          </Text>
          <View style={{ marginTop: 10 }}>
            <Image source={{uri: avatar}} style={{ width: 40, height: 40, borderRadius: 20 }} />
            <TextInput
              multiline
              placeholder="what do you think?"
              style={{ width: '80%', marginTop: 5 }}
              onChangeText={text => this.content_text = text}
            />
          </View>
          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Icons name="picture" style={{ color: '#18EC18', fontSize: 15 }} />
            <Text style={[styles.Text, { marginLeft: 5 }]}> Picture </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.ToPost()}>
            <Text style={[styles.Post, { marginTop: 10 }]}>To Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    display: "flex", 
    backgroundColor: '#E0E0E0', 
  },
  part1:{
    height: 220,
    backgroundColor: 'skyblue',
    width: '100%',
  },
  avatar:{
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#FFFFFF'
  },
  containerInFo:{
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    marginTop: 70,
    paddingVertical : 15,
    borderRadius: 14,
    marginHorizontal: 8,
  },
  rectangle: {
    flexDirection: 'row'
  },
  Text: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  AddPost: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    padding: 15,
    marginBottom: 10
  },
  Post: {
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 22,
    fontStyle: 'normal',
    color: 'black'
  },
})

const mapStateToProps =  state => {
	return {
    user: state.user,
    posts: state.Posts,
	}
}

export default connect(
	mapStateToProps,
	null
)(ProfileScreen)
