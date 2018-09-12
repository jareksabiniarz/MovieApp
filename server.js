// @ts-check								
const express = require("express");
//set up express app
const app = express();						
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//import of commentsController
const commentsController = require("./controllers/commentsController");	
//import of moviesController
const moviesController = require("./controllers/moviesController");
//import of middleware		
const {parseQueryCaseInsensitive}  = require("./middleware");
			
//connect to mongodb
mongoose.connect("mongodb://localhost:27017/moviedb", { useNewUrlParser: true });	

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialize routes
app.use(parseQueryCaseInsensitive());
app.use('/movies', moviesController);
app.use('/comments', commentsController);

app.listen(3000, () => console.log("Server listening on port 3000!"));


