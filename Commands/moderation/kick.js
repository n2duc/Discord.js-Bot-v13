const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'kick',
    category: 'moderation',
    descriptions: 'Cho đứa nào đó cút tạm thời khỏi nơi đây',
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("Vui lòng tag người nào đó để kick")

        if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('Bạn không có quyền kick người khác!');
        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!toKick) return message.reply('Không tìm thấy người cần kick, vui lòng thử lại.');
        if (toKick.id == message.author.id) return message.reply('Bạn không thể kick chính mình!');

        if (message.member.roles.highest.position <= toKick.roles.highest.position) {
            return message.reply("Bạn không thể kick người có role bằng hoặc cao hơn mình !!")
        }
        if (message.guild.me.roles.highest.position <= toKick.roles.highest.position) {
            return message.reply("Tôi không thể kick người có role bằng hoặc cao hơn mình !!")
        }
        let reason = args.slice(1).join(' ');
        if (!args[1]) {
            reason = "Không có lý do."
        }

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
            .setDescription('**🛑 - Bạn thực sự muốn kick người này !**')

        let kickEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('🛑 Lệnh Kick')
            .setThumbnail(toKick.user.displayAvatarURL({dynamic: true}))
            .setDescription(`${toKick} (${toKick.id}) đã bị cho cút khỏi nơi này
            **- Người kick:** ${message.member} (${message.member.id})
            **- Lý do:** ${reason}`)
            .setTimestamp()
        let kickEmbed2 = new MessageEmbed()
            .setColor('RED')
            .setDescription(`Đã hủy **kick** đối với ${toKick}!`)

        const kickPage = await message.reply({ embeds: [kickAskEmbed], components: [row]})
        const col = await kickPage.createMessageComponentCollector({
            componentType: "BUTTON",
            time: ms('10s')
        })
        
        try {
            col.on('collect', i => {
                if (i.user.id !== message.author.id) return
                if (i.customId === 'kickyes') {
                    toKick.kick({ reason })
                    toKick.send(`Bạn vừa bị kick khỏi ${message.guild.name} bởi ${message.author} với lý do: ${reason}`)
                    kickPage.edit({ embeds: [kickEmbed], components: [] })
                } else if (i.customId === 'kickno') {
                    kickPage.edit({ embeds: [kickEmbed2], components: [] })
                }
            })
        } catch(err) {
            message.reply("Có lỗi khi Kick!")
            console.error(err)
        }

    },
};