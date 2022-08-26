const Discord = require('discord.js')

module.exports = {
    name: 'emo',
    description: 'Thêm emmo vào server.',
    usage: '<emoji>',
    category: 'info',
    run: async(client, message, args) => {
        if (!args.length) return message.channel.send('Vui lòng để emoji nào đó vào để thêm vào server!')

        for (const emojis of args) {
            const getEmoji = Discord.Util.parseEmoji(emojis);

            if (getEmoji.id) {
                const emojiExit = getEmoji.animated ? ".gif" : ".png";
                const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExit}`;
                message.guild.emojis.create(emojiURL, getEmoji.name).then(emoji =>
                    message.channel.send(`Đã thêm emoji ${emoji.name} vào \`${message.guild.name}\``))
            }
        }
    }
}