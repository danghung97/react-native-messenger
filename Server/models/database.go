package models

import (
	"Server/help"
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"os"
)

var db *gorm.DB // my db
const (
	row = 20
	column = 15
)
var refreshTokens map[string]string
var boardChessOfRoom map[uint]interface{} // save board Chess of rooms
var boardChess = [row][column]string{} // board chess

func init(){
	//e := godotenv.Load()
	//if e!=nil{
	//	fmt.Print(e)
	//}
	for i := 0; i<20; i++ {
		for j := 0; j< 15; j++ {
			boardChess[i][j] = " "
		}
	}

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

	db.Debug().AutoMigrate(&Account{}, &FakeAccount{}, &Messages{}, &Rooms{}, &Posts{})
	//db.DropTable("friends")
	//err = db.Model(&Account{}).DropColumn("fcm_token").Error
	//if err != nil {
	//	log.Print("ERROR: We expect the receiver_id column to be drop-able")
	//}
}

func GetDB() *gorm.DB{
	return db
}

func CreateBoardChess(roomId uint) {
	boardChessOfRoom[roomId] = boardChess
}

func GetBoarChess(roomId uint) [row][column]string{
	return boardChessOfRoom[roomId].([row][column]string)
}

func UpdateBoardChess(roomId uint, posX, posY int, turn string) {
	if boardChessOfRoom[roomId] == "" {
		CreateBoardChess(roomId)
	}
	bc := boardChessOfRoom[roomId].([row][column]string)
	bc[posX][posY] = turn
	boardChessOfRoom[roomId] = bc
}

func DeleteBoardChess(roomId uint) {
	delete(boardChessOfRoom, roomId)
}

func InitBoardChess() {
	boardChessOfRoom = make(map[uint]interface{})
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
