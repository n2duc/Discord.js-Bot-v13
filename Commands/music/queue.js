module.exports = {
    name: 'queue',
    category: 'music',
    aliases: ["q"],
    descriptions: 'Xem PlayList nhạc Diu túp ê',
    run: async (client, message, args) => {
        message.channel.send('Đang trong quá trình hoàn thành...')
    },
};