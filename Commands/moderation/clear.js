const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Xóa số lượng tin nhắn',
    aliases: ['clean', 'xoa'],
    usage: '[prefix]clear <số lượng tin nhắn> || [tag]+<số lượng tin nhắn> ',
    category: 'moderation',

    run: async(client, message, args) => {
        const member = message.mentions.members.first();

        const messages = message.channel.messages.fetch();

        if (member) {
            const userMessages = (await messages).filter((m) => m.author.id === member.id);

            await message.channel.bulkDelete(userMessages, true);
            message.channel.send(`${member} **Tin nhắn đã được xóa.** 👍`);
        } else {
            if (!args[0])
                return message.channel.send('**Vui lòng nhập số lượng tin nhắn cần xóa.**');
            if (isNaN(args[0]))
                return message.channel.send('**Số lượng là một chữ số!**');
            if (parseInt(args[0]) >= 100)
                return message.channel.send('**Số lượng tối đa tin nhắn có thể xóa là 100!**');
            await message.channel
                .bulkDelete(parseInt(args[0]) + 1)
                .catch((err) => console.log(err));
            message.channel.send('Đã xóa ' + args[0] + ' tin nhắn...');
        }
    },
};