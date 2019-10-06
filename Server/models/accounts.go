package models

import (
	u "Server/utils"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
	"os"
	//"Server/help"
)

type Token struct{
	UserId uint
	jwt.StandardClaims
}

type Code struct{
	code string `json:"code"`
}

type Account struct{
	gorm.Model
	Email string `json:"email" validate:"email"`
	Password string `json:"password" validate:"gt=6"`
	Token string `json:"token";sql:"-"`
}

type FakeAccount struct{
	gorm.Model
	Email string `json:"email" validate:"email"`
	Code Code
}

var validate *validator.Validate

func validateFunc(account *FakeAccount) error{
	err := validate.Struct(account)
	if err != nil {
		return err
	}
	return nil
}

func (account *FakeAccount) CreateFakeAccount() (map[string] interface{}){
	temp := &FakeAccount{}
	var err error
	err = GetDB().Table("accounts").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return u.Message(false, "Connection error. Please retry")
	}
	if temp.Email != "" {
		return u.Message(false, "Email address already in use by another user.")
	}
	err = GetDB().Table("fakeAccount").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return u.Message(false, "Connection error. Please retry")
	}
	if temp.Email != "" {
		GetDB().Delete(account)
	}
	validate = validator.New()
	err = validateFunc(account)
	if err!=nil {
		return u.Message(false, err.Error())
	}
	GetDB().Create(account)
	resp := u.Message(true, "check your email to take your code")
	//resp["fake account"] = account
	return resp
}


func (account *Account) Create() (map[string] interface{}){
	//temp := &Account{}
	//var err error
	//err = GetDB().Table("accounts").Where("email = ?", account.Email).First(temp).Error
	//if err != nil && err != gorm.ErrRecordNotFound {
	//	return u.Message(false, "Connection error. Please retry")
	//}
	//if temp.Email != "" {
	//	return u.Message(false, "Email address already in use by another user.")
	//}
	//validate = validator.New()
	//err = validateFunc(account)
	//if err!=nil {
	//	return u.Message(false, err.Error())
	//}

	hashedPassword, _:= bcrypt.GenerateFromPassword([]byte(account.Password), bcrypt.DefaultCost)
	account.Password = string(hashedPassword)

	GetDB().Create(account)

	if account.ID<0{
		return u.Message(false, "Failed to create account, connection error.")
	}

	tk:= &Token{UserId: account.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString

	account.Password = ""
	reponse := u.Message(true, "Account has been created")
	reponse["account"]= account
	return reponse
}

func Login(email, password string) (map[string]interface{}){
	account := &Account{}
	var err error
	err = GetDB().Table("accounts").Where("email = ?", email).First(account).Error
	if err!=nil{
		if err == gorm.ErrRecordNotFound{
			return u.Message(false, "Email addres not found")
		}
		return u.Message(false, "Connection error. Please retry")
	}

	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(password))
	if err!=nil && err==bcrypt.ErrMismatchedHashAndPassword{ //Password does not match!
		return u.Message(false, "Invalid login credentials. Please try again")
	}
	account.Password = ""
	tk := &Token{UserId: account.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString

	resp := u.Message(true, "logged in")
	resp["account"] = account
	return resp
}

func (account *Account) Verify(r *http.Request) (bool, string){
	code := &Code{}
	err := json.NewDecoder(r.Body).Decode(code)
	if err!=nil{
		return false, "Invalid request"
	}

	temp := &FakeAccount{}
	err = GetDB().Table("fakeAccount").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return false, err.Error()
	}
	if temp.Email == ""{
		return false, "don't find your email"
	}
	if temp.Email == account.Email {
		return false, "verify successfully!"
	}
	return false, "your code is wrong"
}
