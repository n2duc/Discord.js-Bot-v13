const Canvas = require("canvas")
const Discord = require("discord.js")
const background = "https://imgur.com/q6nTfgK.jpg"

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member, message) => {
    let username = member.user.tag
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.6)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    Canvas.registerFont('./iciel Cadena.ttf', {family: 'Cadena'})
    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in Welcome
    ctx.font = "50px Cadena"
    ctx.fillText("🎉 WELCOME 🎉", dim.width/2, dim.margin + 70)

    // draw in the username
    ctx.font = "60px Cadena"
    ctx.fillText(username, dim.width/2, dim.height - dim.margin - 125)

    // draw in to the server
    ctx.font = "40px Cadena"
    ctx.fillText(`đến với server của mình <3`, dim.width / 2, dim.height - dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage