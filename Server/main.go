package main

import (
	"Server/app"
	"Server/controllers"
	"fmt"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"net/http"
	"os"
)


func main(){
	router := mux.NewRouter()

	router.HandleFunc("/api/user/new", controllers.CreateAccount).Methods("POST")
	router.HandleFunc("/api/user/login", controllers.Authenticate).Methods("POST")
	router.HandleFunc("/api/user/sendmail", controllers.SendEmail).Methods("POST")
	router.HandleFunc("/api/user/logout", controllers.Logout).Methods("POST")

	router.Use(app.JwtAuthentication)

	port:= os.Getenv("PORT")
	if port == "" { // just for localhost
		port = "8000"
	}

	err := http.ListenAndServe(":"+ port, router)
	if err!=nil {
		fmt.Print(err)
	}
}