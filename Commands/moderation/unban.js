const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'unban',
    category: 'moderation',
    descriptions: 'Rút lại lời phán xét của Chúa',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('Bạn không có quyền unban người khác!');

        const id = args[0]
        if (!id) return message.reply('Vui lòng cung cấp ID người muốn Unban!')
        if (isNaN(id)) return message.reply('ID người dùng là một con số!')

        const bannedMembers = await message.guild.bans.fetch()
        if (!bannedMembers.find((user) => user.user.id === id)) return message.reply('Người này không bị ban!')

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle('DANGER')
                .setCustomId('kickyes')
                .setLabel('Yes'),
            new MessageButton()
                .setStyle('PRIMARY')
                .setCustomId('kickno')
                .setLabel('No')
        )

        let kickAskEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription('**🛑 - Bạn thực sự muốn unban người này !**')

        let kickEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('🛑 Lệnh UNBAN')
            .setDescription(`**${id}** đã được unban
            **- Người unban:** ${message.member} (${message.member.id})`)
            .setTimestamp()
        let kickEmbed2 = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Đã hủy **unban**!`)

        const kickPage = await message.reply({ embeds: [kickAskEmbed], components: [row]})
        const col = await kickPage.createMessageComponentCollector({
            componentType: "BUTTON",
            time: ms('10s')
        })
        
        try {
            col.on('collect', i => {
                if (i.user.id !== message.author.id) return
                if (i.customId === 'kickyes') {
                    message.guild.members.unban(id)
                    kickPage.edit({ embeds: [kickEmbed], components: [] })
                } else if (i.customId === 'kickno') {
                    kickPage.edit({ embeds: [kickEmbed2], components: [] })
                }
            })
        } catch(err) {
            message.reply('Có lỗi khi UnBan!')
            console.error(err)
        }
    },
};  