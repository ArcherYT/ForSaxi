const { Client, MessageEmbed, Message, MessageReaction } = require('discord.js');
const bot = new Client();
const token = 'token'

const PREFIX = "!"

bot.on('ready', () =>{
    console.log("The bot is active and ready to go!");
    bot.user.setActivity(`Make me what you want | I'm in ${bot.guilds.cache.size} servers!`)
});

bot.on('message', async message =>{
    let args = message.content.substring(PREFIX.length).split(" ");
    if(message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    switch(args[0].toLowerCase()){
        
    case "poll":

        if(!args[1]){
            message.channel.send(`${message.author.username}, please say what you'd like to suggest/make a poll about!`);
            return;
        }
        
        let msgArgs = args.slice(1).join(" ");

        
        message.channel.send(`**Poll by: ${message.author.username}**\n` + `"${msgArgs}"`).then(MessageReaction => {
            MessageReaction.react("👍");
            MessageReaction.react("👎");
            MessageReaction.react("🤷‍♂️")
        })
    break;
    case('verify'):
    const role = message.guild.roles.cache.get('role id here');
    if(role) {
        try{
            await message.member.roles.add(role);
            console.log("Role Added!");
            message.channel.send(`**${message.author.username}**, has successfully verified!`)
        }
        catch(err) {
            console.log(err);
        }
    }
    break;
    }
})

bot.login(token)
