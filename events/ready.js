
module.exports = (client) => {
    console.log(`Bot is ready! ${client.user.tag}`);
    client.user.setActivity('XeXe FaMIlO | Prefix ~', { type: 'WATCHING' });

    const activities = [
        "That's What I Like",
        "One Piece 🤏",
        "Cái lùm mía zà ác",
        "Xexe bựa thì thôi"
    ]

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];

        client.user.setActivity(newActivity);
    }, 5000);
}