const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

var token = config.token;
var prefix = config.prefix;

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
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    switch(comando){
        case 'ping':
            message.channel.send(':ping_pong: Pong!');
        
        case 'help':
            message.channel.send('**COMANDOS DE FURROBOT**\n```\n'+
            '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
            '-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n```\n\n');
            
        break;
    }
});