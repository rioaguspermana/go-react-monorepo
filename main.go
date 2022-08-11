package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
	"github.com/joho/godotenv"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/api"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/api/employee"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/api/task"
)

func main() {
	// load env file
	err := godotenv.Load(".env")

	// return error when file env not found
	if err != nil {
		fmt.Println(err.Error())
	}

	// set router
	router := SetRoute()

	// initialize port variable
	var port string

	// run apps to given port
	if os.Getenv("APPS_MODE") == "production" {
		// this is default set by heroku
		// we don't need to set in our env
		port = os.Getenv("PORT")
	} else {
		// in deploy heroku we can't set env with PORT variable
		// we use another parameter name env to set when in local
		port = os.Getenv("APPS_PORT")
	}

	// make sure port is not empty
	if port == "" {
		log.Fatal("$PORT must be set")
	}

	// run in port given
	router.Run(":" + port)
}

func SetRoute() *gin.Engine {
	// set gin to release mode
	gin.SetMode(gin.ReleaseMode)

	// set defauit engine and instance from gin
	router := gin.Default()

	// serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./web", true)))

	// serve all undefine route to out static web
	router.NoRoute(func(c *gin.Context) {
		c.File("./web")
	})

	// define group route /api
	_api := router.Group("/api")
	{
		// get /api/dashboard
		_api.GET("/dashboard", api.Dashboard)

		// define group route /api/employee
		_employee := _api.Group("/employee")
		{
			// get		/api/employee
			_employee.GET("/", employee.List)
			// get		/api/employee/:id
			_employee.GET("/:id", employee.Get)
			// post		/api/employee
			_employee.POST("/", employee.Create)
			// put		/api/employee/:id
			_employee.PUT("/:id", employee.Update)
			// delete	/api/employee/:id
			_employee.DELETE("/:id", employee.Delete)
		}

		// define group route /api/task
		_task := _api.Group("/task")
		{
			// get		/api/task
			_task.GET("/", task.List)
			// get		/api/task/:id
			_task.GET("/:id", task.Get)
			// post		/api/task
			_task.POST("/", task.Create)
			// put		/api/task/:id
			_task.PUT("/:id", task.Update)
			// delete	/api/task/:id
			_task.DELETE("/:id", task.Delete)
		}
	}

	router.NoRoute(func(c *gin.Context) {
		c.File("./web")
	})

	// return gin engine
	return router
}
