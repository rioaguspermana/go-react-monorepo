
# go-react-monorepo

Go app with Gin and SQLite + React typescript with tailwind, which can easily be deployed to Heroku.


## Preparation Running Locally

Make sure you have [Go](http://golang.org/doc/install) version 1.17 or newer, the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed, gcc compiler for SQLite and NodeJS for react.

## Preparation & Run Backend

1. Make sure env in root folder have `APPS_MODE` is set to `development`.
2. Run `go run .` in your terminal (make sure your terminal in current go project folder) to start backend Go.
3. Your app should now be running on [localhost:11001](http://localhost:11001).

note: You can change the port in `.env` in root folder.

```env
REPEAT=10
APPS_MODE=development
APPS_PORT=11001
```

## Preparation & Run Frontend

1. Open terminal in frontend project folder `cd frontend` (assumption: your terminal in root go project).
2. Install npm package for our frontend project `npm i` or `npm install`.
3. Run frontend with `npm run start`.
3. Your app should now be running on [localhost:12001](http://localhost:12001/).

note: your frontend is send request to golang backend via proxy, if you change your backend port you need to update the proxy in the frontend `package.json`.

```json
{
  ...
  "proxy": "http://localhost:11001",
  ...
}
```


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
