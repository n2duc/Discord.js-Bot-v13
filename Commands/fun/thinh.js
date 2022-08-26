const array = require('../../thinh.json').data

module.exports = {
    name: 'thinh',
    descriptions: 'Thính bay lung tung <3',
    category: 'fun',

    run: async(client, message, args) => {
        const random = array[~~(Math.random() * array.length)];

        return message.channel.send(random)
    }
}