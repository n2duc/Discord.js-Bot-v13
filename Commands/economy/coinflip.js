module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    cooldown: 10,
    category: 'economy',
    usage: '<head or tail> <Số tiền cược>',
    description: 'Chơi lật đồng xu',
    
    run: async(client, message, args) => {
        const user = message.member
        const bal = await client.bal(message.member.id);

        let choices = args[0]
        if(!choices) return message.channel.send("Vui lòng chọn head hoặc tail")

        let bet = args[1]
        if(!bet) return message.channel.send("Vui lòng nhập số tiền cược")

        const coin = ['head', 'tail', 'h', 't']

        if(!coin.includes(choices)) return message.channel.send("Phải là heads hoặc tails!")

        if(bet > bal) return message.channel.send("Bạn không đủ tiền để đặt cược!")
        if(isNaN(bet)) return message.channel.send("Tiền cược là một con số!")

        //Tien cuoc toi da 100000
        if(bet > 100000) {
            bet = 100000
        }
        const bet2 = parseInt(bet)
        if(choices == 'h') {
            choices = 'head'
        } else if(choices == 't') {
            choices = 'tail'
        }
        
        const coin2 = ['head', 'tail']
        const flip = coin2[Math.floor(Math.random() * coin2.length)]
        message.channel.send(`💰 ${user.user.username} cược **${bet2}**<:money:967037594879807550> và chọn **${choices}** !!`)

        //Flip
        if(flip == choices) {
            await message.channel.send(`Kết quả là **${flip}**, chúc mừng bạn thắng **${bet2}**<:money:967037594879807550>`)
            await client.bank(user.id, bet2);
        } else {
            await message.channel.send(`Kết quả là **${flip}**, rất tiếc bạn thua **${bet2}**<:money:967037594879807550>`)
            await client.rmv(user.id, bet2);
        }
    }
}