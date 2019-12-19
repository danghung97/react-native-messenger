
export const FindValidRoad = (piece, from, ColorBoard, chessBoard, color) => {
  const posX = from.posX
  const posY = from.posY
  ColorBoard[posX][posY] = '#696969'
  let valid=[{posX, posY}]
  let canEats = []
  // con thieu truong hop thăng cấp của pawn 
  // thieu swap queen va rook
  // thieu check chieu tuong,
  // thieu check het co
  switch (piece) {
    case 'P': // Pawn
      let maxMoves = 1 // max number of pawn moves
      posXvalid = posX
      if (color === 'b') {
        if (posX === 1) { // if this is first step of pawn, pawn can go 2 moves
          maxMoves = 2
        }
        for (let i = 1; i <= maxMoves; i++) {
          if (!!chessBoard[posX + i][posY]) {
            break
          }
          posXvalid = posX + i
          ColorBoard[posXvalid][posY] = '#696969'
          valid.push({'posX': posXvalid, 'posY': posY})
        }
        //check can eats
        if (!!chessBoard[posX + 1][posY - 1] && chessBoard[posX + 1][posY - 1][0] !== color) {
          ColorBoard[posX + 1][posY - 1] = '#696969'
          valid.push({'posX': posX + 1, 'posY': posY - 1})
          canEats.push({'posX': posX + 1, 'posY': posY - 1})
        }
        if (!!chessBoard[posX + 1][posY + 1] && chessBoard[posX + 1][posY + 1][0] !== color) {
          ColorBoard[posX + 1][posY + 1] = '#696969'
          valid.push({'posX': posX + 1, 'posY': posY + 1})
          canEats.push({'posX': posX + 1, 'posY': posY + 1})
        } 
      } else {
        if (posX === 6) { // if this is first step of pawn, pawn can go 2 moves
          maxMoves = 2
        }
        for (let i = 1; i <= maxMoves; i++) {
          if (!!chessBoard[posX - i][posY]) {
            break
          }
          posXvalid = posX - i
          ColorBoard[posXvalid][posY] = '#696969'
          valid.push({'posX': posXvalid, 'posY': posY})
        }
        if (!!chessBoard[posX - 1][posY - 1] && chessBoard[posX - 1][posY - 1][0] !== color) {
          ColorBoard[posX - 1][posY - 1] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY - 1})
          canEats.push({'posX': posX - 1, 'posY': posY - 1})
        }
        if (!!chessBoard[posX - 1][posY + 1] && chessBoard[posX - 1][posY + 1][0] !== color) {
          ColorBoard[posX - 1][posY + 1] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY + 1})
          canEats.push({'posX': posX - 1, 'posY': posY + 1})
        } 
      }
      return {canEats, valid, ColorBoard}
    case 'R': // Rook
      return findStraight(posX, posY, ColorBoard, chessBoard, canEats)
    case 'B': // Bishop
      return findDiagonal(posX, posY, ColorBoard, chessBoard, canEats)
    case 'N': // 
      // Knight has max 8 position can moves

      //Left
      if (posX - 2 >= 0 && posY - 1 >=0) { // 1
        if (!chessBoard[posX - 2][posY - 1]) {
          ColorBoard[posX - 2][posY - 1] = '#696969'
          valid.push({'posX': posX - 2, 'posY': posY - 1})
        } else {
          if(chessBoard[posX - 2][posY - 1][0] !== color) {
            canEats.push({'posX': posX - 2, 'posY': posY - 1})
            ColorBoard[posX - 2][posY - 1] = '#696969'
            valid.push({'posX': posX - 2, 'posY': posY - 1})
          }
        }
      }
      if (posX - 1 >= 0 && posY - 2 >= 0) { // 2
        if(!chessBoard[posX - 1][posY - 2]) {
          ColorBoard[posX - 1][posY - 2] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY - 2})
        } else {
          if(chessBoard[posX - 1][posY - 2][0] !== color) {
            canEats.push({'posX': posX - 1, 'posY': posY - 2})
            ColorBoard[posX - 1][posY - 2] = '#696969'
            valid.push({'posX': posX - 1, 'posY': posY - 2})
          }
        }
       
      }
      if (posX + 2 < 8 && posY - 1 >= 0) { // 3
        if (!chessBoard[posX + 2][posY - 1]) {
          ColorBoard[posX + 2][posY - 1] = '#696969'
          valid.push({'posX': posX + 2, 'posY': posY - 1})
        } else {
          if (chessBoard[posX + 2][posY - 1][0] !== color) {
            canEats.push({'posX': posX + 2, 'posY': posY - 1})
            ColorBoard[posX + 2][posY - 1] = '#696969'
            alid.push({'posX': posX + 2, 'posY': posY - 1})
          }
        }
        
      }
      if (posX + 1 < 8 && posY - 2 >= 0) { // 4
        if(!chessBoard[posX + 1][posY - 2]) {
          ColorBoard[posX + 1][posY - 2] = '#696969'
          valid.push({'posX': posX + 1, 'posY': posY - 2})
        } else {
          if (chessBoard[posX + 1][posY - 2][0] !== color) {
            canEats.push({'posX': posX + 1, 'posY': posY - 2})
            ColorBoard[posX + 1][posY - 2] = '#696969'
            valid.push({'posX': posX + 1, 'posY': posY - 2})
          }
        }
        
      }
      // Right
      if (posX - 2 >= 0 && posY + 1 < 8) { // 5
        if(!chessBoard[posX - 2][posY + 1]){
          ColorBoard[posX - 2][posY + 1] = '#696969'
          valid.push({'posX': posX - 2, 'posY': posY + 1})
        } else {
          if(chessBoard[posX - 2][posY + 1][0] !== color) {
            canEats.push({'posX': posX - 2, 'posY': posY + 1})
            ColorBoard[posX - 2][posY + 1] = '#696969'
            valid.push({'posX': posX - 2, 'posY': posY + 1})
          }
        }
        
      }
      if (posX - 1 >= 0 && posY + 2 < 8) { // 6
        if(!chessBoard[posX - 1][posY + 2]) {
          ColorBoard[posX - 1][posY + 2] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY + 2})
        } else {
          if (chessBoard[posX - 1][posY + 2][0] !== color) {
            canEats.push({'posX': posX - 1, 'posY': posY + 2})
            ColorBoard[posX - 1][posY + 2] = '#696969'
            valid.push({'posX': posX - 1, 'posY': posY + 2})
          }
        }
       
      }
      if (posX + 2 < 8 && posY + 1 < 8) { // 7
        if (!chessBoard[posX + 2][posY + 1]) {
          ColorBoard[posX + 2][posY + 1] = '#696969'
          valid.push({'posX': posX + 2, 'posY': posY + 1})
        } else {
          if (chessBoard[posX + 2][posY + 1][0] !== color) {
            canEats.push({'posX': posX + 2, 'posY': posY + 1})
            ColorBoard[posX + 2][posY + 1] = '#696969'
            valid.push({'posX': posX + 2, 'posY': posY + 1})
          }
        }
       
      }
      if (posX + 1 < 8 && posY + 2 < 8) { // 8
        if (!chessBoard[posX + 1][posY + 2]) {
          ColorBoard[posX + 1][posY + 2] = '#696969'
          valid.push({'posX': posX + 1, 'posY': posY + 2})
        } else {
          if (chessBoard[posX + 1][posY + 2][0] !== color) {
            canEats.push({'posX': posX + 1, 'posY': posY + 2})
            ColorBoard[posX + 1][posY + 2] = '#696969'
            valid.push({'posX': posX + 1, 'posY': posY + 2})
          }
        }
        
      }
      return {canEats, valid, ColorBoard}

    case 'K': // King
      if ( posX + 1 < 8) { // top
        if (!chessBoard[posX + 1][posY]) {
          ColorBoard[posX + 1][posY] = '#696969'
          valid.push({'posX': posX + 1, 'posY': posY})
        } else {
          if (chessBoard[posX + 1][posY][0] !== color) {
            canEats.push({'posX': posX + 1, 'posY': posY})
            ColorBoard[posX + 1][posY] = '#696969'
            valid.push({'posX': posX + 1, 'posY': posY})
          }
        }
      }
      if ( posX - 1 >= 0) { // bot
        if(!chessBoard[posX - 1][posY]) {
          ColorBoard[posX - 1][posY] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY})
        } else {
          if (chessBoard[posX - 1][posY][0] !== color) {
            canEats.push({'posX': posX - 1, 'posY': posY})
            ColorBoard[posX - 1][posY] = '#696969'
            valid.push({'posX': posX - 1, 'posY': posY})
          }
        }
        
      }
      if ( posY - 1 >= 0) { // left 
        if (!chessBoard[posX][posY - 1]) {
          ColorBoard[posX][posY - 1] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY - 1})
        } else {
          if(chessBoard[posX][posY - 1][0] !== color) {
            canEats.push({'posX': posX - 1, 'posY': posY - 1})
            ColorBoard[posX][posY - 1] = '#696969'
            valid.push({'posX': posX - 1, 'posY': posY - 1})
          }
        }
        
      }
      if ( posY + 1 < 8) { // right
        if (!chessBoard[posX][posY + 1]) {
          ColorBoard[posX][posY + 1] = '#696969'
          valid.push({'posX': posX, 'posY': posY + 1})
        } else {
          if (chessBoard[posX][posY + 1][0] !== color) {
            canEats.push({'posX': posX, 'posY': posY + 1})
            ColorBoard[posX][posY + 1] = '#696969'
            valid.push({'posX': posX, 'posY': posY + 1})
          }
        }
        
      }
      if ( posX - 1 >= 0 && posX - 1 >= 0) {
        if (!chessBoard[posX - 1][posY - 1]) {
          ColorBoard[posX - 1][posY - 1] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY - 1})
        } else {
          if (chessBoard[posX - 1][posY - 1][0] !== color) {
            canEats.push({'posX': posX - 1, 'posY': posY - 1})
            ColorBoard[posX - 1][posY - 1] = '#696969'
            valid.push({'posX': posX - 1, 'posY': posY - 1})
          }
        }
        
      }
      if ( posX + 1 < 8 && posX + 1 <8) {
        if (!chessBoard[posX + 1][posY + 1]) {
          ColorBoard[posX + 1][posY + 1] = '#696969'
          valid.push({'posX': posX + 1, 'posY': posY + 1})
        } else {
          if (chessBoard[posX + 1][posY + 1][0] !== color) {
            canEats.push({'posX': posX + 1, 'posY': posY + 1})
            ColorBoard[posX + 1][posY + 1] = '#696969'
            valid.push({'posX': posX + 1, 'posY': posY + 1})
          }
        }
        
      }
      if ( posX - 1 >= 0 && posY + 1 < 8) {
        if (!chessBoard[posX - 1][posY + 1]) {
          ColorBoard[posX - 1][posY + 1] = '#696969'
          valid.push({'posX': posX - 1, 'posY': posY + 1})
        } else {
          if (chessBoard[posX - 1][posY + 1][0] !== color) {
            canEats.push({'posX': posX - 1, 'posY': posY + 1})
            ColorBoard[posX - 1][posY + 1] = '#696969'
            valid.push({'posX': posX - 1, 'posY': posY + 1})
          }
        }
      }
      if ( posX + 1 < 8 && posY - 1 >= 8) {
        if (!chessBoard[posX + 1][posY - 1]) {
          ColorBoard[posX + 1][posY - 1] = '#696969'
          valid.push({'posX': posX + 1, 'posY': posY - 1})
        } else {
          if (chessBoard[posX + 1][posY - 1][0] !== color) {
            canEats.push({'posX': posX + 1, 'posY': posY - 1})
            ColorBoard[posX + 1][posY - 1] = '#696969'
            valid.push({'posX': posX + 1, 'posY': posY - 1})
          }
        }
      }
      return {canEats, valid, ColorBoard}
    case 'Q': //Queen
      const valueStraight = findStraight(posX, posY, ColorBoard, chessBoard)
      const valueDiagonal = findDiagonal(posX, posY, ColorBoard, chessBoard)
      valid = valueStraight.valid.push(valueDiagonal.valid)
      return {canEats, valid, ColorBoard}
    default:
      return {canEats, valid, ColorBoard}
  }
}

