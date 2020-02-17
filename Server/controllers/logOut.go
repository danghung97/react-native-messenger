package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"github.com/jinzhu/gorm"
	"net/http"
)

var Logout = func(w http.ResponseWriter, r *http.Request) {
	userid := r.Context().Value("user")
	//tk := &models.Token{}
	//
	//token, err := jwt.ParseWithClaims(tokenPart.(string), tk, func(token *jwt.Token) (interface{}, error) {
	//	return []byte(os.Getenv("token_password")), nil
	//})
	//response := make(map[string] interface{})
	//
	//if err != nil { //Malformed token, returns with http code 403 as usual
	//	response = utils.Message(false, "Malformed authentication token")
	//	if err == jwt.ErrSignatureInvalid {
	//		w.WriteHeader(http.StatusUnauthorized)
	//	}else {
	//		w.WriteHeader(http.StatusBadRequest)
	//	}
	//	w.Header().Add("Content-Type", "application/json")
	//	utils.Respond(w, response)
	//	return
	//}
	//
	//models.DeleteRefreshToken(token.Claims.(*models.Token).StandardClaims.Id)
	//utils.Respond(w, utils.Message(true, "log out successfully"))
	account := &models.Account{}
	err := models.GetDB().Table("accounts").Where("id = ?", userid).First(account).Error
	if err!=nil && err != gorm.ErrRecordNotFound {
		utils.Respond(w, 503, utils.Message(false, "connection error, please retry"))
		return
	}
	
	//arrayFcmTokens := account.FcmToken
	//arrayStatusFcmTokens := account.StatusFcmTokens
	FcmToken := &models.FCMTokens{}
	err = json.NewDecoder(r.Body).Decode(FcmToken)
	if err !=nil {
		utils.Respond(w, 400, utils.Message(false, "Invalid Request"))
		return
	}
	arrayFcmTokens := account.FcmToken
	arrayStatusFcmTokens := account.StatusFcmTokens
	check := false
	for index, value := range arrayFcmTokens {
		if value == FcmToken.Token {
			check = true
			arrayStatusFcmTokens[index] = false
			models.GetDB().Model(&account).Update("status_fcm_tokens", arrayStatusFcmTokens)
			utils.Respond(w, 200, utils.Message(true, "log out successfully, token: false"))
			return
		}
	}
	if !check {
		utils.Respond(w, 404, utils.Message(false, "not found fcm token"))
		return
	}
}