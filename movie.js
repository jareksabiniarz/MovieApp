//@ts-check
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = new Schema({		//create a new schema - structure of data object
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Poster: String,
    Ratings: [{ Source: String, Value: String }],
    Metascore: Number,
    imdbRating: Number,
    imdbVotes: String,
    imdbID: String,
    Type: String,
    DVD: Date,
    BoxOffice: String,
    Production: String,
    Website: String,
    Response: String,
    Comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]	//refferes to Comment model
});

module.exports = mongoose.model('Movie', movieSchema);		//create a new model called 'Movie' according to movieSchema