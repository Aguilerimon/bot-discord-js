const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

var token = config.token;

client.login(token);

client.on("ready", () =>{
    console.log(`FurroBot esta listo como ${client.user.tag}`);

    client.user.setPresence({
        status: 'online',
        game: {
            name: 'uwu.help | Lolsito',
            type: 'PLAYING'
        }
    });
});

client.on('message', message =>{
    console.log(message.content);
    if(message.content === 'ping'){
        message.reply('pong'); 
    }
});