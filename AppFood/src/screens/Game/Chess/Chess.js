
export const findValidRoad = (piece, from, chessBoard, color) => {
  let validMove=[]
  const posX = from.posX
  const posY = from.posY
  // con thieu truong hop thăng cấp của pawn 
  switch (piece) {
    case 'P': // Pawn
      let maxMoves = 1 // max number of pawn moves
      posXValidMoves = posX
      if (color === 'b') {
        if (posX === 1) { // if this is first step of pawn, pawn can go 2 moves
          maxMoves = 2
        }
        for (let i = 1; i <= maxMoves; i++) {
          if (!!chessBoard[posX + i][posY]) {
            break
          }
          posXValidMoves = posX + i
        }
      } else {
        if (posX === 6) { // if this is first step of pawn, pawn can go 2 moves
          maxMoves = 2
        }
        for (let i = 1; i <= maxMoves; i++) {
          if (!!chessBoard[posX - i][posY]) {
            break
          }
          posXValidMoves = posX - i
        }
      }
      
      validMove.push({'posX': posXValidMoves, 'posY': posY})
      return validMove
    case 'R': // Rook
      return findStraight(posX, posY, chessBoard)
    case 'B': // Bishop
      return findDiagonal(posX, posY, chessBoard)
    case 'K': // Knight
      // Knight has max 8 position can moves

      //Left
      if (posX - 2 >= 0 && posY - 1 >=0 && !chessBoard[posX - 2][posY - 1]) { // 1
        validMove.push({'posX': posX - 2, 'posY': posY - 1})
      }
      if (posX - 1 >= 0 && posY - 2 >= 0 && !chessBoard[posX - 1][posY - 2]) { // 2
        validMove.push({'posX': posX - 1, 'posY': posY - 2})
      }
      if (posX + 2 < 8 && posY - 1 >= 0 && !chessBoard[posX + 2][posY - 1]) { // 3
        validMove.push({'posX': posX + 2, 'posY': posY - 1})
      }
      if (posX + 1 < 8 && posY - 2 >= 0 && !chessBoard[posX + 1][posY - 2]) { // 4
        validMove.push({'posX': posX + 1, 'posY': posY - 2})
      }
      // Right
      if (posX - 2 >= 0 && posY + 1 < 8 && !chessBoard[posX - 2][posY + 1]) { // 5
        validMove.push({'posX': posX - 2, 'posY': posY + 1})
      }
      if (posX - 1 >= 0 && posY + 2 < 8 && !chessBoard[posX - 1][posY + 2]) { // 6
        validMove.push({'posX': posX - 1, 'posY': posY + 2})
      }
      if (posX + 2 < 8 && posY + 1 < 8 && !chessBoard[posX + 2][posY + 1]) { // 7
        validMove.push({'posX': posX + 2, 'posY': posY + 1})
      }
      if (posX + 1 < 8 && posY + 2 < 8 && !chessBoard[posX + 1][posY + 2]) { // 8
        validMove.push({'posX': posX + 1, 'posY': posY + 2})
      }
      return validMove

    case 'K': // King
      if ( posX + 1 < 8 && !chessBoard[posX + 1][posY]) { // top
        validMove.push({'posX': posX + 1, 'posY': posY})
      }
      if ( posX - 1 >= 0 && !chessBoard[posX - 1][posY]) { // bot
        validMove.push({'posX': posX - 1, 'posY': posY})
      }
      if ( posY - 1 >= 0 && !chessBoard[posX][posY - 1]) { // left 
        validMove.push({'posX': posX - 1, 'posY': posY - 1})
      }
      if ( posY + 1 < 8 && !chessBoard[posX][posY + 1]) { // right
        validMove.push({'posX': posX - 1, 'posY': posY + 1})
      }
      if ( posX - 1 >= 0 && posX - 1 >= 0 && !chessBoard[posX - 1][posY - 1]) { 
        validMove.push({'posX': posX - 1, 'posY': posY - 1})
      }
      if ( posX + 1 < 8 && posX + 1 <8 && !chessBoard[posX + 1][posY + 1]) { 
        validMove.push({'posX': posX + 1, 'posY': posY + 1})
      }
      if ( posX - 1 >= 0 && posY + 1 < 8 && !chessBoard[posX - 1][posY + 1]) { 
        validMove.push({'posX': posX - 1, 'posY': posY + 1})
      }
      if ( posX + 1 < 8 && posY - 1 >= 8 && !chessBoard[posX + 1][posY - 1]) { 
        validMove.push({'posX': posX - 1, 'posY': posY - 1})
      }
    case 'Q': //Queen
      return findStraight(posX, posY, chessBoard).push(...findDiagonal)
    default:
      break
  }
}

const findStraight = (posX, posY, chessBoard) => {
  validMove = []
  let posXValidOn = posX
  let posXValidUnder = posX
  let posYValidLeft = posY
  let posYValidRight = posY
  for (let i = 1; i <= posX; i++) { // check len tren
    if (!!chessBoard[posX - i][posY]) {
      break
    }
    posXValidOn = posX - i
  }
  validMove.push({'posX': posXValidOn, 'posY': posY})

  for (let i = 1; i < 8 - posX; i++) {  // check xuong duoi
    if (!!chessBoard[posX + i][posY]) { 
      break
    }
    posXValidUnder = posX + i
  }
  validMove.push({'posX': posXValidUnder, 'posY': posY})

  for (let i = 1; i <= posY; i++) { // check sang trai
    if (!!chessBoard[posX][posY - i]) { 
      break
    }
    posYValidLeft = posY - i
  }
  validMove.push({'posX': posX, 'posY': posYValidLeft})

  for (let i = 1; i < 8 - posY; i++) { // check sang trai
    if (!!chessBoard[posX][posY + i]) { 
      break
    }
    posYValidRight = posY + i
  }
  validMove.push({'posX': posX, 'posY': posYValidRight})

  return validMove
}

const findDiagonal = (posX, posY, chessBoard) => {
  let tempX = posX - 1
  let tempY = posY - 1
  // check cheo 1
  while (tempX >= 0 && tempY >= 0) { // check cheo len trai x giam, y giam
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    tempX--
    tempY--
  }
  validMove.push({'posX': tempX, 'posY': tempY})

  tempX = posX + 1
  tempY = posY + 1
  while (tempX < 8 && tempY < 8) { // check cheo xuong ben phai
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    tempX++
    tempY++
  }
  validMove.push({'posX': tempX, 'posY': tempY})

  tempX = posX - 1
  tempY = posY + 1
  while (tempX >= 0 && tempY < 8) { // check cheo len ben phai
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    tempX--
    tempY++
  }
  validMove.push({'posX': tempX, 'posY': tempY})

  tempX = posX + 1
  tempY = posY - 1
  while (tempX >= 0 && tempY < 8) { // check cheo xuong ben trai
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    tempX++
    tempY--
  }
  validMove.push({'posX': tempX, 'posY': tempY})
  return validMove
}
