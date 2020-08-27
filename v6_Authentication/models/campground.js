var mongoose = require('mongoose');

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

//databses MODELING
module.exports = mongoose.model("Campground", campgroundSchema);