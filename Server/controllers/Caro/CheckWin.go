package controllers

// check only in the latest position
func CheckWin(posX, posY int, boardChess [20][15]string) (isWin bool) {
	value := boardChess[posX][posY]
	// check ngang
	tempX := posX
	tempY := posY
	dem := 0
	for tempY >= 0 { // dem qua trai
		if boardChess[posX][tempY] != value {
			break
		}else{
			dem++
		}
		tempY--
	}
	tempY = posY
	for tempY <= 15 { // check qua phai
		if boardChess[posX][tempY] != value {
			break
		}else{
			dem++
		}
		tempY++
	}
	tempY = posY
	if dem >=6 { // bonus 1 for duplicate position at [posX][posY]
		return true
	} else {
		tempY = posY
		dem = 0
	}
	// check doc
	for tempX >= 0 { // check len tren
		if boardChess[tempX][posY] != value {
			break
		}else{
			dem++
		}
		tempX--
	}
	tempX = posX
	for tempX <= 20 { // check xuong duoi
		if boardChess[tempX][posY] != value {
			break
		}else{
			dem++
		}
		tempX++
	}
	tempX = posX
	if dem >= 6 {
		return true
	} else {
		tempX = posX
		dem = 0
	}
	// check cheo 1
	for tempX >=0 && tempY >= 0 { //check cheo len ben trai
		if boardChess[tempX][posY] != value {
			break
		} else {
			dem++
		}
		tempX--
		tempY--
	}
	tempX = posX
	tempY = posY
	for tempX <= 20 && tempY <=15 { //check cheo xuong ben phai
		if boardChess[tempX][tempY] != value {
			break
		} else {
			dem++
		}
		tempX++
		tempY++
	}
	tempX = posX
	tempY = posY
	if dem >=6 {
		return true
	} else {
		dem = 0
	}
	//check cheo 2
	for tempX >= 0 && tempY <= 15 { // cheo len ben phai
		if boardChess[tempX][tempY] != value {
			break
		} else {
			dem++
		}
		tempX--
		tempY++
	}
	tempX = posX
	tempY = posY
	for tempX <= 20 && tempY >= 0 {// cheo xuong ben trai
		if boardChess[tempX][tempY] != value {
			break
		} else {
			dem++
		}
		tempX++
		tempY--
	}
	if dem >= 6 {
		return true
	} else {
		return false
	}
}