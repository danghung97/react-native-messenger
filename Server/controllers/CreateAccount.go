package controllers

import (
	"Server/help"
	"Server/models"
	"Server/utils"
	"encoding/json"
	"fmt"
	"net/http"
)

var CreateAccount = func(w http.ResponseWriter, r *http.Request){
	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account)
	if err!=nil{
		utils.Respond(w, utils.Message(false, "Invalid request"))
		return
	}

	//check, message := account.Verify(account.Code)
	//if !check {
	//	utils.Respond(w, utils.Message(false, message))
	//	return
	//}

	resp := account.Create()
	utils.Respond(w, resp)
}

var Authenticate = func(w http.ResponseWriter, r *http.Request){
	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account)

	if err!=nil {
		utils.Respond(w, utils.Message(false, "Invalid request"))
		return
	}

	resp := models.Login(account.Email, account.Password)
	utils.Respond(w, resp)
}

var SendEmail = func(w http.ResponseWriter, r *http.Request){
	account := &models.FakeAccount{}
	err := json.NewDecoder(r.Body).Decode(account)
	if err!=nil{
		utils.Respond(w, utils.Message(false, "Invalid request"))
		return
	}

	randomString := help.GenerateString(6)
	ok, msg := account.CreateFakeAccount(randomString)
	if !ok {
		utils.Respond(w, utils.Message(false, msg))
		return
	}
	check, message:= Email(account.Email, randomString)
	if !check {
		utils.Respond(w, utils.Message(false, message))
		return
	}
	utils.Respond(w, utils.Message(true, "check your email to take your code"))
}

var TakeInfoAccount = func(w http.ResponseWriter, r *http.Request){
	user := r.Context().Value("user")
	account := &models.Account{}
	err := models.GetDB().Table("accounts").Where("id = ?", user).First(account).Error
	if err!=nil{
		utils.Respond(w, utils.Message(false, fmt.Sprintf("error: %s", err)))
		return
	}
	resp := utils.Message(true, "take info successfully")
	account.Password=""
	resp["account"] = account
	utils.Respond(w, resp)
}