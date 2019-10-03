package main
import(
	"fmt"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"Server/app"
	"Server/controllers"
	"net/http"
	"os"
)


func main(){
	router := mux.NewRouter()

	router.HandleFunc("api/user/new", controllers.CreateAccount).Methods("POST")

	router.Use(app.JwtAuthentication)

	port:= os.Getenv("PORT")
	if port == "" {
		port = ":9000"
	}
	fmt.Println(port)

	err := http.ListenAndServe(port, router)
	if err!=nil {
		fmt.Print(err)
	}
}