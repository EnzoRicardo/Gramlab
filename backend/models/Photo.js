const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");
const {Schema} = moongose;

const photoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
}, {
    timestamps: true
});

const Photo = moongose.model("Photo", photoSchema);

module.exports = Photo;