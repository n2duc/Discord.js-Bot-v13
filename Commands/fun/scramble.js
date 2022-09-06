const { array } = require('i/lib/util')

module.exports = {
    name: "scramble",
    description: "Random Scramble Rubik",
    category: 'fun',
    aliases: ['scr', 'traorubik', 'rubik'],

    run: async(client, message, args) => {
        const directions = [
            ["D", "U"],
            ["R", "L"],
            ["F", "B"]
        ]

        const icons = ["🟥", "🟧", "🟨", "🟦", "🟩", "⬜"]
        const randomIcon = icons[~~(Math.random()* icons.length)]

        const times = ["", "'", "2"]
        const random = (array, exclude) => {
            do {
                var n = Math.floor(Math.random() * array.length)
            } while (array[n] === exclude)
            return array[n]
        }
    
        const scramble = new Array(20);
        var direction;
        for(var i=0; i<scramble.length; i++) {
            direction = random(directions, direction)
            scramble[i] = random(direction) + random(times)
        }

        message.channel.send(`${randomIcon} Your Scramble: **${scramble.join("  ")}**`)
    }
}