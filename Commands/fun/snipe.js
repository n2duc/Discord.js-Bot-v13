const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'snipe',
    description: 'Xem lại tin nhắn vừa bị xóa.',
    category: 'fun',
    aliases: ['snipe', 'sp'],
    run: async(client, message, args) => {
        const msg = client.snipes.get(message.channel.id) || [];
        if (!msg) return message.channel.send('Không tìm thấy tin nhắn nào!')

        const embed = new MessageEmbed()
            .setAuthor({ name: `Người gửi:${msg.author.tag}`, iconURL: msg.author.avatarURL({ dynamic: true }) })
            .setColor('GREEN')
            .setDescription(msg.content)
            .setTimestamp()
            .setFooter({ text: message.guild.name })
        if (msg.image) embed.setImage(msg.image)
        message.react('🚀')
        message.channel.send({ embeds: [embed] });
    }
}