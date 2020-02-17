package controllers

import (
	"Server/help"
	"Server/models"
	"Server/utils"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"net/http"
)

var CreateAccount = func(w http.ResponseWriter, r *http.Request){
	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account)
	if err!=nil{
		utils.Respond(w, 400, utils.Message(false, "Invalid request"))
		return
	}

	check, message := account.Verify(account.Code)
	if !check {
		utils.Respond(w, 400, utils.Message(false, message))
		return
	}

	resp, status := account.Create()
	utils.Respond(w, status, resp)
}

var Authenticate = func(w http.ResponseWriter, r *http.Request){
	account := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(account)

	if err!=nil {
		utils.Respond(w, 400, utils.Message(false, "Invalid request"))
		return
	}

	resp, status := models.Login(account.Email, account.Password)
	utils.Respond(w, status, resp)
}

var SendEmail = func(w http.ResponseWriter, r *http.Request){
	account := &models.FakeAccount{}
	err := json.NewDecoder(r.Body).Decode(account)
	if err!=nil{
		utils.Respond(w, 400, utils.Message(false, "Invalid request"))
		return
	}

	randomString := help.GenerateString(6)
	resp, status := account.CreateFakeAccount(randomString)
	if status != 200 {
		utils.Respond(w, status, resp)
		return
	}
	check, message:= Email(account.Email, randomString)
	if !check {
		utils.Respond(w, 500, utils.Message(false, message))
		return
	}
	utils.Respond(w, 200, utils.Message(true, "check your email to take your code"))
}

var TakeInfoAccount = func(w http.ResponseWriter, r *http.Request){
	user := r.Context().Value("user")
	account := &models.Account{}
	err := models.GetDB().Table("accounts").Where("id = ?", user).First(account).Error
	if err != nil && err != gorm.ErrRecordNotFound{
		utils.Respond(w, 503, utils.Message(false, fmt.Sprintf("error: %s", err)))
		return
	}
	resp := utils.Message(true, "take info successfully")
	account.Password=""
	resp["account"] = account
	utils.Respond(w, 200, resp)
}