package controllers

import (
	"Server/models"
	"Server/utils"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"os"
)

var Logout = func(w http.ResponseWriter, r *http.Request) {
	tokenPart := r.Context().Value("token")
	tk := &models.Token{}
	
	token, err := jwt.ParseWithClaims(tokenPart.(string), tk, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("token_password")), nil
	})
	response := make(map[string] interface{})
	
	if err != nil { //Malformed token, returns with http code 403 as usual
		response = utils.Message(false, "Malformed authentication token")
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
		}else {
			w.WriteHeader(http.StatusBadRequest)
		}
		w.Header().Add("Content-Type", "application/json")
		utils.Respond(w, response)
		return
	}

	models.DeleteRefreshToken(token.Claims.(*models.Token).StandardClaims.Id)
	utils.Respond(w, utils.Message(true, "log out successfully"))
}