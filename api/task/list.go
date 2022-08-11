package task

import (
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/helper"
	"github.com/rioaguspermana/go-tugas-rioaguspermana/model"
)

func List(c *gin.Context) {
	// call func to get data from db
	list, err := getAllTask()

	// check if function return error
	if err != nil {
		// return response error from get list data function
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	} else {
		// return response success with list data
		c.JSON(http.StatusOK, gin.H{"message": "task list fetched", "list": list})
	}
}

func getAllTask() ([]*model.Task, error) {
	// make empty list expected model
	list := make([]*model.Task, 0)

	/*
	* prepare query select for all task
	* not using * we need spesific get column
	 */
	queryString := `SELECT *
		FROM task AS t 
		LEFT JOIN employee AS e ON t.employee_id = e.id`

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
		t := new(model.Task)

		// scan all column in current row
		err := rows.Scan(&t.ID, &t.TaskName, &t.Deadline, &t.Status, &t.EmployeeId, &t.Employee.ID, &t.Employee.EmployeeName)

		// return error when scanning column
		if err != nil {
			return nil, err
		}

		// push data scanned to our list of task
		list = append(list, t)
	}

	// return expected value
	return list, nil
}
