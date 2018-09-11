// @ts-check								
const express = require("express");
const app = express();						//set up express app
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const commentsController = require("./controllers/commentsController");	//import of commentsController
const moviesController = require("./controllers/moviesController");		//import of moviesController
const {parseQueryCaseInsensitive}  = require("./middleware");			//import of middleware

mongoose.connect("mongodb://localhost:27017/moviedb", { useNewUrlParser: true });	//connect to mongodb

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialize routes
app.use(parseQueryCaseInsensitive());
app.use('/movies', moviesController);
app.use('/comments', commentsController);

app.listen(3000, () => console.log("Server listening on port 3000!"));


