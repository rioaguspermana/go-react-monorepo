package employee

import (
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/helper"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/model"
)

func Create(c *gin.Context) {
	// initialize var with expected struct
	employee := &model.Employee{}

	// call BindJSON to bind the received JSON data correctly.
	if err := c.BindJSON(&employee); err != nil {
		// return error with invalid request format or fail in validation
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		// call func to create data to db
		id, err := createEmployee(employee)

		// check if function return error
		if err != nil {
			// return response error from create db function
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		} else {
			// return response success
			c.JSON(http.StatusOK, gin.H{"message": "employee saved", "id": id})
		}
	}
}

func createEmployee(employee *model.Employee) (*int, error) {
	// create query insert
	queryString := "INSERT INTO employee(employee_name) VALUES (?) RETURNING id"

	// run prepared statement with give query
	stmt, err := helper.Db.Prepare(queryString)

	// check if prepared statement return error
	if err != nil {
		return nil, err
	}

	// make sure all statement close in the end of function
	defer stmt.Close()

	// prepare return id
	var id *int

	// execute the query statement
	err = stmt.QueryRow(employee.EmployeeName).Scan(&id)

	// check if execution return error
	if err != nil {
		return nil, err
	}

	// return expected value | default
	return id, nil
}
