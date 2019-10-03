package controllers

import (
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

	resp := account.Create()
	utils.Respond(w, resp)
}