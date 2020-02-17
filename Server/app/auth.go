package app

import (
	"Server/models"
	u "Server/utils"
	"context"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"os"
	"strings"
	"time"
)

var JwtAuthentication = func(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		notAuth := []string{"/api/user/new", "/api/user/login", "/api/user/sendmail", "/ws", "/api/user/forget-password"} //List of endpoints that doesn't require auth
		requestPath := r.URL.Path //current request path

		//check if request does not need authentication, serve the request if it doesn't need it
		for _, value := range notAuth {

			if value == requestPath {
				next.ServeHTTP(w, r)
				return
			}
		}

		response := make(map[string] interface{})
		tokenHeader := r.Header.Get("Authorization") //Grab the token from the header

		if tokenHeader == "" { //Token is missing, returns with error code 403 Unauthorized
			response = u.Message(false, "Missing auth token")
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, http.StatusForbidden, response)
			return
		}

		splitted := strings.Split(tokenHeader, " ") //The token normally comes in format `Bearer {token-body}`, we check if the retrieved token matched this requirement
		if len(splitted) != 2 {
			response = u.Message(false, "Invalid/Malformed auth token")
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, http.StatusForbidden, response)
			return
		}

		tokenPart := splitted[1] //Grab the token part, what we are truly interested in
		tk := &models.Token{}

		token, err := jwt.ParseWithClaims(tokenPart, tk, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("token_password")), nil
		})

		if err != nil { //Malformed token, returns with http code 403 as usual
			response = u.Message(false, "Malformed authentication token")
			w.Header().Add("Content-Type", "application/json")
			if err == jwt.ErrSignatureInvalid {
				u.Respond(w, http.StatusUnauthorized, response)
			}else {
				u.Respond(w, http.StatusBadRequest, response)
			}
			return
		}

		if models.CheckRefreshToken(tk.Id) {
			if !token.Valid { //Token is invalid, maybe not signed on this server
				models.DeleteRefreshToken(tk.Id)
				response = u.Message(false, "Token is not valid.")
				w.Header().Add("Content-Type", "application/json")
				u.Respond(w, http.StatusUnauthorized, response)
				return
			}
			
			//Everything went well, proceed with the request and set the caller to the user retrieved from the parsed token
			//fmt.Sprintf("User %", tk.UserId) //Useful for monitoring
			
			//if r.URL.Path == "/api/user/logout" {
			//	ctx := context.WithValue(r.Context(), "token", tokenPart)
			//	r = r.WithContext(ctx)
			//	next.ServeHTTP(w, r)
			//	return
			//}
			ctx := context.WithValue(r.Context(), "user", tk.UserId)
			r = r.WithContext(ctx)
			next.ServeHTTP(w, r) //proceed in the middleware chain!
		} else {
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, http.StatusUnauthorized, u.Message(false, "Refresh token has been revoked!"))
		}
	})
}

var Refresh = func(w http.ResponseWriter, r *http.Request){
	response := make(map[string] interface{})
	tokenHeader := r.Header.Get("Authorization")
	
	if tokenHeader == "" {
		response = u.Message(false, "Missing auth token")
		w.Header().Add("Content-Type", "application/json")
		u.Respond(w, http.StatusForbidden, response)
		return
	}
	
	splitted := strings.Split(tokenHeader, " ")
	if len(splitted) != 2 {
		response = u.Message(false, "Invalid/Malformed auth token")
		w.Header().Add("Content-Type", "application/json")
		u.Respond(w, http.StatusForbidden, response)
		return
	}
	
	tokenPart := splitted[1] //Grab the token part, what we are truly interested in
	tk := &models.Token{}
	
	token, err := jwt.ParseWithClaims(tokenPart, tk, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("token_password")), nil
	})
	
	if err != nil { //Malformed token, returns with http code 403 as usual
		response = u.Message(false, "Malformed authentication token")
		w.Header().Add("Content-Type", "application/json")
		if err == jwt.ErrSignatureInvalid {
			u.Respond(w, http.StatusUnauthorized, response)
		}else {
			u.Respond(w, http.StatusBadRequest, response)
		}
		return
	}
	
	if models.CheckRefreshToken(tk.Id) {
		
		if !token.Valid { //Token is invalid, maybe not signed on this server
			response = u.Message(false, "Token is not valid.")
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, http.StatusUnauthorized, response)
			return
		}
		
		if time.Unix(tk.ExpiresAt, 0).Sub(time.Now()) > 5*time.Minute {
			response = u.Message(false, "token is still valid")
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, http.StatusBadRequest, response)
			return
		}
		
		expirationTime := time.Now().Add(60 * time.Minute)
		tk.ExpiresAt = expirationTime.Unix()
		tk.Id = token.Claims.(*models.Token).StandardClaims.Id
		tkn := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
		tokenString, err := tkn.SignedString([]byte(os.Getenv("token_password")))
		if err != nil {
			response = u.Message(false, "server error")
			w.Header().Add("Content-Type", "application/json")
			u.Respond(w, http.StatusInternalServerError, response)
			return
		}
		
		response = u.Message(true, "token has been refreshed")
		response["token"] = tokenString
		u.Respond(w, 200, response)
	} else {
		w.Header().Add("Content-Type", "application/json")
		u.Respond(w, http.StatusUnauthorized, u.Message(false, "Refresh token has been revoked!"))
	}
}