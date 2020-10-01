let mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId();

let postSchema = new mongoose.Schema({
    username: {type: String},
    handle: {type: String},
    date: {type: Date, default: Date.now},
    text: {type: String},
    likes: {type: Number, default: 0},
    comments: {type: Number, default: 0}
})

module.exports = mongoose.model('Post', postSchema);