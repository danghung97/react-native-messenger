import React, {Component} from 'react';
import {
  View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  Text
} from 'react-native';
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
      checkmate: false,
      wkingCurPos: {'posX': 7, 'posY': 3}, // white King's current position
      bkingCurPos: {'posX': 0, 'posY': 3}, // black king's current position
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
    const {pieceChoosed, ChessBoard, turn, validMoves, wkingCurPos, bkingCurPos} = this.state
    const value = ChessBoard[posX][posY]
    let tempColor = new Array(8).fill(null)
    for (let i = 0; i < 8; i++) {
      tempColor[i] = [...this.ColorBoard[i]]
    }
    if (!value && !pieceChoosed) { // bấm lung tung
      return
    } else if (!!value) { // press piece
      if (!!pieceChoosed) { // if !!picechoosed and your turn will eat enermey ( if value is enermy )
        const fromPosX = pieceChoosed.posX
        const fromPosY = pieceChoosed.posY
        const fromValue = ChessBoard[fromPosX][fromPosY]
        const fromColor = fromValue[0]
        const fromPiece = fromValue[1]
        let KingColor = 'w'
        let KingPos = wkingCurPos
        if (value[0] === 'b') {
          KingColor = 'b'
          KingPos = bkingCurPos
        }
        if (fromColor !== value[0]){
          const valid = validMoves.find(item => {
            return item.posX === posX && item.posY === posY
          })
          if (!!valid) { // check enermy on valid moves of piecechoosed
            if (value === 'wK') {
              this.setState({wkingCurPos: {posX, posY}})
            } else if (value === 'bK') {
              this.setState({bkingCurPos: {posX, posY}})
            }
            
            let c = UpdateChessBoard(KingPos, KingColor, pieceChoosed, {posX, posY}, fromColor, fromPiece, ChessBoard)
            const checkmate = c.checkmate
            if (checkmate.length !== 0) {
              this.setState({checkmate: true})
              checkmate.push(KingPos)
            } else {
              this.setState({checkmate: false})
            }
            for (let i = 0; i < checkmate.length; i++) {
              tempColor[checkmate[i].posX][checkmate[i].posY] = '#FE4444'
            }
            this.setState({
              pieceChoosed: null,
              ChessBoard: c.chessBoard,
              updateColorBoard: tempColor,
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
      const finded = FindValidRoad({posX, posY}, tempColor, ChessBoard)
      this.setState({ validMoves: finded.valid, updateColorBoard: finded.ColorBoard })
    } else { // move piece
      const fromPosX = pieceChoosed.posX
      const fromPosY = pieceChoosed.posY
      const value = ChessBoard[fromPosX][fromPosY]
      const color = value[0]
      const piece = value[1]
      let KingColor = 'w'
      let KingPos = wkingCurPos
      if (value[0] === 'w') {
        KingColor = 'b'
        KingPos = bkingCurPos
      }
      if (turn === color) { // move piece if piecechoosed is your turn
        const valid = validMoves.find(item => {
          return item.posX === posX && item.posY === posY
        })
        if (!!valid) {
          if (valid === 'wK') {
            this.setState({wkingCurPos: {posX, posY}})
          } else if (valid === 'bK') {
            this.setState({bkingCurPos: {posX, posY}})
          }
          let c = UpdateChessBoard(KingPos, KingColor, pieceChoosed, {posX, posY}, color, piece, ChessBoard)
          const checkmate = c.checkmate
          if (checkmate.length !== 0) {
            this.setState({checkmate: true})
            checkmate.push(KingPos)
          } else {
            this.setState({checkmate: false})
          }
          for (let i = 0; i < checkmate.length; i++) {
            tempColor[checkmate[i].posX][checkmate[i].posY] = '#FE4444'
          }
          this.setState({
            pieceChoosed: null,
            ChessBoard: c.chessBoard,
            updateColorBoard: tempColor,
            turn: this.state.turn === 'w' ? 'b' : 'w'
          })
          return
        }
      }
      this.setState({updateColorBoard: null, validMoves: []})
    }
  }

  render() {
    const {size, ChessBoard, updateColorBoard, checkmate} = this.state;
    const color = !updateColorBoard ? this.ColorBoard : updateColorBoard
    return (
      <View style={styles.container}>
        {checkmate && 
          <Text style = {{
            fontSize: 22,
            lineHeight: 24,
            fontWeight: '700',
            fontStyle: 'normal',
            marginBottom: 20,
            color: '#FE4444',
          }}>
            Checkmate
          </Text>}
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
