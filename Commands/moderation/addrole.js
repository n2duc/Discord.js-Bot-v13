module.exports = {
    name: "addrole",
    aliases: ["roleadd", "ar"],
    category: "moderation",
    description: "Thêm role",
    usage: "<tag> <rolename>",

    run: async(client, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) return message.reply("Bạn phải tag ai đó")
        if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply("Bạn không có quyền `\ MANAGE_ROLES `\ ")
        if (!user) return message.reply("Không tìm thấy người bạn tag, vui lòng thử lại.")
        
        let search = args.slice(1).join(' ')
        const role = message.guild.roles.cache.find(r => r.name.includes(search))

        if (!role) return message.channel.send('Không tìm thấy role này!')

        user.roles.add(role.id)
        message.channel.send(`${user} bây giờ đã có role ${role}`)
    }
}