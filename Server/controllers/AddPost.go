package controllers

import (
	"Server/models"
	"Server/utils"
	"encoding/json"
	"net/http"
	"strconv"
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

var RemovePost = func(w http.ResponseWriter, r *http.Request) {
	Post := &models.Posts{}
	Param := r.URL.Query().Get("id")
	
	id, err := strconv.Atoi(Param)
	if err != nil {
		utils.Respond(w, utils.Message(false, "Param 'id' is missing"))
	}
	Post.ID = uint(id)
	authorId := r.Context().Value("user")
	resp := Post.RemovePost(authorId.(uint))
	utils.Respond(w, resp)
}