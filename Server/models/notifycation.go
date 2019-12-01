package models

import (
	"Server/utils"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/jinzhu/gorm"
	"net/http"
	"os"
	"time"
)

type FCMdata struct {
	MulticastId int `json:"multicast_id"`
	Success uint `json:"success"`
	Failure uint `json:"failure"`
	CanonicalIds uint `json:"canonical_ids"`
	Results []map[string]interface{} `json:"results"`
}

func SendNotification(token, body, image string, auth *Account, screen string ) (bool, error) {
	requestBody, err := json.Marshal(map[string]interface{}{
		"to": token,
		"notification": map[string]interface{}{
			"body" : body,
			"title" : auth.Email,
			"content_available" : true,
			"priority" : "high",
			"android_channel_id": "appfood",
			"image": image,
		},
		"data" : map[string]interface{}{
			"body" : body,
			"title" : auth.Email,
			"content_available" : true,
			"priority" : "high",
			"author": auth,
			"screen": screen,
		},
	})
	
	if err!=nil {
		return false, err
	}
	timeout := time.Duration(10 * time.Second)
	client := http.Client{
		Timeout: timeout,
	}
	request, err := http.NewRequest("POST", "https://fcm.googleapis.com/fcm/send", bytes.NewBuffer(requestBody))
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", fmt.Sprintf("key=%s", os.Getenv("firebase_server_key")))
	
	if err!=nil {
		return false, err
	}
	
	resp, err := client.Do(request)
	if err!=nil {
		return false, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK {
		//bodyBytes, _ := ioutil.ReadAll(resp.Body)
		result := &FCMdata{}
		err = json.NewDecoder(resp.Body).Decode(result)
		if err!=nil {
			return false, fmt.Errorf("invalid request")
		}
		if result.Success >= 1 {
			return true, nil
		}
		//for _, value := range result.Results {
		//	for key, info := range value {
		//		if key == "error"{
		//			if info == "NotRegistered" {
		//				return false, fmt.Errorf("NotRegistered")
		//			}
		//			return false, fmt.Errorf(info.(string))
		//		}
		//	}
		//}
	}
	return false, nil
}

type FCMTokens struct {
	//DeviceId uint `json:"deviceid"`
	//DeviceName string `json:"deviceName"`
	//Platform string `json:"platform"`
	Token string `json:"fcm_token"`
}

var FcmToken = func(w http.ResponseWriter, r *http.Request) {
	userid := r.Context().Value("user")
	FcmToken := &FCMTokens{}
	err := json.NewDecoder(r.Body).Decode(FcmToken)
	if err!=nil {
		utils.Respond(w, utils.Message(false, "Invalid Request"))
		return
	}

	account := &Account{}
	err = GetDB().Table("accounts").Where("id = ?",userid.(uint)).First(account).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		utils.Respond(w, utils.Message(false, "connection error. Please retry"))
		return
	}
	arrayFcmTokens := account.FcmToken
	arrayStatusFcmTokens := account.StatusFcmTokens
	check := false
	for index, value := range arrayFcmTokens {
		if value == FcmToken.Token {
			check = true
			arrayStatusFcmTokens[index] = true
			GetDB().Model(&account).Update("status_fcm_tokens", arrayStatusFcmTokens)
			utils.Respond(w, utils.Message(true, "token already available"))
			return
		}
	}
	if !check {
		arrayFcmTokens = append(arrayFcmTokens, FcmToken.Token)
		arrayStatusFcmTokens = append(arrayStatusFcmTokens, true)
		//GetDB().Model(&account).Update("fcm_token", arrayFcmTokens)
		GetDB().Model(&account).Update(map[string]interface{}{"fcm_token": arrayFcmTokens, "status_fcm_tokens": arrayStatusFcmTokens})
		utils.Respond(w, utils.Message(true, "saved token successfully!"))
	}
}