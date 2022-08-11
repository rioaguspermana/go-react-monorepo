package task

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/helper"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/model"
)

func Get(c *gin.Context) {
	// get param id
	id := c.Param("id")

	// call func to get data from db
	row, err := getTask(id)

	// check if function return error
	if err != nil {
		// return response error from get list data function
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		// return response success with list data
		c.JSON(http.StatusOK, gin.H{"message": "task fetched", "row": row})
	}
}

func getTask(id string) (*model.Task, error) {
	// define expected model
	var task model.Task

	// create query select
	queryString := `SELECT *
		FROM task AS t 
		LEFT JOIN employee AS e ON t.employee_id = e.id
		WHERE t.id = ?`

	// run prepared statement with give query
	stmt, err := helper.Db.Prepare(queryString)

	// check if prepared statement return error
	if err != nil {
		return nil, err
	}

	// make sure all statement close in the end of function
	defer stmt.Close()

	// execute the query statement
	err = stmt.QueryRow(id).Scan(&task.ID, &task.TaskName, &task.Deadline, &task.Status, &task.EmployeeId, &task.Employee.ID, &task.Employee.EmployeeName)

	// check if execution return error
	if err != nil {
		// if the error empty we return as custom error
		if err == sql.ErrNoRows {
			return nil, errors.New("data not found")
		}

		// default return error
		return nil, err
	}

	// return expected value | default
	return &task, nil
}
