//@ts-check
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create a new schema - structure of data object
let movieSchema = new Schema({		
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
//refferes to Comment model
    Comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]	
});

//create a new model called 'Movie' according to movieSchema
module.exports = mongoose.model('Movie', movieSchema);		
