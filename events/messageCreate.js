require('dotenv').config();
const { Collection } = require('discord.js')
const ms = require('ms')
const Timeout = new Collection();
const prefix = process.env.PREFIX

module.exports = (client, message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(' ');
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        if (command) {
            if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());
            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 2) * 1000;
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.channel.send(`Vui lòng chờ \`${timeLeft.toFixed(1)}\` giây để sử dụng lệnh này!`);
                }
            }
            if (command.category === 'music' && !message.member.voice.channel) return message.channel.send('Vui lòng vào room để sử dụng lệnh!')
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            command.run(client, message, args)
        }
}
