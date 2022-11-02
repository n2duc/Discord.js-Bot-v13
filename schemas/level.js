const mongo = require('mongoose')

module.exports = mongo.model(
    'level',
    new mongo.Schema({
        Guild: String,
        User: String,
        XP: Number,
        Level: Number
    })
)