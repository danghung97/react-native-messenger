package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"net/http"
)

var LoadRoom = func(w http.ResponseWriter, r *http.Request){
	authorid := r.Context().Value("user")
	
	//received := &Id{}
	//err := json.NewDecoder(r.Body).Decode(received)
	//if err!=nil{
	//	utils.Respond(w, utils.Message(false, "Invalid request"))
	//	return
	//}
	
	//fmt.Println("rec", received.received)
	//rid, err := models.GetRoomId(authorid, received)
	if err != nil {
		utils.Respond(w, utils.Message(false, fmt.Sprintf("error: %s", err)))
		return
	}else{
		if rid == 0 {
			room := &models.Rooms{
				UserId1: authorid.(uint),
				UserId2: 1,
			}
			models.GetDB().Create(room)
			models.GetDB().Model(&room).Update("room_name", fmt.Sprintf("room %v", room.ID))
			fmt.Println(room)
		}else{
			resp := utils.Message(true, "find room")
			resp["rid"] = rid-1
			utils.Respond(w, resp)
			return
		}
	}
}

