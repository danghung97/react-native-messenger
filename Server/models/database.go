package models

import (
	"Server/help"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"os"
)

var db *gorm.DB

var refreshTokens map[string]string

func init(){
	//e := godotenv.Load()
	//if e!=nil{
	//	fmt.Print(e)
	//}

	username := os.Getenv("db_user")
	password := os.Getenv("db_pass")
	dbName := os.Getenv("db_name")
	dbHost := os.Getenv("db_host")

	dbUri := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, username, dbName, password)
	fmt.Println(dbUri)

	var err error
	db, err = gorm.Open("postgres", dbUri)
	if err != nil {
		fmt.Print(err)
	}

	db.Debug().AutoMigrate(&Account{}, &FakeAccount{}, &Messages{}, &Rooms{})
	//db.DropTable("friends")
	//err = db.Model(&Account{}).DropColumn("fcm_token").Error
	//if err != nil {
	//	log.Print("ERROR: We expect the receiver_id column to be drop-able")
	//}
}

func GetDB() *gorm.DB{
	return db
}

func InitDBToken() {
	refreshTokens = make(map[string]string)
}

func StoreRefreshToken() (jti string) {
	jti = help.GenerateString(32)
	
	for refreshTokens[jti] != ""{	// check to make sure our jti is unique
		jti = help.GenerateString(32)
		return jti
	}
	
	refreshTokens[jti] = "valid"
	
	return jti
}

func DeleteRefreshToken(jti string) {
	delete(refreshTokens, jti)
}

func CheckRefreshToken(jti string) bool{
	return refreshTokens[jti] != ""
}
