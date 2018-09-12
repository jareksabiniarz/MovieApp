//@ts-check
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a new schema- structure of data object
let commentSchema = new Schema({
	//referres to Movie model
    Movie: { type: Schema.Types.ObjectId, ref: "Movie" },	
    Text: String
});

//create a new model called 'Comment' according to commentSchema
module.exports = mongoose.model('Comment', commentSchema);	