package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/helper"
)

type DashboardDetail struct {
	TotalEmployee       int `json:"total_employee"`
	TotalTask           int `json:"total_task"`
	TotalTaskCompleted  int `json:"total_task_completed"`
	TotalTaskIncomplete int `json:"total_task_incomplete"`
}

func Dashboard(c *gin.Context) {
	detail, err := GetDashboardDetail()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "dashboard fetched", "detail": detail})
	}
}

func GetDashboardDetail() (*DashboardDetail, error) {
	var dd DashboardDetail

	// count employee
	queryString := `SELECT COUNT(id) AS total_employee FROM employee;`
	err := helper.Db.QueryRow(queryString).Scan(&dd.TotalEmployee)
	if err != nil {
		return nil, err
	}

	// count task
	queryString = `SELECT COUNT(id) AS total_task FROM task;`
	err = helper.Db.QueryRow(queryString).Scan(&dd.TotalTask)
	if err != nil {
		return nil, err
	}

	// count task completed
	queryString = `SELECT COUNT(id) AS total_task FROM task WHERE status="true";`
	err = helper.Db.QueryRow(queryString).Scan(&dd.TotalTaskCompleted)
	if err != nil {
		return nil, err
	}

	// count task incomplete
	queryString = `SELECT COUNT(id) AS total_task FROM task WHERE status="false";`
	err = helper.Db.QueryRow(queryString).Scan(&dd.TotalTaskIncomplete)
	if err != nil {
		return nil, err
	}

	// return
	return &dd, nil
}
