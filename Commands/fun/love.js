const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'love',
    category: 'fun',
    aliases: [],
    cooldown: 60,
    usage: '[prefix]love [tag/id người dùng]',
    descriptions: 'Xem bạn và người ấy có hợp nhau hay không !',
    run: async(client, message, args) => {
        if (!message.mentions.members.first()) {
            const embed = new MessageEmbed()
                .setColor('#ff87ab')
                .setDescription(`**💝 Vui lòng tag một người nào đó!**`);
            return message.channel.send({ embeds: [embed] });
        }
        let person = message.mentions.members.first() || message.person;
        if (person.id === message.member.id) return message.channel.send('Không thể tự yêu chính mình, vã lắm rồi à?');

        const love = Math.floor(Math.random() * 100);
        const loveIndex = Math.floor(love / 10);
        const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);
        const embed = new MessageEmbed()
            .setColor('#ff87ab')
            .addFields({name: `☁️ **${person.displayName}** yêu **${message.member.displayName}** ở mức:`, 
            value:`💟 ${Math.floor(love)}%\n\n${loveLevel}`});
        message.channel.send({ embeds: [embed] })
        if (love < 50) {
            client.bank(message.author.id, 3000)
            message.channel.send(`**💔 Chúng ta không thuộc về nhau 💔** An ủi \`3000\` <:money:967037594879807550> nè 😢`)
        } else {
            message.channel.send('*Hợp nhau đấy! OTP Riu 💔*')
        }
    }
}