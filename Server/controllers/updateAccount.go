package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
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

func CreateNewPassword(r *http.Request, reason string) (isSuccess bool, message string) {
	accountRequest := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(accountRequest)
	if err!=nil {
		return false, "Invalid Request"
	}
	check, message := accountRequest.Verify(accountRequest.Code)
	if !check {
		return false, message
	}
	account := &models.Account{}
	err = models.GetDB().Table("accounts").Where("email = ?", accountRequest.Email).First(account).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, "Account does not exist"
		}
		return false, "Connection error. Please retry"
	}
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(accountRequest.Password), bcrypt.DefaultCost)
	models.GetDB().Model(&account).Update("password", string(hashPassword))
	return true, fmt.Sprintf("%s successfully", reason)
}