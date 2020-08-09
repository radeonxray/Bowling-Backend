var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bowlingpoints= new Schema({
    token: String,
    points: [[Number]],
    result: [Number],
})



module.exports = mongoose.model('bowlingpoints', bowlingpoints);