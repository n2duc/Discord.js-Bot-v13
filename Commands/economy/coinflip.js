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
        if(!choices || choices == 'all') return message.channel.send("Vui lòng chọn head hoặc tail")

        switch(choices.toLowerCase()){
            case 't' || 'tail': {
                choices = 'tail'
                break
            }
            default: {
                choices = 'head'
                break
            }
        }

        let bet = args[1]
        if(!bet) return message.channel.send("Vui lòng nhập số tiền cược")

        const coin = ['head', 'tail', 'h', 't']

        if(!coin.includes(choices)) return message.channel.send("Phải là heads hoặc tails!")

        if(bet > bal) return message.channel.send("Bạn không đủ tiền để đặt cược!")
        
        //Tien cuoc toi da 100000
        if (bet == 0) return message.channel.send('Bạn không thể cược 0')
        if(bet > 100000 || bet == 'all') {
            bet = 100000
        } else if(isNaN(bet)) {
            return message.channel.send("Tiền cược là một con số!")
        }
        const bet2 = parseInt(bet)
        
        const coin2 = ['head', 'tail']
        const flip = coin2[Math.floor(Math.random() * coin2.length)]
        message.channel.send(`💰 ${user.user.username} cược **${bet2}**<:money:967037594879807550> và chọn **${choices}** !!`)

        //Flip
        if(flip == choices) {
            setTimeout(function(){
                message.channel.send(`Kết quả là **${flip}**, chúc mừng bạn thắng **${bet2}**<:money:967037594879807550>`)
            }, 2000)
            await client.bank(user.id, bet2);
        } else if(flip != choices) {
            setTimeout(function(){
                message.channel.send(`Kết quả là **${flip}**, rất tiếc bạn thua **${bet2}**<:money:967037594879807550>`)
            }, 2000)
            await client.rmv(user.id, bet2);
        } else {
            message.channel.send("Bot lỗi, bạn không bị trừ tiền")
        }
    }
}