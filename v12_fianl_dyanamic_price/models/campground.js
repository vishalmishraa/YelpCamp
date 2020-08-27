var mongoose = require('mongoose'),
    Comment = require('./comment');

//SCHEMA setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
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

campgroundSchema.pre('remove', async function() {
    await Comment.remove({
        _id: {
            $in: this.comments
        }
    });
});



//databses MODELING
module.exports = mongoose.model("Campground", campgroundSchema);