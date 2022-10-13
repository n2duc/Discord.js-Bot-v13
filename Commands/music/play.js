const { QueryType } = require('discord-player');

module.exports = {
    name: 'play',
    aliases: ['p'],
    utilisation: '{prefix}play [song name/URL]',
    voiceChannel: true,

    run: async(client, message, args) => {
        message.channel.send("Nothing in here")
    },
};