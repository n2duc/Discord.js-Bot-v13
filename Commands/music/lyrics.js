const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'lyrics',
    category: 'music',
    aliases: ["lr"],
    usage: '[prefix]lyrics [Tên bài hát]',
    descriptions: 'Hiển thị lời bài hát theo tên bài hát',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(args.join(' '))}`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let lEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor({name: `📻 Lyrics: ${data.title}`})
                .setTitle(`**Title**: ${data.title}\n**Author**: ${data.artist}`)
                .setThumbnail(data.image)
                .setDescription(`**Lyrics**:\n${data.lyrics}`)
                .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 })})

        msg.edit({ content:'\u200b',embeds: [lEmbed] });
    }
}