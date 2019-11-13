package controllers

import (
	"Server/models"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
	"log"
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
			if message.TypeMessage != "client-connected" {
				err := models.GetDB().Table("rooms").Where("id = ?", message.RoomID).First(room).Error
				if err != nil && err != gorm.ErrRecordNotFound {
					//return u.Message(false, "Connection error. Please retry")
				}
			}
			for client := range h.clients {
				if client.uid == room.UserId1 || client.uid == room.UserId2 || message.TypeMessage == "client-connected" {
					receiver := &models.Account{}
					auth := &models.Account{}
					var err error
					if client.uid == room.UserId1 && message.UserID == client.uid{
						err = models.GetDB().Table("accounts").Where("id = ?", room.UserId2).First(receiver).Error
						err = models.GetDB().Table("accounts").Where("id = ?", room.UserId1).First(auth).Error
						if err != nil {
							log.Fatal(err)
						} else {
							sendNotifi(receiver, auth, message)
						}
					} else if client.uid == room.UserId2 && message.UserID == client.uid {
						err = models.GetDB().Table("accounts").Where("id = ?", room.UserId1).First(receiver).Error
						err = models.GetDB().Table("accounts").Where("id = ?", room.UserId2).First(auth).Error
						if err != nil {
							log.Fatal(err)
						} else {
							sendNotifi(receiver, auth, message)
						}
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
func sendNotifi(receiver, auth *models.Account, message *models.Messages) {
	arrayFcmTokens := receiver.FcmToken
	arrayStatusFcmTokens := receiver.StatusFcmTokens
	for i := 0; i < len(arrayFcmTokens); i++ {
		if arrayStatusFcmTokens[i] {
			auth.Password = ""
			auth.Token = ""
			auth.Code = ""
			auth.FcmToken = pq.StringArray{}
			auth.StatusFcmTokens = pq.BoolArray{}
			_, err := models.SendNotification(arrayFcmTokens[i], receiver.Email, message.Message, "", auth, "ChatScreen")
			fmt.Println("err", err)
			if err != nil {
				log.Fatal(err)
			}
		}
	}
}