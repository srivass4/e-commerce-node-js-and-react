const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

module.exports = mongoose.model('users', userSchema);