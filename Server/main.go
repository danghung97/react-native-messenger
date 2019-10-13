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
	//server, err := socketio.NewServer(nil)
	//if err!=nil{
	//	log.Fatal(err)
	//}
	
	router := mux.NewRouter()

	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	router.HandleFunc("/api/user/sendmail", controllers.SendEmail).Methods("POST")
	router.HandleFunc("/api/user/logout", controllers.Logout).Methods("POST")
	router.HandleFunc("/api/user/uploading", controllers.Uploads).Methods("POST")

	router.Use(app.JwtAuthentication)

	port:= os.Getenv("PORT")
	if port == "" { // just for localhost
		port = "8000"
	}

	//go server.Serve()
	//defer server.Close()
	//http.Handle("/socket.io/", server)
	//http.Handle("/", http.FileServer(http.Dir("../AppFood/index.js")))

	err := http.ListenAndServe(":"+ port, router)
	if err!=nil {
		log.Fatal(err)
	}
}