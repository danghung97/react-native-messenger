import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, Image} from 'react-native';
import {FetchPost} from '../../store/actions/UseAction';
import {connect} from 'react-redux';
import ItemFeed from './FeedItem';

class NewFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 2,
    };
  }

  componentDidMount() {
    if (this.props.postReducer.data) this.props.getNewFeed(1);
  }

  onRefresh = () => {
    this.props.getNewFeed(1);
  };

  render() {
    const {data, error, isLoading} = this.props.postReducer;
    return (
      <View style={style.container}>
        <FlatList
          refreshing={isLoading}
          onRefresh={() => this.onRefresh()}
          data={data}
          renderItem={({item}) => <ItemFeed item={item} />}
          keyExtractor={item => `${item.ID}-${item.authorId}`}
          style={style.flatList}
          removeClippedSubviews={true}
        />
        {error ? <Text>{error}</Text> : null}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3',
    flex: 1,
    paddingTop: 10,
  },
  divider: {
    marginVertical: 2,
    height: 5,
    width: '100%',
    backgroundColor: '#d3d3d3',
  },
  flatList: {},
});

export default connect(
  state => {
    return {
      postReducer: state.Posts,
    };
  },
  {
    getNewFeed: FetchPost,
  },
)(NewFeed);
