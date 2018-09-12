//@ts-check
const router = require("express").Router();
//get movie model from db models directory
const Movie = require("../models/movie");			
const axios = require("axios").default;

router.route('/')
    .get(async (req, res) => {	
	//create an empty variable to store movie
        let movies = null;		
        try {
	//sort movies from db by title
            if (req.query.sort && req.query.sort === 'true') movies = await Movie.find({}, null, { sort: { Title: 1 } }).populate("Comments").exec();
	//present movies from db by id if sorting not required
            else movies = await Movie.find({}).populate("Comments").exec();	
	//fetch list of all movies already present in app db in json format instead of an array
            res.status(200).json(movies);			
        } catch (exception) {
            console.log(exception);
	//other error
            res.status(500).json("Internal server error");		
        }
    })
    .post(async (req, res) => {
	//presence of movie title is validated
        if (!req.body.title) res.status(400).json({ message: "Movie title is required" });
	//get title from request		
        let title = req.body.title;
	//get movie from external api		
        let movie = (await axios.get("http://www.omdbapi.com/?apikey=7408f029&t=" + title)).data;
	//create new inctance movie in our app db model 'Movie'		
        let saved = await Movie.create(movie);
	//returns just saved new instance		
        res.status(200).json(saved);		
    });

module.exports = router;
