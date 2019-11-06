package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"time"
	
	//"encoding/json"
	"fmt"
	//"github.com/jinzhu/gorm"
	"net/http"
)

type Id struct {
	AuthorID uint `json:"authid"`
	ReceiverID uint `json:"received"`
}

var LoadRoom = func(w http.ResponseWriter, r *http.Request){
	id := &Id{}
	err := json.NewDecoder(r.Body).Decode(id)
	if err!=nil{
		utils.Respond(w, utils.Message(false, "Invalid request"))
		return
	}

	rid, err := models.GetRoomId(id.AuthorID, id.ReceiverID)
	if err != nil {
		utils.Respond(w, utils.Message(false, fmt.Sprintf("error: %s", 0)))
		return
	}else{
		if rid == 0 {
			room := &models.Rooms{
				UserId1: id.AuthorID,
				UserId2: id.ReceiverID,
			}
			models.GetDB().Create(room)
			models.GetDB().Model(&room).Update("room_name", fmt.Sprintf("room %v", room.ID))
			models.GetDB().Model(&room).Update("created_at", time.Now())
			resp := utils.Message(true, "created room")
			resp["rid"] = room.ID
			utils.Respond(w, resp)
		}else{
			resp := utils.Message(true, "found room")
			resp["rid"] = rid-1
			arrayMessage := models.GetMessageForUser(rid - 1, 1)
			resp["arrayMessage"] = arrayMessage
			utils.Respond(w, resp)
		}
	}
}



