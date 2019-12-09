package main

import (
	"Server/app"
	"Server/controllers"
	"Server/models"
	"Server/utils"
	
	"github.com/gorilla/mux"
	//_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"net/http"
	"os"
)


func main(){
	
	models.InitDBToken()
	router := mux.NewRouter()
	hub := controllers.NewHub()
	go hub.Run()
	
	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	router.HandleFunc("/api/user/sendmail", controllers.SendEmail).Methods("POST")
	router.HandleFunc("/api/user/logout", controllers.Logout).Methods("POST")
	router.HandleFunc("/api/user/update-avatar", controllers.UpdateAvatar).Methods("POST")
	router.HandleFunc("/api/user/uploading", func(w http.ResponseWriter, r *http.Request){
		isSuccess, link, message := controllers.Uploads(r)
		resp := utils.Message(isSuccess, message)
		resp["link"] = link
		utils.Respond(w, resp)
	}).Methods("POST")
	router.HandleFunc("/api/user/taken", controllers.TakeInfoAccount).Methods("GET")
	router.HandleFunc("/api/load-more-message", models.LoadMoreMessage).Methods("POST")
	router.HandleFunc("/api/loadroom", controllers.LoadRoom).Methods("POST")
	router.HandleFunc("/api/user/refresh", app.Refresh).Methods("POST")
	router.HandleFunc("/api/user/find", models.FindUser).Methods("POST")
	router.HandleFunc("/api/phone-device/push", models.FcmToken).Methods("POST")
	router.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request){
		controllers.ServeWs(hub, w, r)
	})
	
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