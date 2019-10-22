package controllers

import (
	"Server/models"
	"Server/utils"
	"bytes"
	"fmt"
	"github.com/globalsign/mgo/bson"
	"log"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

var Uploads = func(w http.ResponseWriter, r *http.Request) {
	maxSize := int64(1024000) // allow only 1MB of file size

	err := r.ParseMultipartForm(maxSize)
	if err != nil {
		log.Println(err)
		utils.Respond(w, utils.Message(false, fmt.Sprintf("Image too large. Max Size: %v %s", maxSize, err)))
		return
	}

	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		log.Println(err)
		utils.Respond(w, utils.Message(false, fmt.Sprintf("Could not get uploaded file %s",  err)))
		return
	}
	defer file.Close()

	// reused if we're uploading many files
	s, err := session.NewSession(&aws.Config{
		Region: aws.String("ap-southeast-1"),
		Endpoint: aws.String("s3.amazonaws.com"),
		Credentials: credentials.NewStaticCredentials(
			os.Getenv("access_key_id"),                     // id
			os.Getenv("secret_access_key"), // secret
			""), // token can be left blank for now
	})
	if err != nil {
		fmt.Println("1")
		utils.Respond(w, utils.Message(false, "Could not upload file"))
		return
	}

	fileName, err := UploadFileToS3(s, file, fileHeader)
	if err != nil {
		fmt.Println("2")
		utils.Respond(w, utils.Message(false, "Could not upload file"))
		return
	}

	link := "https://fileserverappfood.s3-ap-southeast-1.amazonaws.com/" + fileName
	user := r.Context().Value("user")
	account := &models.Account{}
	err = models.GetDB().Table("accounts").Where("id = ?", user).First(account).Error
	if err!=nil{
		utils.Respond(w, utils.Message(false, "connection error"))
		return
	}

	models.GetDB().Model(&account).Update("Avatar", link)
	fmt.Println(account)

	resp := utils.Message(true, fmt.Sprintf("Image uploaded successfully: %s", fileName))
	resp["link"] = link
	utils.Respond(w, resp)
}

func UploadFileToS3(s *session.Session, file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	// get the file size and read
	// the file content into a buffer
	size := fileHeader.Size
	buffer := make([]byte, size)
	file.Read(buffer)

	// create a unique file name for the file
	tempFileName := "profile-image-upload/" + bson.NewObjectId().Hex() + filepath.Ext(fileHeader.Filename)

	// config settings: this is where you choose the bucket,
	// filename, content-type and storage class of the file
	// you're uploading
	_, err := s3.New(s).PutObject(&s3.PutObjectInput{
		Bucket:        aws.String("fileserverappfood"),
		Key:           aws.String(tempFileName),
		ACL:           aws.String("public-read"), // could be private if you want it to be access by only authorized users
		Body:          bytes.NewReader(buffer),
		ContentLength: aws.Int64(int64(size)),
		ContentType:   aws.String(http.DetectContentType(buffer)),
		//ContentDisposition:   aws.String("profile-image-upload"),
		//ServerSideEncryption: aws.String("AES256"),
		//StorageClass:         aws.String("INTELLIGENT_TIERING"),
	})
	if err != nil {
		return "", err
	}

	return tempFileName, nil
}
