const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'spank',
    category: 'reactions',
    aliases: ['tetdit', 'vodit'],
    usage: '[prefix]spank [tag/id người dùng]',
    descriptions: 'Tét ass thần chưởng !!',
    run: async (client, message, args) => {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        if(member.id === message.author.id) return message.reply ("Tét mông chính mình à, bựa quá");
        let robber = message.author;
        let searchEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({name: 'Đợi xíu nha, đừng có mà bựa ...', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/spank`)
        const data = await url.json()
        .then(data=> {

            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return searching.edit({embeds : [noData]})

            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({name: 'Reaction: Slap', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
            .setDescription(`${message.member.displayName} tét mông ${member.displayName} 50 cái`)
            .setImage(data.url)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}