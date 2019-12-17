package controllers

import (
	"math/rand"
)

const numberCards = 52
var pack = []int{}

func init() {
	for i := 1; i <= 52; i++ {
		pack = append(pack, i)
	}
}

func DistributeCards(numberPeople int) [][]int { // rand.Intn(max - min) + min
	copy := pack
	newPack := []int{}
	tempPack := [][]int{}
	for len(copy) > numberCards/numberPeople {
		idCard := rand.Intn(len(copy) - 1)
		newPack = append(newPack, copy[idCard])
		if len(newPack) == 13 {
			tempPack = append(tempPack, newPack)
			newPack = []int{}
		}
		copy = append(copy[:idCard], copy[idCard+1:]...)
	}
	return tempPack
}