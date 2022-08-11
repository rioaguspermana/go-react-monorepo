
# go-react-monorepo

Go app with Gin and SQLite + React typescript with tailwind, which can easily be deployed to Heroku.


## Preparation Running Locally

Make sure you have [Go](http://golang.org/doc/install) version 1.17 or newer, the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed, gcc compiler for SQLite and NodeJS for react.

## Run Backend

1. Make sure env in root folder have `APPS_MODE` is set to `development`
2. Run `go run .` to start backend Go, Your app should now be running on [localhost:11001](http://localhost:11001).

note: You can change the port in `.env` in root folder.

```sh
REPEAT=10
APPS_MODE=development
APPS_PORT=11001
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```sh
$ heroku create
$ git push heroku main
$ heroku open
```

or

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


## Documentation

For more information about using Go on Heroku, see these Dev Center articles:

- [Go on Heroku](https://devcenter.heroku.com/categories/go)
