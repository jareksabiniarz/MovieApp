//@ts-check
const router = require("express").Router();
const Movie = require("../models/movie");		//get movie model from db moddels directory
const Comment = require("../models/comment");	//get comment model from db models directory

router.route("/")
    .get(async (req, res) => {
        let movie = req.query.movie;		//get movie from req
        let comments = null;				//create an empty variable
        if (movie) comments = await Comment.find({ Movie: movie }).populate("Movie").exec();	//parse Comment model to find movie, if movie's id is given
        else comments = await Comment.find({}).populate("Movie").exec();	//if movie's id is not given fetch list of all comments present in app db
        res.status(200).json(comments);		//returns all comments of the movie in json format instead of an array
    })
    .post(async (req, res) => {
        let movieId = req.body.movie;		//get movieId from req
        if (!movieId) res.status(400).json({ message: "Movie param is required!" })	//bad request
        let text = req.body.text;			//get text of comment from req
        if (!text) res.status(400).json({ message: "Text param is required!" })	//bad request
        let movie = null;					//create an empty variable for movie
        try {
            movie = await Movie.findById(movieId);								//find in Movie model 
            let saved = await Comment.create({ Movie: movie, Text: text });		//create new instance in Comment model and assigning values from requests to Movie and Text properties
            res.status(200).json(saved);		//returns just saved comment
        } catch (exception) {
            console.log(exception);
            if (!movie) res.status(404).json({ message: "Movie was not found" });	//there's no such movie in app db
            else res.status(500).json({ message: "Internal server error" });		//other error
        }
    });

module.exports = router;