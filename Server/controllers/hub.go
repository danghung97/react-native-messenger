package controllers

import (
	"Server/models"
	"encoding/json"
	"github.com/jinzhu/gorm"
)

type Hub struct {
	// Registered clients.
	clients map[*Client]bool
	
	// Inbound messages from the clients.
	broadcast chan models.Messages
	
	// Register requests from the clients.
	register chan *Client
	
	// Unregister requests from clients.
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		broadcast:  make(chan models.Messages),
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
			err := models.GetDB().Table("rooms").Where("id = ?", message.RoomID).First(room).Error
			if err != nil && err != gorm.ErrRecordNotFound {
				//return u.Message(false, "Connection error. Please retry")
			}
			for client := range h.clients {
				if client.uid == room.UserId1 || client.uid == room.UserId2 {
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