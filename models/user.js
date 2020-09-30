let mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

let userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    handle: String,
    email: String,
    username: {type: String},
    password: {type: String}
})

module.exports = mongoose.model('User', userSchema);