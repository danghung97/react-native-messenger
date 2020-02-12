package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"net/http"
)

var AddPost = func(w http.ResponseWriter, r *http.Request) {
	Post := &models.Posts{}
	err := json.NewDecoder(r.Body).Decode(Post)
	if err != nil {
		utils.Respond(w, utils.Message(false, "Invalid request"))
		return
	}
	
	authorId := r.Context().Value("user")
	Post.UserId = authorId.(uint)
	resp := Post.AddNewPost()
	utils.Respond(w, resp)
}