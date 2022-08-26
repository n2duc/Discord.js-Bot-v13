const randomPuppy = require('random-puppy')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "meme",
    description: "Những meme chất lượng như con cặc",
    category: 'fun',
    aliases: ['mm', 'meme'],

    run: async(client, message, args) => {
        const subReddits = ["meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)

        const embed = new MessageEmbed()
            .setColor('BLURPLE')
            .setImage(img)
            .setTitle(`Xem thêm ${random}:`)
            .setURL(`https://reddit.com/r/${random}`)

        message.channel.send({ embeds: [embed] });
    }
}