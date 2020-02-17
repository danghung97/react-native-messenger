import React, {Component} from 'react';
import{
    View,
    ScrollView,
    StyleSheet,
    Text,
    RefreshControl,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput
} from 'react-native';
import Avatar from '../Component/avatar'
import { connect } from 'react-redux';
import Icons from 'react-native-vector-icons/AntDesign'
import { AddPost, FetchPost } from '../store/actions/UseAction';
import _ from 'lodash';
import PopupPost from '../Component/PopupPost';

class ProfileScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      refreshing: false,
      isLoading: true,
    }
    this.offset= 1;
    this.content_text = "";
    this.content_image = "";
  }

  componentDidMount() {
    this.props.FetchPost(this.offset)
    this.offset += 1
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
    if(this.content_text.trim() === "") return
    this.props.AddPost({
      content_text: this.content_text,
      content_image: this.content_image,
      public: true,
    })
  }

  onMore = () => {
    this.refs['PopupPost'].show()
  }

  renderPost = (post) => {
    const { name, avatar } = this.props.user.user
    return (
      <View style={{ backgroundColor: '#FFFFFF', padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.avatar}>
              <Image style={{ width: 40, height: 40 }} source={{uri: avatar}} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text>{name}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => this.onMore()}>
            <Icons name="ellipsis1" size={20} />
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 10 }}>{post.content_text}</Text>
        {!!post.content_image &&
          <Image style={{ width: '100%', height: 150, marginTop: 10 }} source={{uri: post.content_image}} />}
          <View style={{ marginTop: 10, borderWidth: 0.5, borderColor: '#E0E0E0' }} />
      </View>
    )
  }

  render(){
    // console.warn('123', this.props.posts.data)
    const {refreshing} = this.state
    const {email, name, address, phone, avatar} = this.props.user.user
    return(
      <>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={()=>this.onRefresh()} />
          }
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.part1} />
          <View style={{alignSelf: 'center', position: 'absolute', marginTop: 160 }} >
            <Avatar
              user={this.props.user.user}
              uri={avatar}
              navigation={this.props.navigation}
            />
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
              <View style={styles.avatar}>
                <Image source={{uri: avatar}} style={{ width: 40, height: 40 }} />
              </View>
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
          <FlatList
            data={this.props.posts.data}
            style={styles.containerPost}
            keyExtractor={(item) => `${item.ID}`}
            renderItem={({item}) => this.renderPost(item)}
            ItemSeparatorComponent={() => (
              <View style={{ height: 10 }} />
            )}
          />
        </ScrollView>
        <PopupPost
          onSetDefault={this._onSetDefault}
          onEdit={this._onEdit}
          onDelete={this._onDelete}
          ref={'PopupPost'}
        />
      </>
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
  avatar: {
    width: 40, 
    height: 40, 
    borderRadius: 20,
    overflow: 'hidden'
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
  containerPost: {
    marginVertical: 10,
  }
})

const mapStateToProps =  state => {
	return {
    user: state.user,
    posts: state.Posts,
	}
}

const mapDispatchToProps = {
  AddPost: AddPost,
  FetchPost: FetchPost,
}
 
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileScreen)
