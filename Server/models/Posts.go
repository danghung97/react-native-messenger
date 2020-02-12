package models

import (
	"Server/utils"
	"github.com/jinzhu/gorm"
	"time"
)

type Posts struct {
	gorm.Model
	UserId uint `json:"authorId"`
	Time time.Time `json:"time"`
	ContentText string `json:"content_text"`
	ContentImage string `json:"content_image"`
	Public bool `gorm:"default:true" json:"public"`
}

func (Post *Posts) AddNewPost() map[string]interface{} {
	GetDB().Create(Post)
	Post.Time = time.Now()
	if Post.ID < 0 {
		return utils.Message(false, "Failed to create account, connection error.")
	}
	
	account := &Account{}
	err := GetDB().Table("accounts").Where("id = ?", Post.UserId).First(account).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return utils.Message(false, "Connection error. Please retry")
	}
	listPost := account.Posts
	listPost = append(listPost, int64(Post.ID))
	GetDB().Model(&account).Update("posts", listPost)
	
	return utils.Message(true, "Create new post successfully!")
}