const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'feed',
    category: 'reactions',
    aliases: ['dutan', 'an'],
    usage: '[prefix]feed [tag/id người dùng]',
    descriptions: 'Đút nhau ăn có gì là sai ??',
    run: async (client, message, args) => {
        const member = message.mentions.members.first()|| message.guild.members.cache.get(args[0]) || message.member
        if(member.id === message.author.id) return message.reply ("Xin lỗi, chúng tôi cần là cơm chó chứ không phải ăn một mình");
        let robber = message.author;
        let searchEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({name: 'Đợi xíu nha, đừng có mà bựa ...', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
        let searching = await message.channel.send({embeds: [searchEmbed]})

        const url = await fetch(`https://nekos.life/api/v2/img/feed`)
        const data = await url.json()
        .then(data=> {

            const noData = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Có lỗi xảy ra trong quá trình tìm ảnh!`)
            if(!data) return searching.edit({embeds : [noData]})

            const imageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor({name: 'Reaction: Feed', iconURL: `${client.user.displayAvatarURL({ size: 1024, dynamic: true })}`})
            .setDescription(`${message.member.displayName} đã đút cho ${member.displayName} ăn 😋`)
            .setImage(data.url)
            
            return searching.edit({embeds: [imageEmbed]})
        })
    }
}