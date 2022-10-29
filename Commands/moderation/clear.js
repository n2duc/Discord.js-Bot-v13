module.exports = {
    name: 'clear',
    description: 'Xóa số lượng tin nhắn',
    aliases: ['clean', 'xoa'],
    usage: '[prefix]clear <số lượng tin nhắn> || [tag]+<số lượng tin nhắn> ',
    category: 'moderation',

    run: async(client, message, args) => {
        await message.delete();

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("Bạn không có quyền MANAGE_MESSAGES").then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            return message.reply("Bot không có quyền MANAGE_MESSAGES nên bot không thể xoá.").then(m => m.delete({timeout: 5000}));
        }

        const user = message.mentions.users.first()
        const ammount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1])
        if (!ammount) return message.reply('Vui lòng nhập số lượng tin nhắn để xoá.')
        if (ammount < 1) return message.reply('Vui lòng nhập số lớn hơn 1.')
        if (ammount > 100) return message.reply('Vui lòng nhập số nhỏ hơn 100.')
        if (!ammount && !user) return message.channel.send(`Sử dụng lệnh help clear\` để biết thêm thông tin.`)
        if (!user) {
            message.channel.bulkDelete(ammount, true).then(delmsg => {
                message.channel.send(`Đã xoá \`${delmsg.size}\` tin nhắn!`).then(m => m.delete({timeout: 5000}))
            })
        } else {
            message.channel.messages.fetch({
                limit: 100,
            }).then(messages => {
                messages = messages.filter(m => m.author.id === user.id).array().slice(0, ammount)
                message.channel.bulkDelete(messages, true).then(delmsg => {
                    message.channel.send(`Đã xoá \`${delmsg.size}\` tin nhắn!`).then(m => m.delete({timeout: 5000}))
                })
            }) 
        }
    },
};