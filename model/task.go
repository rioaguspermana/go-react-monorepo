package model

type Task struct {
	ID         *int    `json:"id" db:"id"`
	TaskName   *string `json:"task_name" db:"task_name"`
	Deadline   *string `json:"deadline" db:"deadline"`
	Status     *string `json:"status" db:"status"`
	EmployeeId *int    `json:"employee_id" db:"employee_id"`
	// related table
	Employee Employee `json:"employee" db:"employee"`
}