const findStraight = (posX, posY, ColorBoard, chessBoard, canEats, checkCheckmate) => {
  
  let valid = [{posX, posY}]
  let posXValidOn = posX
  let posXValidUnder = posX
  let posYValidLeft = posY
  let posYValidRight = posY
  for (let i = 1; i <= posX; i++) { // check len tren
    if (!!chessBoard[posX - i][posY]) {
      break
    }
    
    posXValidOn = posX - i
    ColorBoard[posXValidOn][posY] = '#696969'
    valid.push({'posX': posXValidOn, 'posY': posY})
  }

  for (let i = 1; i < 8 - posX; i++) {  // check xuong duoi
    if (!!chessBoard[posX + i][posY]) { 
      break
    }
    posXValidUnder = posX + i
    ColorBoard[posXValidOn][posY] = '#696969'
    valid.push({'posX': posXValidUnder, 'posY': posY})
  }

  for (let i = 1; i <= posY; i++) { // check sang trai
    if (!!chessBoard[posX][posY - i]) { 
      break
    }
    posYValidLeft = posY - i
    ColorBoard[posX][posYValidLeft] = '#696969'
    valid.push({'posX': posX, 'posY': posYValidLeft})
  }
  

  for (let i = 1; i < 8 - posY; i++) { // check sang trai
    if (!!chessBoard[posX][posY + i]) { 
      break
    }
    posYValidRight = posY + i
    ColorBoard[posX][posYValidRight] = '#696969'
    valid.push({'posX': posX, 'posY': posYValidRight})
  }

  return {canEats, valid, ColorBoard}
}

