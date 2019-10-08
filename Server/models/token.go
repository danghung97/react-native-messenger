package models

import (
	"Server/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"os"
)

func RefreshToken(email string) map[string] interface{} {
	temp := &Account{}
	err := GetDB().Table("accounts").Where("email = ?", email).First(&temp).Error
	if err!=nil {
		if err == gorm.ErrRecordNotFound {
			return utils.Message(false, "Email address not found")
		}
		return utils.Message(false, "Connection error. Please retry")
	}

	tk := &Token{UserId: temp.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenstring, _ := token.SignedString([]byte(os.Getenv("token_password")))

	GetDB().Model(&temp).Update("Token",tokenstring)

	return utils.Message(true, "your token has been refreshed")
}