package models

import (
	"Server/utils"
	"encoding/json"
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
	"log"
	"net/http"
	"time"
)

type Messages struct {
	gorm.Model
	RoomID     uint	`json:"rid"`
	UserID  uint `json:"uid"` // author's message
	TypeMessage string `gorm:"default:'text'"json:"type_message"`
	Message    string `json:"message"`
}

type Rooms struct {
	gorm.Model
	RoomName string
	UserId1 uint
	UserId2 uint
}

type LoadMoreMsg struct {
	Offset uint `json:"offset"`
	RoomID uint `json:"room_id"`
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
	rows, err := GetDB().Table("messages").Order("created_at DESC").Where("room_id = ?", rid).Offset((Offset - 1)*messagesPerPage).Limit(messagesPerPage).Rows()
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
		type_message string
	)
	
	for rows.Next(){
		err := rows.Scan(&id, &created_at, &updated_at, &deleted_at, &room_id, &message, &user_id, &type_message)
		if err != nil {
			log.Fatal(err)
		}
		msg := Messages{RoomID: room_id, UserID: user_id, Message: message, TypeMessage: type_message}
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
		utils.Respond(w, 400, utils.Message(false, "Invalid request"))
		return
	}
	
	account2 := &Account{}
	err = GetDB().Table("accounts").Where("email = ?", account.Email).First(account2).Error
	if err!=nil{
		if err == gorm.ErrRecordNotFound{
			utils.Respond(w, 404, utils.Message(false, "Email address not found"))
			return
		}
		utils.Respond(w, 503, utils.Message(false, "Connection error. Please retry"))
		return
	}
	
	//auth.ListFriends = append(auth.ListFriends, fr)
	//GetDB().Model(&auth).Update("list_friends", auth.ListFriends)
	resp := utils.Message(true, "found user")
	account2.Password = ""
	account2.Token = ""
	account2.Code = ""
	account2.FcmToken = pq.StringArray{}
	account2.StatusFcmTokens = pq.BoolArray{}
	resp["user"] = account2
	utils.Respond(w, 200, resp)
}

var LoadMoreMessage = func(w http.ResponseWriter, r *http.Request) {
	info := &LoadMoreMsg{}
	err := json.NewDecoder(r.Body).Decode(info)
	if err!=nil {
		utils.Respond(w, 400, utils.Message(false, "Invalid Request"))
		return
	}
	
	arrayMessage := GetMessageForUser(info.RoomID, info.Offset)
	resp := utils.Message(true, "load more success")
	resp["arrayMessage"] = arrayMessage
	utils.Respond(w, 200, resp)
}
