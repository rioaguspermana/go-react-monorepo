package employee

import (
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/helper"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/model"
)

func List(c *gin.Context) {
	// call func to get data from db
	list, err := getAllEmployee()

	// check if function return error
	if err != nil {
		// return response error from get list data function
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		// return response success with list data
		c.JSON(http.StatusOK, gin.H{"message": "employee list fetched", "list": list})
	}
}

func getAllEmployee() ([]*model.Employee, error) {
	// make empty list expected model
	list := make([]*model.Employee, 0)

	/*
	* prepare query select for all employee
	* we use * to get all column make sure cover all column in scan
	 */
	queryString := "SELECT * FROM employee"

	// run prepared statement
	rows, err := helper.Db.Query(queryString)

	// return when error occured in prepared statement execution
	if err != nil {
		return nil, err
	}

	// make sure all rows scan close in the end of function
	defer rows.Close()

	// loop for row
	for rows.Next() {
		// prepare variable for task model
		e := new(model.Employee)

		// scan all column in current row
		err := rows.Scan(&e.ID, &e.EmployeeName)

		// return error when scanning column
		if err != nil {
			return nil, err
		}

		// push data scanned to our list of task
		list = append(list, e)
	}

	// return expected value | default
	return list, nil
}
