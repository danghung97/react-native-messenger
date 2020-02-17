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
		utils.Respond(w, 400, utils.Message(false, "Invalid request"))
		return
	}
	
	authorId := r.Context().Value("user")
	Post.UserId = authorId.(uint)
	resp, status := Post.AddNewPost()
	utils.Respond(w, status, resp)
}

var RemovePost = func(w http.ResponseWriter, r *http.Request) {
	Post := &models.Posts{}
	Param := r.URL.Query().Get("id")
	
	id, err := strconv.Atoi(Param)
	if err != nil {
		utils.Respond(w, 400, utils.Message(false, "Param 'id' is invalid"))
		return
	}
	Post.ID = uint(id)
	resp, status := Post.RemovePost()
	utils.Respond(w, status, resp)
}

var FetchPost = func(w http.ResponseWriter, r *http.Request) {
	Param := r.URL.Query().Get("offset")
	offset, err := strconv.Atoi(Param)
	if err != nil {
		utils.Respond(w, 400, utils.Message(false, "Param 'amount' is invalid"))
		return
	}
	
	authorId := r.Context().Value("user")
	resp, status := models.FetchPost(authorId.(uint), uint(offset))
	utils.Respond(w, status, resp)
}