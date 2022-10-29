module.exports = {
    name: 'pick',
    description: 'Chọn không được thì bot chọn thay',
    category: 'fun',
    usage: '<lựa chọn 1>, <lựa chọn 2>, ...',

    run: async(client, message, args) => {
        const pickList = args.join(' ').split(',')
        const random = pickList[Math.floor(Math.random() * pickList.length)]
        return message.channel.send(random)
    }
}