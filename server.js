// @ts-check								
const express = require("express");
//set up express app
const app = express();						
const mongoose = require("mongoose");
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/moviedb';
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
//import of commentsController
const commentsController = require("./controllers/commentsController");	
//import of moviesController
const moviesController = require("./controllers/moviesController");
//import of middleware		
const {parseQueryCaseInsensitive}  = require("./middleware");
			
//connect to mongodb
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true });	

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialize routes
app.use(parseQueryCaseInsensitive());
app.use('/movies', moviesController);
app.use('/comments', commentsController);

app.listen(PORT, () => console.log("Server listening on port ${PORT}!"));


