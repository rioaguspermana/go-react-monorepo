package task

import (
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/helper"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/model"
)

func Update(c *gin.Context) {
	// get param id
	id := c.Param("id")

	// initialize var with expected struct
	task := &model.Task{}

	// call BindJSON to bind the received JSON data correctly.
	if err := c.BindJSON(&task); err != nil {
		// return error with invalid request format or fail in validation
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		// call func to update data to db
		err := updateTask(task, id)

		// check if function return error
		if err != nil {
			// return response error from update db function
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		} else {
			// return response success
			c.JSON(http.StatusOK, gin.H{"message": "task updated"})
		}
	}
}

func updateTask(task *model.Task, id string) error {
	// create query update
	queryString := "UPDATE task SET task_name = ?, deadline = ?, status = ?, employee_id = ? WHERE id = ?"

	// run prepared statement with give query
	stmt, err := helper.Db.Prepare(queryString)

	// check if prepared statement return error
	if err != nil {
		return err
	}

	// make sure all statement close in the end of function
	defer stmt.Close()

	// execute the query statement
	_, err = stmt.Exec(task.TaskName, task.Deadline, task.Status, task.EmployeeId, id)

	// check if execution return error
	if err != nil {
		return err
	}

	// return expected value | default
	return nil
}