const findDiagonal = (posX, posY, ColorBoard, chessBoard, canEats) => {
  let valid = [{posX, posY}]
  let tempX = posX - 1
  let tempY = posY - 1
  // check cheo 1
  while (tempX >= 0 && tempY >= 0) { // check cheo len trai x giam, y giam
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    valid.push({'posX': tempX, 'posY': tempY})
    ColorBoard[tempX][tempY] = '#696969'
    tempX--
    tempY--
  }

  tempX = posX + 1
  tempY = posY + 1
  while (tempX < 8 && tempY < 8) { // check cheo xuong ben phai
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    valid.push({'posX': tempX, 'posY': tempY})
    ColorBoard[tempX][tempY] = '#696969'
    tempX++
    tempY++
  }

  tempX = posX - 1
  tempY = posY + 1
  while (tempX >= 0 && tempY < 8) { // check cheo len ben phai
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    valid.push({'posX': tempX, 'posY': tempY})
    ColorBoard[tempX][tempY] = '#696969'
    tempX--
    tempY++
  }

  tempX = posX + 1
  tempY = posY - 1
  while (tempX < 8 && tempY >= 0) { // check cheo xuong ben trai
    if (!!chessBoard[tempX][tempY]) {
      break
    }
    valid.push({'posX': tempX, 'posY': tempY})
    ColorBoard[tempX][tempY] = '#696969'
    tempX++
    tempY--
  }
  return {canEats, valid, ColorBoard}
}

export const UpdateChessBoard = (from, to, color, piece, chessBoard) => {
  const fromPosX = from.posX
  const fromPosY = from.posY
  const toPosX = to.posX
  const toPosY = to.posY
  chessBoard[fromPosX][fromPosY] = null
  chessBoard[toPosX][toPosY] = `${color}${piece}`
  return chessBoard
}

export const CheckCheckmate = (chessBoard, kingPosX, kingPosY, KingColor) => {
  
}