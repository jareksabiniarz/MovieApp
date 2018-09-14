# MovieApp


MovieApp is a simple node.js express API database interacting with external API.

### Endpoints:

POST /movies:
- Request body contains only movie title, and its presence is validated.
- Based on passed title, other movie details are fetched from http://www.omdbapi.com/ and saved to application database.
- Request response includes full movie object, along with all data fetched from external API.

GET /movies:
- Fetches list of all movies already present in application database.
- Allows sorting movies by title using key "sort" and value "true".

POST /comments:
- Request body contains ID of movie already present in database, and comment text body.
- Comments are saved to application database and returned in request response.

GET /comments:
- Fetches list of all comments present in application database.
- Allows filtering comments by associated movie, by passing its ID as a value of key "movie".

### Installation

MovieApp requires [Node.js](https://nodejs.org/) v4+ and [MongoDB](https://www.mongodb.com/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd MovieApp
$ npm install 
$ node server
```


### Todos

 - Write MORE Tests


License
----

MIT
