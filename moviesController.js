//@ts-check
const router = require("express").Router();
const Movie = require("../models/movie");			//get movie model from db models directory
const axios = require("axios").default;

router.route('/')
    .get(async (req, res) => {	//ES6 arrow function expression
        let movies = null;		//create an empty variable to store movie
        try {
            if (req.query.sort && req.query.sort === 'true') movies = await Movie.find({}, null, { sort: { Title: 1 } }).populate("Comments").exec();	//sort movies from db by title
            else movies = await Movie.find({}).populate("Comments").exec();		//present movies from db by id if sorting not required
            res.status(200).json(movies);			//fetch list of all movies already present in app db in json format instead of an array
        } catch (exception) {
            console.log(exception);
            res.status(500).json("Internal server error");		//other error
        }
    })
    .post(async (req, res) => {
        if (!req.body.title) res.status(400).json({ message: "Movie title is required" });		//presence of movie title is validated
        let title = req.body.title;																//get title from request
        let movie = (await axios.get("http://www.omdbapi.com/?apikey=7408f029&t=" + title)).data;	//get movie from external db
        let saved = await Movie.create(movie);														//create new inctance movie in our app db model 'Movie'
        res.status(200).json(saved);		//returns just saved new instance
    });

module.exports = router;