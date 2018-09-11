//@ts-check
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({		// create a new schema- structure of data object
    Movie: { type: Schema.Types.ObjectId, ref: "Movie" },	//referres to Movie model
    Text: String
});

module.exports = mongoose.model('Comment', commentSchema);	//create a new model called 'Comment' according to commentSchema