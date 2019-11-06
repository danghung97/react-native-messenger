package controllers

import (
	"Server/models"
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

const (
	// Time allowed to write a message to peer
	writeWait = 10 * time.Second
	
	// Time allowed to read the next pong message from the peer
	pongWait = 60 * time.Second
	
	// Send ping to peer with this period. Must be less than pongWait
	pingPeriod = (pongWait * 9) / 10
	
	// Maximum message size allowed from peer.
	maxMessageSize = 512
	
	// Wait time before abandoning the outbound send operation.
	sendTimeout = time.Microsecond * 150
)

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Client struct {
	hub *Hub
	uid uint
	conn *websocket.Conn
	send chan interface{}
}

func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, raw, err := c.conn.ReadMessage()
		if err!=nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		//raw = bytes.TrimSpace(bytes.Replace(raw, newline, space, -1))
		c.dispatchRaw(raw)
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	
	for {
		select {
		case message, ok := <- c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
		
			if err := wsWrite(c.conn, websocket.TextMessage, message); err != nil {
				if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure,
					websocket.CloseNormalClosure) {
					log.Println("ws: writeLoop", err)
				}
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

func wsWrite(ws *websocket.Conn, mt int, msg interface{}) error {
	var bits []byte
	if msg !=nil {
		bits = msg.([]byte)
	}else {
		bits = []byte{}
	}
	ws.SetWriteDeadline(time.Now().Add(writeWait))
	return ws.WriteMessage(mt, bits)
}

func ServeWs(hub *Hub, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{hub: hub, conn: conn, send: make(chan interface{}, 256)}
	client.hub.register <- client
	
	// Allow collection of memory referenced by the caller by doing all work in
	// new goroutines.
	go client.writePump()
	go client.readPump()
}

func (c *Client) queueOutBytes(data []byte) bool {
	if c==nil {
		return true
	}
	select {
	case c.send <- data:
	case <- time.After(sendTimeout):
		log.Println("s.queueOutBytes: timeout")
		return false
	}
	return true
}

func (c *Client) dispatchRaw(raw []byte) {
	var msg models.Messages
	
	if len(raw) == 1 && raw[0] == 0x31 { 	// 0x31 == '1'. This is a network probe message. Respond with a '0'
		c.queueOutBytes([]byte{0x30})
		return
	}
	
	if err := json.Unmarshal(raw, &msg); err != nil {
		log.Println("s.dispatch", err)
		return
	}
	if msg.ID < 0 {
		log.Println("connection error")
		return
	}
	if msg.TypeMessage != "client-connected" {
		models.GetDB().Create(&msg)
		models.GetDB().Model(&msg).Update("created_at", time.Now())
	}
	c.uid = msg.UserID
	c.hub.broadcast <- msg
}