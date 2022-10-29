const { Canvas } = require('canvacord');
const { MessageAttachment } = require('discord.js')

module.exports = {
    name: "trigger",
    category: "reactions",
    description: "Triggererrreerere",
    usage: "[@tag]",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' })
        const image = await Canvas.trigger(avatar)

        const attachment = new MessageAttachment(image, "trigger.gif")

        message.channel.send({ files: [attachment]})
    }
}