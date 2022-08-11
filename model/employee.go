package model

type Employee struct {
	ID           *int    `json:"id" db:"id"`
	EmployeeName *string `json:"employee_name" db:"employee_name"`
}
