package helper

import (
	"database/sql"
	"log"
)

// var db connection
var Db = openConnectionDB()

// set connetionn function
func openConnectionDB() *sql.DB {
	// initialize variable local db function
	var db *sql.DB

	// set db file
	const dbFile string = "go-tugas.db"

	// open connection to sql
	db, err := sql.Open("sqlite3", dbFile)

	// check error in connection
	if err != nil {
		log.Fatal("Invalid DB config:", err)
	}

	// return opened db connection
	return db
}
