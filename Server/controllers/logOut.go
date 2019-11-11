package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"net/http"
)

type myToken struct {
	Token string `json:"tk"`
}

var Logout = func(w http.ResponseWriter, r *http.Request) {
	userid := r.Context().Value("user")
	r.ParseForm()
	fmt.Println(r.Form)
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
		utils.Respond(w, utils.Message(false, "connection error, please retry"))
		return
	}
	
	//arrayFcmTokens := account.FcmToken
	//arrayStatusFcmTokens := account.StatusFcmTokens
	re := myToken{}
	json.NewDecoder(r.Body).Decode(&re)
	fmt.Println(re)
	utils.Respond(w, utils.Message(true, "log out successfully"))
	
}