package models

import (
	"Server/utils"
	"github.com/jinzhu/gorm"
	"time"
)

type Posts struct {
	gorm.Model
	UserId uint `json:"authorId"`
	ContentText string `json:"content_text"`
	ContentImage string `json:"content_image"`
	Public bool `gorm:"default:true" json:"public"`
}

const Amount = 5

func (Post *Posts) AddNewPost() map[string]interface{} {
	GetDB().Create(Post)
	if Post.ID < 0 {
		return utils.Message(false, "Failed to create post, connection error.")
	}
	
	account := &Account{}
	err := GetDB().Table("accounts").Where("id = ?", Post.UserId).First(account).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return utils.Message(false, "Connection error. Please retry")
	}
	//listPost := account.Posts
	//listPost = append(listPost, int64(Post.ID))
	//GetDB().Model(&account).Update("posts", listPost)
	resp := utils.Message(true, "Create new post successfully!")
	resp["post"] = Post
	return resp
}

func(Post *Posts) RemovePost() map[string]interface{} {
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

func FetchPost(userId, offset uint) map[string]interface{} {
	rows, err := GetDB().Table("posts").Order("created_at DESC").Where("user_id = ?", userId).Offset((offset - 1)*Amount).Limit(Amount).Rows()
	if err!=nil {
		return utils.Message(false, "Connection error, please retry")
	}
	defer rows.Close()
	listPosts := make([]Posts, 0)
	
	var (
		id uint
		created_at time.Time
		updated_at time.Time
		deleted_at *time.Time
		user_id uint
		content_text string
		content_image string
		public bool
	)
	for rows.Next() {
		err := rows.Scan(&id, &created_at, &updated_at, &deleted_at, &user_id, &content_text, &content_image, &public)
		if err!=nil {
			return utils.Message(false, "Connection error, please retry")
		}
		post := Posts{ UserId: user_id, ContentText: content_text, ContentImage: content_image, Public: public}
		post.CreatedAt = created_at
		post.ID = id
		listPosts = append(listPosts, post)
	}
	err = rows.Err()
	if err != nil {
		return utils.Message(false, "Connection error, please retry")
	}
	resp := utils.Message(true, "fetch post successfully!")
	resp["listPosts"] = listPosts
	return resp
}