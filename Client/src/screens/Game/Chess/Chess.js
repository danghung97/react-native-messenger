
export const NegativeKingColor = color => {
  if (color === 'b') {
    return 'w'
  }
  return 'b'
}

export const takeKingPos = (color, wPos, bPos) => {
  if (color === 'b') {
    return bPos
  }
  return wPos
}

export const FindValidRoad = (from, ColorBoard, chessBoard) => {
  const posX = from.posX
  const posY = from.posY
  ColorBoard[posX][posY] = '#696969'
  let valid=[{posX, posY}]
  let canEats = []
  const color = chessBoard[posX][posY][0]
  const piece = chessBoard[posX][posY][1]
  // con thieu truong hop thăng cấp của pawn 
  // thieu swap queen va rook
  // thieu check chieu tuong hết cờ
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
      if (posX - 2 >= 0 && posY - 1 >= 0) { // 1
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
      if ( posX + 1 < 8 && posX + 1 < 8) {
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
      if ( posX + 1 < 8 && posY - 1 >= 0) {
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
      const validStraight = valueStraight.valid
      validStraight.push(...valueDiagonal.valid)
      valid = validStraight
      return {canEats, valid, ColorBoard}
    default:
      return {canEats, valid, ColorBoard}
  }
}

const findStraight = (posX, posY, ColorBoard, chessBoard, canEats) => {
  
  let valid = [{posX, posY}]
  let posXValidOn = posX
  let posXValidUnder = posX
  let posYValidLeft = posY
  let posYValidRight = posY
  const color = chessBoard[posX][posY][0]
  for (let i = 1; i <= posX; i++) { // check len tren
    if (!!chessBoard[posX - i][posY]) {
      if(chessBoard[posX - i][posY][0] !== color) {
        ColorBoard[posX - i][posY] = '#696969'
        valid.push({'posX': posX - i, 'posY': posY})
      }
      break
    }
    
    posXValidOn = posX - i
    ColorBoard[posXValidOn][posY] = '#696969'
    valid.push({'posX': posXValidOn, 'posY': posY})
  }

  for (let i = 1; i < 8 - posX; i++) {  // check xuong duoi
    if (!!chessBoard[posX + i][posY]) { 
      if (chessBoard[posX + i][posY][0] !== color) {
        ColorBoard[posX + i][posY] = '#696969'
        valid.push({'posX': posX + i, 'posY': posY})
      }
      break
    }
    posXValidUnder = posX + i
    ColorBoard[posXValidOn][posY] = '#696969'
    valid.push({'posX': posXValidUnder, 'posY': posY})
  }

  for (let i = 1; i <= posY; i++) { // check sang trai
    if (!!chessBoard[posX][posY - i]) {
      if (chessBoard[posX][posY - i][0] !== color) {
        ColorBoard[posX][posY - i] = '#696969'
        valid.push({'posX': posX, 'posY': posY - i})
      }
      break
    }
    posYValidLeft = posY - i
    ColorBoard[posX][posYValidLeft] = '#696969'
    valid.push({'posX': posX, 'posY': posYValidLeft})
  }

  for (let i = 1; i < 8 - posY; i++) { // check sang trai
    if (!!chessBoard[posX][posY + i]) {
      if (chessBoard[posX][posY + i][0] !== color) {
        ColorBoard[posX][posY + i] = '#696969'
        valid.push({'posX': posX, 'posY': posY + i})
      }
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
  const color = chessBoard[posX][posY][0]
  // check cheo 1
  while (tempX >= 0 && tempY >= 0) { // check cheo len trai x giam, y giam
    if (!!chessBoard[tempX][tempY]) {
      if (chessBoard[tempX][tempY][0] !== color) {
        valid.push({'posX': tempX, 'posY': tempY})
        ColorBoard[tempX][tempY] = '#696969'
      }
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
      if (chessBoard[tempX][tempY][0] !== color) {
        valid.push({'posX': tempX, 'posY': tempY})
        ColorBoard[tempX][tempY] = '#696969'
      }
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
      if (chessBoard[tempX][tempY][0] !== color) {
        valid.push({'posX': tempX, 'posY': tempY})
        ColorBoard[tempX][tempY] = '#696969'
      }
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
      if (chessBoard[tempX][tempY][0] !== color) {
        valid.push({'posX': tempX, 'posY': tempY})
        ColorBoard[tempX][tempY] = '#696969'
      }
      break
    }
    valid.push({'posX': tempX, 'posY': tempY})
    ColorBoard[tempX][tempY] = '#696969'
    tempX++
    tempY--
  }
  return {canEats, valid, ColorBoard}
}

export const UpdateChessBoard = (curKingColor, curKingPos, enemyKingColor, enemyKingPos, from, to, color, piece, chessBoard) => {
  const fromPosX = from.posX
  const fromPosY = from.posY
  const toPosX = to.posX
  const toPosY = to.posY
  chessBoard[fromPosX][fromPosY] = null
  chessBoard[toPosX][toPosY] = `${color}${piece}`
  let curKingPosX = curKingPos.posX
  let curKingPosY = curKingPos.posY
  if (piece === 'K') {
    curKingPosX = toPosX
    curKingPosY = toPosY
  }
  const check = Check(chessBoard, enemyKingPos.posX, enemyKingPos.posY, enemyKingColor) //kiem tra chieu tuong
  const allowToMove = Check(chessBoard, curKingPosX, curKingPosY, curKingColor) // kiem tra sự an toàn tướng của bạn khi ban đi nước đó
  return {allowToMove, check, chessBoard}
}

export const Check = (chessBoard, kingPosX, kingPosY, KingColor) => { // kiểm tra chiếu tướng
  let check = []
  // check straight, just rock and queen can check on straight
  // check len tren
  let tempX = kingPosX - 1
  let tempY = kingPosY
  while (tempX >= 0) {
    const value = chessBoard[tempX][tempY]
    if (!!value ){
      if (value[0] !== KingColor
        && (value[1] === 'R' || value[1] === 'Q')) { 
          for (let i = kingPosX - 1; i >= tempX; i--) {
            check.push({'posX': i, 'posY': tempY})
          }
        }
      break
    }  
  
    tempX--
  }
  //check xuong duoi
  tempX = kingPosX + 1
  tempY = kingPosY
  while (tempX < 8 ) {
    const value = chessBoard[tempX][tempY]
    if (!!value ) {
      if (value[0] !== KingColor
        && (value[1] === 'R' || value[1] === 'Q')) {
          for (let i = kingPosX + 1; i <= tempX; i++) {
            check.push({'posX': i, 'posY': tempY})
          }
        }
      break
    }
    tempX++
  }
  // check sang trai
  tempX = kingPosX
  tempY = kingPosY - 1
  while (tempY >= 0) {
    const value = chessBoard[tempX][tempY]
    if (!!value) {
      if (value[0] !== KingColor
        && (value[1] === 'R' || value[1] === 'Q')) {
          for (let i = kingPosY - 1; i >= tempY; i--) {
            check.push({'posX': tempX, 'posY': i})
          }
        }
      break
    }
    tempY--
  }
  // check sang phai
  tempX = kingPosX
  tempY = kingPosY + 1
  while (tempY < 8) {
    const value = chessBoard[tempX][tempY]
    if (!!value) {
      if (value[0] !== KingColor
        && (value[1] === 'R' || value[1] === 'Q')) {
          for (let i = kingPosY + 1; i <= tempY; i++) {
            check.push({'posX': tempX, 'posY': i})
          }
        }
      break
    }
    tempY++
  }
  // check diagonal, those piece might be Pawn, bishop, king, queen
  // case 1: x--, y--
  tempX = kingPosX - 1
  tempY = kingPosY - 1
  while (tempX >= 0 && tempY >= 0) {
    const value = chessBoard[tempX][tempY]
    if (!!value) {
      if (value[0] !== KingColor) {
        if (value[1] === 'Q'|| value[1] === 'B') { // queen or bishop
          const max = kingPosX - tempX
          for (let i = 1; i <= max; i++) {
            check.push({'posX': kingPosX - i, 'posY': kingPosY - i})
          }
        } else if (value[1] === 'K') { // king
          if (kingPosX-tempX === 1) { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else if (value[1] === 'P') {
          // in case if value is white pawn, 
          // it can't check, because pawn just can go ahead and in case x-- y--
          // pawn is definitely in the back
          // if value is black pawn
          if (kingPosX-tempX === 1 && value[0] === 'b') { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else {}
      }
      break
    }
    tempX--
    tempY--
  }
  // case 2: x++, y++
  tempX = kingPosX + 1
  tempY = kingPosY + 1
  while (tempX < 8 && tempY < 8) {
    const value = chessBoard[tempX][tempY]
    if (!!value) {
      if (value[0] !== KingColor) {
        if (value[1] === 'Q'|| value[1] === 'B') { // queen or bishop
          const max = tempX - kingPosY
          for (let i = 1; i <= max; i++) {
            check.push({'posX': kingPosX + i, 'posY': kingPosY + i})
          }
        } else if (value[1] === 'K') { // king
          if (tempX-kingPosX === 1) { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else if (value[1] === 'P') {
          // in case if value is black pawn, 
          // it can't check, because pawn just can go ahead and in case x-- y--
          // pawn is definitely in the back
          // if value is white pawn
          if (tempX-kingPosX === 1 && value[0] === 'w') { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else {}
      }
      break
    }
    tempX++
    tempY++
  }
  // case 3: x--, y++
  tempX = kingPosX - 1
  tempY = kingPosY + 1
  while(tempX >= 0 && tempY < 8) {
    const value = chessBoard[tempX][tempY]
    if (!!value) {
      if (value[0] !== KingColor) {
        if (value[1] === 'Q'|| value[1] === 'B') {
          const max = kingPosX - tempX
          for (let i = 1; i <= max; i++) {
            check.push({'posX': kingPosX - i, 'posY': kingPosY + i})
          }
        } else if (value[1] === 'K') { // king
          if (tempX-kingPosX === 1) { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else if (value[1] === 'P') {
          // explain the same as above 2 cases
          if (tempX-kingPosX === 1 && value[0] === 'b') { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else {}
      }
      break
    }
    tempX--
    tempY++
  }
  // case 4: x++, y--
  tempX = kingPosX + 1
  tempY = kingPosY - 1
  while(tempX < 8 && tempY >= 0) {
    const value = chessBoard[tempX][tempY]
    if (!!value) {
      if (value[0] !== KingColor) {
        if (value[1] === 'Q'|| value[1] === 'B') {
          const max = kingPosY - tempY
          for (let i = 1; i <= max; i++) {
            check.push({'posX': kingPosX + i, 'posY': kingPosY - i})
          }
        } else if (value[1] === 'K') { // king
          if (tempY-kingPosY === 1) { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else if (value[1] === 'P') {
          // explain the same as above 2 cases
          if (tempX-kingPosX === 1 && value[0] === 'w') { // king1 just can check king2 in range around one square
            check.push({'posX': tempX, 'posY': tempY})
          }
        } else {}
      }
      break
    }
    tempX++
    tempY--
  }
  return check
}

export const checkmate = ( kingCheckedPos, chessBoard, ColorBoard, KingColor ) => { // kiem tra chieu bi
  // check that the checker can not be stopped?
  // check that the king can go to any position
  // if neither of the above two cases sastifies, so checkmate

  // case 1: check the king
  let from = kingCheckedPos;
  const validMove = FindValidRoad(from, ColorBoard, chessBoard)
  for (let i = 0;i < validMove.length; i++) {
    let allowToMove = Check(chessBoard, from.posX, from.posY, KingColor)
    if (allowToMove.length > 0) {
      return false
    }
  }

  // case 2: check that the checker can not be stopped?
}
