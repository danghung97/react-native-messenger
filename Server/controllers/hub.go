package controllers

import (
	controllers2 "Server/controllers/Caro"
	"Server/models"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
	"log"
	"strconv"
	"strings"
)

type Hub struct {
	// Registered clients.
	clients map[*Client]bool
	
	// Inbound messages from the clients.
	broadcast chan *models.Messages
	
	// Register requests from the clients.
	register chan *Client
	
	// Unregister requests from clients.
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan *models.Messages),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.send)
			}
		case message := <-h.broadcast:
			room := &models.Rooms{}
			
			// có nên gửi userId1, userId2 từ client lên ko? ko mất công giảm query, sendMessage nhanh hơn
			err := models.GetDB().Table("rooms").Where("id = ?", message.RoomID).First(room).Error
			if err != nil && err != gorm.ErrRecordNotFound {
				//return u.Message(false, "Connection error. Please retry")
			}

			if message.TypeMessage == "playing" {
				splited := strings.Split(message.Message, " ")
				posX, err := strconv.Atoi(splited[0])
				posY, err := strconv.Atoi(splited[1])
				if err!= nil {
					message.Message = "Undefined position"
					return
				}
				var turn string
				if message.UserID == room.UserId1 {
					turn = "X"
				} else {
					turn = "O"
				}
				models.UpdateBoardChess(message.RoomID, posX, posY, turn)
				isWin := controllers2.CheckWin(posX, posY, models.GetBoarChess(message.RoomID))

				if isWin {
					models.DeleteBoardChess(message.RoomID)
					message.Message = fmt.Sprintf("%s %s", message.Message, "win")
				}else {
					message.Message = fmt.Sprintf("%s %s", message.Message, "not_over")
				}
			} else if message.TypeMessage == "play_game" {
				if message.Message == "Accept" {
					models.CreateBoardChess(message.RoomID)
				}
			}
			
			for client := range h.clients {
				if client.uid == room.UserId1 || client.uid == room.UserId2 {
					switch message.TypeMessage {
					case "text":
					case "image":
						receiver := models.Account{}
						auth := models.Account{}
						var err error
						if client.uid == room.UserId1 && message.UserID == client.uid {
							err = models.GetDB().Table("accounts").Where("id = ?", room.UserId2).First(&receiver).Error
							err = models.GetDB().Table("accounts").Where("id = ?", room.UserId1).First(&auth).Error
							if err != nil {
								log.Fatal(err)
							} else {
								requestSend(&receiver, &auth, message)
							}
						} else if client.uid == room.UserId2 && message.UserID == client.uid {
							err = models.GetDB().Table("accounts").Where("id = ?", room.UserId1).First(&receiver).Error
							err = models.GetDB().Table("accounts").Where("id = ?", room.UserId2).First(&auth).Error
							if err != nil {
								log.Fatal(err)
							} else {
								requestSend(&receiver, &auth, message)
							}
						}
						break
					default:
						break
					}
					m, _ := json.Marshal(message)
					select {
					case client.send <- m:
					default:
						close(client.send)
						delete(h.clients, client)
					}
				}
			}
		}
	}
}
func requestSend(receiver, auth *models.Account, message *models.Messages) {
	arrayFcmTokens := receiver.FcmToken
	arrayStatusFcmTokens := receiver.StatusFcmTokens
	for i := 0; i < len(arrayFcmTokens); i++ {
		if arrayStatusFcmTokens[i] {
			auth.Password = ""
			auth.Token = ""
			auth.Code = ""
			auth.FcmToken = pq.StringArray{}
			auth.StatusFcmTokens = pq.BoolArray{}
			_, err := models.SendNotification(arrayFcmTokens[i], message.Message, "", auth, "ChatScreen")
			//if err == fmt.Errorf("NotRegistered") {
			//	//arrayFcmTokens[i] = nil
			//	fmt.Println("deleted")
			//	arrayFcmTokens = append(arrayFcmTokens[:i], arrayFcmTokens[i+1:]...)
			//	models.GetDB().Model(&auth).Update("fcm_token", arrayFcmTokens)
			//}
			if err != nil {
				log.Fatal("send notification error: ", err)
			}
			
		}
	}
}

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
	for tempY <= 15 { // check qua phai
		if boardChess[posX][tempY] != value {
			break
		}else{
			dem++
		}
		tempY++
	}
	if dem >=5 {
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
	for tempX <= 20 { // check xuong duoi
		if boardChess[tempX][posY] != value {
			break
		}else{
			dem++
		}
		tempX++
	}
	if dem >=5 {
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
	if dem >=5 {
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
	if dem >= 5 {
		return true
	} else {
		return false
	}
}