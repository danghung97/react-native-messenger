import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { FindValidRoad, UpdateChessBoard } from './Chess'

export default class ChessBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieceChoosed: null,
      validMoves: [],
      size: Dimensions.get('window').width / 8, // ChessBoard: 8x8
      updateColorBoard: null,
      turn: 'w',
      ChessBoard: [
        ['bR', 'bN', 'bB', 'bK', 'bQ', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wK', 'wQ', 'wB', 'wN', 'wR'],
      ]
    };
    this.ColorBoard = [
      ['#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863'],
      ['#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5'],
      ['#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863'],
      ['#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5'],
      ['#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863'],
      ['#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5'],
      ['#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863'],
      ['#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5', '#b58863', '#f0d9b5'],
    ]
    this.urlPiece = {
      'bR': require('../../../Assets/Image/bR.png'),
      'bN': require('../../../Assets/Image/bN.png'),
      'bB': require('../../../Assets/Image/bB.png'),
      'bK': require('../../../Assets/Image/bK.png'),
      'bQ': require('../../../Assets/Image/bQ.png'),
      'bP': require('../../../Assets/Image/bP.png'),
      'wR': require('../../../Assets/Image/wR.png'),
      'wN': require('../../../Assets/Image/wN.png'),
      'wB': require('../../../Assets/Image/wB.png'),
      'wK': require('../../../Assets/Image/wK.png'),
      'wQ': require('../../../Assets/Image/wQ.png'),
      'wP': require('../../../Assets/Image/wP.png'),
    }
    this.row = new Array(8).fill(null);
    this.column = new Array(8).fill(null);
  }

  pressSquare = (posX, posY) => {
    const {pieceChoosed, ChessBoard, turn, validMoves} = this.state
    const value = ChessBoard[posX][posY]
    if (!value && !pieceChoosed) { // bấm lung tung
      return
    } else if (!!value) { // press piece
      if (!!pieceChoosed) { // if !!picechoosed and your turn will eat enermey ( if value is enermy )
        const fromPosX = pieceChoosed.posX
        const fromPosY = pieceChoosed.posY
        const fromValue = ChessBoard[fromPosX][fromPosY]
        const fromColor = fromValue[0]
        const fromPiece = fromValue[1]
        if (fromColor !== value[0]){
          const valid = validMoves.find(item => {
            return item.posX === posX && item.posY === posY
          })
          if (!!valid) { // check enermy on valid moves of piecechoosed
            let c = UpdateChessBoard(pieceChoosed, {posX, posY}, fromColor, fromPiece, ChessBoard)
            this.setState({
              pieceChoosed: null,
              ChessBoard: c,
              updateColorBoard: null,
              turn: this.state.turn === 'w' ? 'b' : 'w'
            })
            return
          }
        }
      }
      // if not eats, so show valid moves
      const color = value[0]
      const piece = value[1]
      this.setState({pieceChoosed: {posX, posY}})
      let tempColor = new Array(8).fill(null)
      for (let i = 0; i < 8; i++) {
        tempColor[i] = [...this.ColorBoard[i]]
      }
      const finded = FindValidRoad(piece, {posX, posY}, tempColor, ChessBoard, color)
      this.setState({ validMoves: finded.valid, updateColorBoard: finded.ColorBoard })
    } else { // move piece
      const fromPosX = pieceChoosed.posX
      const fromPosY = pieceChoosed.posY
      const value = ChessBoard[fromPosX][fromPosY]
      const color = value[0]
      const piece = value[1]
      if (turn === color) { // move piece if piecechoosed is your turn
        const valid = validMoves.find(item => {
          return item.posX === posX && item.posY === posY
        })
        if (!!valid) {
          let c = UpdateChessBoard(pieceChoosed, {posX, posY}, color, piece, ChessBoard)
          this.setState({
            pieceChoosed: null,
            ChessBoard: c,
            updateColorBoard: null,
            turn: this.state.turn === 'w' ? 'b' : 'w'
          })
          return
        }
      }
      this.setState({updateColorBoard: null, validMoves: []})
    }
  }

  render() {
    const {size, ChessBoard, updateColorBoard} = this.state;
    const color = !updateColorBoard ? this.ColorBoard : updateColorBoard
    return (
      <View style={styles.container}>
        {this.row.map((r, idx_row) => {
          return (
            <View key={idx_row} style={{flexDirection: 'row'}}>
              {this.column.map((c, idx_column) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.pressSquare(idx_row, idx_column)}
                    key={idx_column}
                    style={{
                      backgroundColor: color[idx_row][idx_column],
                      width: size,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: size,
                    }}>
                    {ChessBoard[idx_row][idx_column] ?
                      <Image
                        style={{width: 0.7*size, height: 0.7*size}}
                        source={this.urlPiece[ChessBoard[idx_row][idx_column]]} />
                      : null}
                  </TouchableOpacity>
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
