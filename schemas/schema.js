const mongo = require('mongoose')

module.exports = mongo.model(
    'Monney',
    new mongo.Schema({
        id: String,
        coins: Number
    })
)