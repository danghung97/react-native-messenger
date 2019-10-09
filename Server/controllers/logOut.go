package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"fmt"
	"net/http"
)

var Logout = func(w http.ResponseWriter, r *http.Request) {
	account := models.Account{}
	err := json.NewDecoder(r.Body).Decode(account)
	//fmt.Sprintf()
	if err!=nil{
		utils.Respond(w, utils.Message(false, fmt.Sprintf("r: %s", account)))
		return
	}

	models.RefreshToken("sss")
	utils.Respond(w, utils.Message(false, fmt.Sprintf("r: %s", account)))

	//resp := account.refreshToken()
	//utils.Respond(w, resp)
}