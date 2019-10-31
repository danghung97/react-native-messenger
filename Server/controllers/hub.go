package controllers

import (
	"Server/models"
	"encoding/json"
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
			for client := range h.clients {
				if client.rid == message.RoomID {
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