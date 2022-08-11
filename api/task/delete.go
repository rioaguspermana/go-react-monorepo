package task

import (
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/helper"
)

func Delete(c *gin.Context) {
	// get param id
	id := c.Param("id")

	// call func to delete data to db
	err := deleteTask(id)

	// check if function return error
	if err != nil {
		// return response error from delete db function
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		// return response success
		c.JSON(http.StatusOK, gin.H{"message": "task deleted"})
	}
}

func deleteTask(id string) error {
	// create query delete
	queryString := "DELETE FROM task WHERE id = ?"

	// run prepared statement with give query
	stmt, err := helper.Db.Prepare(queryString)

	// check if prepared statement return error
	if err != nil {
		return err
	}

	// make sure all statement close in the end of function
	defer stmt.Close()

	// execute the query statement
	_, err = stmt.Exec(id)

	// check if execution return error
	if err != nil {
		return err
	}

	// return expected value | default
	return nil
}
