const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const ytdl = require('ytdl-core');

var token = config.token;
var prefix = config.prefix;

client.login(token);

client.on("ready", () =>{
    console.log(`FurroBot esta listo como ${client.user.tag}`);

    client.user.setPresence({
        status: 'online',
        game: {
            name: 'uwu. help | Lolsito',
            type: 'PLAYING'
        }
    });
});

client.on('message', message =>{
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    switch(comando){
        case 'ping':
            //Llamado a un mensaje de canal de tipo embed
            message.channel.send({embed:{
                color: 3447003,
                description: ':ping_pong: Pong pong!'
            }});
        break;

        case 'help':
           message.channel.send({embed:{
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: '<COMANDOS FURROBOT>',
            fields: [{
                name: 'uwu. help',
                value: 'Devuelve los comandos disponibles de FurroBot.'

            },
            {
                name: 'uwu. ping',
                value: 'Devuelve una respuesta pong.'
            },

            {
                name: 'uwu. yt [URL DE YOUTUBE]',
                value: 'Reproduce el audio del video seleccionado.'
            }],

            timestamp: new Date(),

            footer:{
                icon_url: client.user.avatarURL,
                text: "github.com/Aguilerimon/furrobot-bot-discord"
            }
           }});
        break;

        case 'yt':
            if (!message.guild) return;
            if(!args[0]) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');
            //Valida si el usuario esta conectado en un canal de discord
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                .then(connection => { //connection es una instancia de voiceChannel
                    //Filta solo el audio de la URL de youtube
                    const url = ytdl(args[0], { filter : 'audioonly' });
                    //Realiza el stream del audio guardado en la constante url
                    const dispatcher = connection.playStream(url);
                })
                .catch(console.log);
            } else {
                message.reply('Debes estar en un canal de audio!');
            }
        break;

        case 'stop':
            if (!message.guild) return;
            //Valida si el usuario esta conectado en un canal de discord
            if (message.member.voiceChannel) {
                message.member.voiceChannel.leave(); //Funcion leave() que desconecta al bot del canal de audio
                message.reply('Adios!!'); //Mensaje de despedida
            }
            else {
                message.reply('Debes estar en un canal de audio!');
            }
        break;
    }
});
