let mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    username: {type: String},
    handle: {type: String},
    date: {type: Date, default: Date.now},
    text: {type: String},
    likes: {type: Number}
})

module.exports = mongoose.model('Comment', commentSchema);