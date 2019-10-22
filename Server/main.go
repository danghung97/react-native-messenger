package main

import (
	"Server/app"
	"Server/controllers"
	//socketio "github.com/googollee/go-socket.io"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"net/http"
	"os"
)


func main(){
	

	router := mux.NewRouter()
	server := controllers.NewServer()
	go server.Listen()
	
	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	router.HandleFunc("/api/user/sendmail", controllers.SendEmail).Methods("POST")
	router.HandleFunc("/api/user/logout", controllers.Logout).Methods("POST")
	router.HandleFunc("/api/user/uploading", controllers.Uploads).Methods("POST")
	router.HandleFunc("/api/user/taken", controllers.TakeInfoAccount).Methods("GET")
	router.HandleFunc("/api/loadroom", controllers.LoadRoom).Methods("POST")
	router.HandleFunc("/chat", server.HandleChat)

	router.Use(app.JwtAuthentication)

	port:= os.Getenv("PORT")
	if port == "" { // just for localhost
		port = "8000"
	}
	
	err := http.ListenAndServe(":"+ port, router)
	if err!=nil {
		log.Fatal(err)
	}
}