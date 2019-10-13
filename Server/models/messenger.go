package models

import "github.com/jinzhu/gorm"

type Messages struct {
	gorm.Model
	AuthorID   int    `json:"authid"`
	ReceiverID int    `json:"received"`
	RoomID     int    `json:"roomed"`
	Message    string `json:"message"`
}

type Rooms struct {
	gorm.Model
	RoomName string

}

type RoomDetails struct {
	gorm.Model
	//User
}
