module.exports = {
    name: 'nowplaying',
    category: 'music',
    aliases: ["np"],
    descriptions: 'Xem nhạc Diu túp đang phát ê',
    run: async (client, message, args) => {
        message.channel.send('Đang trong quá trình hoàn thành...')
    },
};