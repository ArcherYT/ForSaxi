const Discord = require('discord.js');

const client = new Discord.Client();

const moment = require('moment');

const token = '';

const prefix = '!'

client.once('ready', () => {
    console.log(`The bot is online!`)
    client.user.setActivity(`Set this to whatever you want`)
});

client.on('message', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.splice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'me') {
        const meembed = new Discord.MessageEmbed()
        .setTitle('User Info')
        .setDescription("I'm cool")
        .addField('Username', `${message.member.user.tag}!`)
        .addField('Join date', `${moment(message.member.joinedAt).format('DD/MM/YYYY')}`)
        .setThumbnail(message.author.displayAvatarURL())
        message.channel.send(meembed)
    } else if(command === 'verify') {
        const role = message.guild.roles.cache.get('736479268120428567')
        if(role) {
            try{
                await message.member.roles.add(role);
                console.log('Role added!');
                message.channel.send(`**${message.author.username}, has successfully verified!`)
            }
            catch(err) {
                console.log(err);
            }
        }
    } else if(command === 'poll'){
        if(!args[0]){
            message.channel.send(`${message.author.username}, please specify what you are trying to make a poll about!`)
            return;
        }

        let msgArgs = args.slice(1).join(" ");

        message.channel.send(`**Poll by: ${message.author.username}**\n` + `"${msgArgs}"`).then(MessageReaction => {
            MessageReaction.react("👍")
            MessageReaction.react("👎")
            MessageReaction.react("🤷‍♂️")
        })
    } 
})

client.login(token)