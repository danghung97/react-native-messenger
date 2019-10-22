package controllers

import (
	"Server/models"
	"fmt"
	"github.com/gorilla/websocket"
	"log"
)

const channelBufSize = 100

//var maxId int = 0

type User struct {
	id uint
	conn *websocket.Conn
	server *Server
	outgoingMessage chan *models.Messages
	doneCh chan bool
}

func NewUser(conn *websocket.Conn, server *Server, rid uint) *User {
	if conn == nil {
		panic("connection cannot be nil")
	}
	if server == nil{
		panic(" Server cannot be nil")
	}

	ch := make(chan *models.Messages, channelBufSize)
	doneCh := make(chan bool)
	log.Println("Done creating new User")
	return &User{rid, conn, server, ch, doneCh}
}

func (user *User) Conn() *websocket.Conn {
	return user.conn
}

func (user *User) Write(message *models.Messages){
	select {
	case user.outgoingMessage <- message:
	default:
		user.server.RemoveUser(user)
		err := fmt.Errorf("User %d is disconnected.", user.id)
		user.server.Err(err)

	}
}

func (user *User) Done(){
	//log.Println("done user")
	user.doneCh <- true
}

func (user *User) Listen() {
	go user.listenWrite()
	user.listenRead()
}


func (user *User) listenWrite(){
	//log.Println("Listening to write to client")

	for {
		select {

		//send message to user
		case msg:= <-user.outgoingMessage:
			//  log.Println("send in listenWrite for user :",user.id, msg)
			user.conn.WriteJSON(&msg)
			// receive done request
		case <-user.doneCh:
			//log.Println("Done Channel for user:")
			user.server.RemoveUser(user)
			user.doneCh <- true
			return
		}
	}
}

func (user *User) listenRead() {
	//log.Println("Listening to Read to client")
	for {
		select {
		//receive Done request
		case <- user.doneCh:
			user.server.RemoveUser(user)
			user.doneCh <- true
			return
		// read data from websocket connection
		default:
			var messageObject models.Messages
			err := user.conn.ReadJSON(&messageObject)
			if err != nil {
				user.doneCh <- true
				//log.Println("Error while reading JSON from websocket ",err.Error())
				user.server.Err(err)
			} else {
				user.server.ProcessNewIncomingMessage(&messageObject)
			}
		}
	}
}
