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
	models.InitBoardChess()
	router := mux.NewRouter()
	hub := controllers.NewHub()
	go hub.Run()
	
	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	router.HandleFunc("/api/user/sendmail", controllers.SendEmail).Methods("POST")
	router.HandleFunc("/api/user/logout", controllers.Logout).Methods("POST")
	router.HandleFunc("/api/user/update-avatar", controllers.UpdateAvatar).Methods("PUT")
	router.HandleFunc("/api/user/change-password",func(w http.ResponseWriter, r *http.Request){
		resp, status := controllers.CreateNewPassword(r, "Change password")
		utils.Respond(w, status, resp)
	}).Methods("PUT")
	router.HandleFunc("/api/user/forget-password", func(w http.ResponseWriter, r *http.Request){
		resp, status := controllers.CreateNewPassword(r, "Forget password")
		utils.Respond(w, status, resp)
	}).Methods("PUT")
	router.HandleFunc("/api/user/uploading", func(w http.ResponseWriter, r *http.Request){
		resp, status := controllers.Uploads(r)
		utils.Respond(w, status, resp)
	}).Methods("POST")
	router.HandleFunc("/api/user/taken", controllers.TakeInfoAccount).Methods("GET")
	router.HandleFunc("/api/load-more-message", models.LoadMoreMessage).Methods("GET")
	router.HandleFunc("/api/loadroom", controllers.LoadRoom).Methods("POST")
	router.HandleFunc("/api/user/refresh", app.Refresh).Methods("POST")
	router.HandleFunc("/api/user/find", models.FindUser).Methods("POST")
	router.HandleFunc("/api/phone-device/push", models.FcmToken).Methods("POST")
	router.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request){
		controllers.ServeWs(hub, w, r)
	})
	router.HandleFunc("/api/user/addPost", controllers.AddPost).Methods("POST")
	router.HandleFunc("/api/user/removePost", controllers.RemovePost).Methods("DELETE")
	router.HandleFunc("/api/user/fetchPost", controllers.FetchPost).Methods("GET")
	
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