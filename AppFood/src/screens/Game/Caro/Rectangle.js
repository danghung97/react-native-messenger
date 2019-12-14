import React from 'react';
import {View, Text, Dimensions} from 'react-native';

export default class Rectangle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      size: Math.floor(Dimensions.get('window').width/this.props.numberOfColumns),
    };
  }
  render() {
    const {size} = this.state;
    const {value} = this.props;
    return (
      <View
        style={{
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.9,
          borderColor: '#40FF00',
        }}>
        <Text style={{
          fontSize: 8, 
          lineHeight: 10, 
          fontWeight: '500', 
          fontStyle: 'normal'
          }}>{value}</Text>
      </View>
    );
  }
}
