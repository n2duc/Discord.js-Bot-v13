const { getAudioUrl } = require('google-tts-api');
const voice = require('@discordjs/voice')
module.exports = {
    name: 'speak',
    category: '🔮-Chức năng',
    aliases: ['s'],
    utilisation: '{prefix}speak',
    usage: '%speak [text]',
    descriptions: 'Chuyển chữ thành lời nói trong kênh thoại',
    run: async (client, message, args) => {
        let string = args.join(" ");
        let voiceChannel = message.member.voice.channel;

        if (!string) return message.channel.send("Please type something to speak!");
        if (string.length > 200) return message.channel.send("I can only speak 200 words!");
        if (!voiceChannel) return message.channel.send("Please join a voice channel to use this command!");

        let audioUrl = await getAudioUrl(string, {
            lang: "vi",
            slow: false,
            host: 'https://translate.google.com',
            timeout: 20000,
        });

        let player = voice.createAudioPlayer();
        let resource = voice.createAudioResource(audioUrl);

        let connection = voice.joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.channel.guild.id,
            adapterCreator: message.channel.guild.voiceAdapterCreator,
        });

        player.play(resource);
        connection.subscribe(player);

        player.on(voice.AudioPlayerStatus.Idle, () => {
            connection.disconnect();
        });
    },
};