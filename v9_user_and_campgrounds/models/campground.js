var mongoose = require('mongoose');

//SCHEMA setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

//databses MODELING
module.exports = mongoose.model("Campground", campgroundSchema);