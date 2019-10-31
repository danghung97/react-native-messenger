package models

import (
	"Server/utils"
	"encoding/json"
	"github.com/jinzhu/gorm"
	"log"
	"net/http"
	"time"
)

type Messages struct {
	gorm.Model
	RoomID     uint	`json:"rid"`
	UserID  uint `json:"uid"` // author's message
	Message    string `json:"message"`
}

type Rooms struct {
	gorm.Model
	RoomName string
	UserId1 uint
	UserId2 uint
}

const messagesPerPage = 15

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

func GetMessageForUser( rid, Offset uint) []Messages {
	rows, err := GetDB().Table("messages").Order("created_at DESC").Where("room_id = ?", rid).Limit(messagesPerPage).Offset((Offset - 1)*messagesPerPage).Rows()
	if err != nil {
	
	}
	defer rows.Close()
	messages := make([]Messages, 0)
	
	var (
		id uint
		created_at time.Time
		updated_at time.Time
		deleted_at *time.Time
		//receiver_id int
		room_id uint
		user_id uint
		message string
	)
	
	for rows.Next(){
		err := rows.Scan(&id, &created_at, &updated_at, &deleted_at, &room_id, &message, &user_id)
		if err != nil {
			log.Fatal(err)
		}
		msg := Messages{RoomID: room_id, UserID: user_id, Message: message}
		msg.CreatedAt = created_at
		msg.ID =  id
		messages = append(messages, msg)
	}
	//for i, j := 0, len(messages)-1; i<j; i, j = i+1, j-1 { //reverse array
	//	messages[i], messages[j] = messages[j], messages[i]
	//}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	return messages
}

var FindUser = func(w http.ResponseWriter, r *http.Request) {
	account := &Account{}
	err := json.NewDecoder(r.Body).Decode(account)
	if err != nil {
		utils.Respond(w, utils.Message(false, "Invalid request"))
		return
	}
	
	account2 := &Account{}
	err = GetDB().Table("accounts").Where("email = ?", account.Email).First(account2).Error
	if err!=nil{
		if err == gorm.ErrRecordNotFound{
			utils.Respond(w, utils.Message(false, "Email address not found"))
			return
		}
		utils.Respond(w, utils.Message(false, "Connection error. Please retry"))
		return
	}
	
	//auth.ListFriends = append(auth.ListFriends, fr)
	//GetDB().Model(&auth).Update("list_friends", auth.ListFriends)
	resp := utils.Message(true, "found user")
	account2.Password = ""
	account2.Token = ""
	account2. Code = ""
	resp["user"] = account2
	utils.Respond(w, resp)
}
