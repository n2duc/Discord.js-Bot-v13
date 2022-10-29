const Canvacord = require('canvacord');
const { MessageAttachment } = require('discord.js')
module.exports = {
    name: "trigger",
    category: "reactions",
    description: "Triggererrreerere",
    usage: "trigger [@tag]",
    run: async (client, message, args) => {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await Canvacord.Canvas.trigger(avatar);
        let attachment = new MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
}