package models

//import (
//	"Server/utils"
//	"encoding/json"
//	"net/http"
//)
//
//type FcmTk struct {
//	FcmToken string `json:"fcmtoken"`
//	DeviceId string `json:"deviceid"`
//}
//
//var FcmToken = func(w http.ResponseWriter, r *http.Request) {
//	FcmToken := &FcmTokens{}
//	err := json.NewDecoder(r.Body).Decode(FcmToken)
//	if err!=nil {
//		utils.Respond(w, utils.Message(false, "Invalid Request"))
//		return
//	}
//
//	StoreFcmToken(FcmToken.DeviceId, FcmToken.FcmToken)
//	utils.Respond(w, utils.Message(true, "saved token successfully!"))
//
//}