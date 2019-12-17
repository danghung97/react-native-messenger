import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default class ChessBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: Dimensions.get('window').width / 8, // ChessBoard: 8x8
    };
    this.row = new Array(8).fill(null);
    this.column = new Array(8).fill(null);
    this.ChessBoard = [
      ['bR', 'bK', 'bB', 'bK', 'nQ', 'bB', 'bK', 'bR'],
      ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
      [null, null, null, null, null, null, null, null]
      [null, null, null, null, null, null, null, null]
      ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
      ['wR', 'wK', 'wB', 'wK', 'wQ', 'wB', 'wK', 'wR'],
    ]
  }
  render() {
    const {size} = this.state;
    return (
      <View style={styles.container}>
        {this.row.map((c, idx_row) => {
          return (
            <View key={idx_row} style={{flexDirection: 'row'}}>
              {this.column.map((m, idx_column) => {
                return (
                  <TouchableWithoutFeedback
                    key={idx_column}
                    style={{
                      backgroundColor:
                        idx_column % 2 === 0
                          ? idx_row % 2 === 0
                            ? '#f0d9b5'
                            : '#b58863'
                          : idx_row % 2 !== 0
                          ? '#f0d9b5'
                          : '#b58863',
                      width: size,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: size,
                    }}>
                    {(idx_row === 1 || idx_row === 6) && (
                      <Icon name="chess-pawn" size={size * 0.7} />
                    )}
                    {(idx_column === 0 || idx_column === 7) &&
                      (idx_row === 0 || idx_row === 7) && (
                        <Icon name="chess-rook" size={size * 0.7} />
                      )}
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
