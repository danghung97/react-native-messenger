package controllers

import (
	"Server/help"
	"Server/models"
	"Server/utils"
	"encoding/json"
	"net/http"
)

var CreateAccount = func(w http.ResponseWriter, r *http.Request){
	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account)
	if err!=nil{
		utils.Respond(w, utils.Message(false, "Invalid request"))
		return
	}

	check, message := account.Verify(account.Code)
	if !check {
		utils.Respond(w, utils.Message(false, message))
		return
	}

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
	check , message:= email(account.Email, randomString)
	if !check {
		utils.Respond(w, utils.Message(false, message))
		return
	}
	resp := account.CreateFakeAccount(randomString)
	utils.Respond(w, resp)
}