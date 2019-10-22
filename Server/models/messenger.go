package models

import (
	"github.com/jinzhu/gorm"
)

//var upgrader = websocket.Upgrader{
//	ReadBufferSize: 1024,
//	WriteBufferSize: 1024,
//}

type Messages struct {
	gorm.Model
	ReceiverID uint    `json:"received"`
	RoomID     uint	`json:"rid"`
	Message    string `json:"message"`
}

type Rooms struct {
	gorm.Model
	RoomName string
	UserId1 uint
	UserId2 uint
}

func GetRoomId(author, receive interface{}) (uint, error){
	room := &Rooms{}
	room1 := &Rooms{}
	err := GetDB().Table("rooms").Where("user_id1 = ? AND user_id2 = ?", author, receive).First(&room).Error
	if err!=nil && err!=gorm.ErrRecordNotFound{
		return 0, err
	}
	if room.RoomName != ""{
		return room.ID+1, nil
	}
	
	err = GetDB().Table("rooms").Where("user_id1 = ? AND user_id2 = ?", receive, author).First(&room1).Error
	if err!=nil && err!=gorm.ErrRecordNotFound{
		return 0, err
	}
	if room1.RoomName != ""{
		return room1.ID+1, nil
	}
	
	return 0, nil
}



//type Server struct {
//	connectedUsers map[int] *Account
//	Messages []*Messages `json: messages`
//	addUser chan *Account
//
//}

