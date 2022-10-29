
const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const { stripIndent } = require('common-tags')

module.exports = {
    name: 'instagram',
    category: 'info',
    description: 'Xem thông tin Instagram của một ai đó.',
    aliases: ['instagram', 'ig', 'insta'],
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Vui lòng nhập tên instagram!');
        const instagram_id = args.join(' ');
        const url = `https://www.instagram.com/${instagram_id}/?__a=1`
        let res;
        try {
            res = await axios.get(url, { headers: { cookie: process.env.INSTAGRAM_COOKIE }})
            const account = res.data.graphql.user;
            const embed = new MessageEmbed()
                .setColor('BLURPLE')
                .setTitle(account.full_name)
                .setURL(`https://www.instagram.com/${instagram_id}/`)
                .setThumbnail(account.profile_pic_url_hd)
                .addFields("Thông tin cá nhân", stripIndent `**- Tên người dùng:** ${account.username}
                **- Tên đầy đủ: ** ${account.full_name}
                **- Bio:** ${account.biography.length == 0 ? "Không có" : account.biography}
                **- Số bài đăng:** ${account.edge_owner_to_timeline_media.count}
                **- Followers:** ${account.edge_followed_by.count}
                **- Following:** ${account.edge_follow.count}
                **- Private?:** ${account.is_private ? "Có 🔐" : "Không 🔓"}`)
                .setFooter({ text: `Yêu cầu bởi ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
    
            message.channel.send({ embeds: [embed] });
        } catch (e) {
            return message.channel.send('Tên Instagram không hợp lệ! (Hệ thống đang bị lỗi)');
        }
    }
}