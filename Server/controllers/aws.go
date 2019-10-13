package controllers

import (
	"Server/utils"
	"bytes"
	"fmt"
	"github.com/globalsign/mgo/bson"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

var Uploads = func(w http.ResponseWriter, r *http.Request) {
	maxSize := int64(4096000) // allow only 1MB of file size

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
			"AKIAQETU5M465K5VIRLW",                     // id
			"EU+aVa5eauHZdu9uZNs9dovDQ7pAv267ZRPJRcQH", // secret
			""), // token can be left blank for now
	})
	if err != nil {
		utils.Respond(w, utils.Message(false, "Could not upload file"))
		return
	}

	fileName, err := UploadFileToS3(s, file, fileHeader)
	if err != nil {
		utils.Respond(w, utils.Message(false, "Could not upload file"))
		return
	}


	utils.Respond(w, utils.Message(true, fmt.Sprintf("Image uploaded successfully: %s", fileName)))
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
