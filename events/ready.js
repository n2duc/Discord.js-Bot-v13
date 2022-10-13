
module.exports = (client) => {
    console.log(`Bot is ready! ${client.user.tag}`);
    client.user.setActivity('CUDAH No.1 | Prefix .', { type: 'WATCHING' });

    const activities = [
        "That's What I Like",
        "One Piece 🤏",
        "Cho đi và nhận lại ❤",
        "Địt mọa địt vợ MF"
    ]

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];

        client.user.setActivity(newActivity, {type: 'PLAYING'});
    }, 5000);
}