package controllers

import (
	"Server/models"
	"Server/utils"
	"net/http"
)

var UpdateAvatar = func(w http.ResponseWriter, r *http.Request) {
	user := r.Context().Value("user")
	account := &models.Account{}
	err := models.GetDB().Table("accounts").Where("id = ?", user).First(account).Error
	if err!=nil{
		utils.Respond(w, utils.Message(false, "connection error"))
		return
	}
	isSuccess, link, message := Uploads(r)
	if isSuccess {
		models.GetDB().Model(&account).Update("avatar", link)
		utils.Respond(w, utils.Message(isSuccess, "Update avatar successfully!"))
		return
	}
	utils.Respond(w, utils.Message(isSuccess, message))
}