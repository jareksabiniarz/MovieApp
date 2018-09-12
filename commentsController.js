//@ts-check
const router = require("express").Router();
//get movie model from db moddels directory
const Movie = require("../models/movie");
//get comment model from db models directory		
const Comment = require("../models/comment");	

router.route("/")
    .get(async (req, res) => {
		//get movie from req
        let movie = req.query.movie;
		//create an empty variable		
        let comments = null;
		//parse Comment model to find movie, if movie's id is given
        if (movie) comments = await Comment.find({ Movie: movie }).populate("Movie").exec();
		//if movie's id is not given fetch list of all comments present in app db
        else comments = await Comment.find({}).populate("Movie").exec();
		//returns all comments of the movie in json format instead of an array
        res.status(200).json(comments);		
    })
    .post(async (req, res) => {
		//get movieId from req
        let movieId = req.body.movie;
		//bad request
        if (!movieId) res.status(400).json({ message: "Movie param is required!" })
		//get text of comment from req
        let text = req.body.text;
		//bad request
        if (!text) res.status(400).json({ message: "Text param is required!" })	
		//create an empty variable for movie
        let movie = null;					
        try {
			//find in Movie model
            movie = await Movie.findById(movieId);
			//create new instance in Comment model and assigning values from requests to Movie and Text properties
            let saved = await Comment.create({ Movie: movie, Text: text });
			//returns just saved comment
            res.status(200).json(saved);		
        } catch (exception) {
            console.log(exception);
			//there's no such movie in app db
            if (!movie) res.status(404).json({ message: "Movie was not found" });	
            else res.status(500).json({ message: "Internal server error" });		
        }
    });

module.exports = router;