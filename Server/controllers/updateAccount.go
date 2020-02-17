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
		utils.Respond(w, 503, utils.Message(false, "connection error"))
		return
	}
	resp, status := Uploads(r)
	if status == 200 {
		models.GetDB().Model(&account).Update("avatar", resp["link"])
		utils.Respond(w, 200, utils.Message(true, "Update avatar successfully!"))
		return
	}
	utils.Respond(w, 503, resp)
}

func CreateNewPassword(r *http.Request, reason string) (map[string]interface{}, int) {
	accountRequest := &models.Account{}
	err := json.NewDecoder(r.Body).Decode(accountRequest)
	if err!=nil {
		return utils.Message(false, "Invalid Request"), 400
	}
	check, message := accountRequest.Verify(accountRequest.Code)
	if !check {
		return utils.Message(false, message), 400
	}
	account := &models.Account{}
	err = models.GetDB().Table("accounts").Where("email = ?", accountRequest.Email).First(account).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return utils.Message(false, "Account does not exist"), 404
		}
		return utils.Message(false, "Connection error. Please retry"), 503
	}
	hashPassword, _ := bcrypt.GenerateFromPassword([]byte(accountRequest.Password), bcrypt.DefaultCost)
	models.GetDB().Model(&account).Update("password", string(hashPassword))
	return utils.Message(true, fmt.Sprintf("%s successfully", reason)), 200
}