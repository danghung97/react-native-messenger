package models

import (
	u "Server/utils"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/go-playground/validator.v9"
	"os"
	"time"
	
	//"Server/help"
)

type Token struct{
	UserId uint
	jwt.StandardClaims
}

type Account struct{
	gorm.Model
	Email string `json:"email" validate:"email"`
	Password string `json:"password" validate:"gt=6"`
	Name string `json:"name"`
	Phone int `json:"phone"`
	Address string `json:"address"`
	Token string `json:"token";sql:"-"`
	Code string `json:"code"`
	Avatar string `json:"avatar"`
	FcmToken pq.StringArray `gorm:"type:varchar(500)[];default:array[]::varchar[]" json:"fcm_tokens"`
	StatusFcmTokens pq.BoolArray `gorm:"type:boolean[];default:array[]::boolean[]" json:"status_fcm_tokens"`
	//Posts pq.Int64Array `gorm:"type:integer[];default:array[]::integer[]" json:"posts"`
	//ListFriends []*Friend `json:"list_friends"`
}

//type Friend struct {
//	gorm.Model
//	Email string `json:"email"`
//	Name string `json:"name"`
//	Phone int `json:"phone"`
//	Address string `json:"address"`
//	Avatar string `json:"avatar"`
//}

type FakeAccount struct{
	gorm.Model
	Email string `json:"email" validate:"email"`
	Code string	`json:"code"`
}

var validate *validator.Validate

func validateFunc(account *FakeAccount) error{
	err := validate.Struct(account)
	if err != nil {
		return err
	}
	return nil
}

func (account *FakeAccount) CreateFakeAccount(code string) (map[string]interface{}, int) {
	temp := &FakeAccount{}
	var err error
	err = GetDB().Table("accounts").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return u.Message(false, "Connection error. Please retry"), 503
	}
	if temp.Email != "" {
		return u.Message(false, "Email address already in use by another user."), 400
	}
	err = GetDB().Table("fake_accounts").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return u.Message(false, "Connection error. Please retry"), 503
	}
	validate = validator.New()
	err = validateFunc(account)
	if err!=nil {
		return u.Message(false, err.Error()), 400
	}
	if temp.Email != "" {
		GetDB().Model(&account).Update("Code", code)
	}else
	{
		account.Code = code
		GetDB().Create(account)
	}
	//resp := u.Message(true, "check your email to take your code")
	//resp["fake account"] = account
	return u.Message(true, "Create fake account success"), 200
}


func (account *Account) Create() (map[string] interface{}, int) {

	hashedPassword, _:= bcrypt.GenerateFromPassword([]byte(account.Password), bcrypt.DefaultCost)
	account.Password = string(hashedPassword)

	GetDB().Create(account)

	if account.ID<0{
		return u.Message(false, "Failed to create account, connection error."), 503
	}
	
	expirationTime := time.Now().Add(72 * time.Hour)
	Jti := StoreRefreshToken()
	tk := &Token{
		UserId: account.ID,
		StandardClaims: jwt.StandardClaims{
			//Audience:  "",
			ExpiresAt: expirationTime.Unix(),
			Id:        Jti,
			//IssuedAt:  0,
			//Issuer:    "",
			//NotBefore: 0,
			//Subject:   "",
		},
	}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString

	account.Password = ""
	account.FcmToken = pq.StringArray{}
	account.StatusFcmTokens = pq.BoolArray{}
	reponse := u.Message(true, "Account has been created")
	reponse["account"]= account
	return reponse, 200
}


func Login(email, password string) (map[string]interface{}, int) {
	account := &Account{}
	var err error
	err = GetDB().Table("accounts").Where("email = ?", email).First(account).Error
	if err!=nil{
		if err == gorm.ErrRecordNotFound{
			return u.Message(false, "Email address not found"), 404
		}
		return u.Message(false, "Connection error. Please retry"), 503
	}

	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(password))
	if err!=nil && err==bcrypt.ErrMismatchedHashAndPassword{ //Password does not match!
		return u.Message(false, "Invalid login credentials. Please try again"), 400
	}
	
	account.Password = ""
	
	expirationTime := time.Now().Add(72 * time.Hour)
	Jti := StoreRefreshToken()
	tk := &Token{
		UserId: account.ID,
		StandardClaims: jwt.StandardClaims{
			//Audience:  "",
			ExpiresAt: expirationTime.Unix(),
			Id:        Jti,
			//IssuedAt:  0,
			//Issuer:    "",
			//NotBefore: 0,
			//Subject:   "",
		},
	}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString

	resp := u.Message(true, "logged in")
	account.FcmToken = pq.StringArray{}
	account.StatusFcmTokens = pq.BoolArray{}
	resp["account"] = account
	return resp, 200
}

func (account *Account) Verify(code string) (bool, string){

	temp := &FakeAccount{}
	var err error
	err = GetDB().Table("fake_accounts").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return false, err.Error()
	}

	if code == temp.Code {
		return true, "verify successfully!"
	}
	return false, fmt.Sprintf("your code is wrong %s", account)
}
