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
	Post.Time = time.Now()
	GetDB().Create(Post)
	if Post.ID < 0 {
		return utils.Message(false, "Failed to create post, connection error.")
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

func(Post *Posts) RemovePost(userId uint) map[string]interface{} {
	account := &Account{}
	err := GetDB().Table("accounts").Where("id = ?", userId).First(account).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return utils.Message(false, "Connection error. Please retry")
	}
	listPost := account.Posts
	for i, v := range listPost {
		if uint(v) == Post.ID {
			listPost = append(listPost[:i], listPost[i+1:]...)
			GetDB().Model(&account).Update("posts", listPost)
			err := GetDB().Table("posts").Where("id = ?", Post.ID).First(Post).Error
			if err!=nil {
				if err==gorm.ErrRecordNotFound {
					return utils.Message(false, "Not found post")
				}
				return utils.Message(false, "connection error, please retry")
			}
			GetDB().Delete(Post)
			return utils.Message(true, "Delete post successfully!")
		}
	}
	return utils.Message(false, "Not found post")
}