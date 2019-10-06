package controllers

import (
	"bytes"
	"fmt"
	"mime/quotedprintable"
	"net/smtp"
	"strings"
)

const (
	SMTPServer = "smtp.gmail.com"
)

type Sender struct{
	User string
	Password string
}

func NewSender(Username, Password string) Sender{
	return Sender{User: Username, Password: Password}
}

func (sender Sender) SendMail(Dest []string, Subject, bodyMessage string) (bool, string) {
	msg := "From: " + sender.User + "\n" +
		"To: " + strings.Join(Dest, ",") + "\n" +
		"Subject: " + Subject + "\n" + bodyMessage

	err := smtp.SendMail(SMTPServer+":587",
		smtp.PlainAuth("", sender.User, sender.Password, SMTPServer),
		sender.User, Dest, []byte(msg))

	if err != nil {
		return false, err.Error()
	}
	return true, "Mail sent successfully!"
}

func (sender Sender) WriteEmail(dest []string, contentType, subject, bodyMessage string) string{
	header := make(map[string]string)
	header["From"] = sender.User

	receipient := ""

	for _, user := range dest {
		receipient = receipient + user
	}

	header["To"] = receipient
	header["Subject"] = subject
	header["MIME-version"] = "1.0"
	header["Content-Type"] = fmt.Sprintf("%s; charset=\"utf-8\"", contentType)
	header["Content-Transfer-Encoding"] = "quoted-printable"
	header["Content-Disposition"] = "inline"

	message := ""

	for key, value := range header{
		message += fmt.Sprintf("%s: %s\r\n", key, value)
	}

	var encodeMessage bytes.Buffer

	finalMessage := quotedprintable.NewWriter(&encodeMessage)
	finalMessage.Write([]byte(bodyMessage))
	finalMessage.Close()
	message += "\r\n" + encodeMessage.String()

	return message
}

func (sender *Sender) WriteHTMLEmail(dest []string, subject, bodyMessage string) string {

	return sender.WriteEmail(dest, "text/html", subject, bodyMessage)
}

func (sender *Sender) WritePlainEmail(dest []string, subject, bodyMessage string) string {

	return sender.WriteEmail(dest, "text/plain", subject, bodyMessage)
}

func email(receivers string, code string) (bool, string){
	sender := NewSender("danghungdao1997@gmail.com", "danghungdao")

	Receiver := []string{receivers}

	Subject := "Verify accounts"
	message := fmt.Sprintf(`
	<!DOCTYPE HTML PULBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
	<html>
	<head>
	<meta http-equiv="content-type" content="text/html"; charset=ISO-8859-1">
	</head>
	<body>testtttttttttttttt<br>
	hello guy, your code is %s <br>
	<div class="moz-signature"><i><br>
	<br>
	Regards<br>
	my app<br>
	<i></div>
	</body>
	</html>
	`, code)

	bodyMessage := sender.WriteHTMLEmail(Receiver, Subject, message)

	return sender.SendMail(Receiver, Subject, bodyMessage)
}