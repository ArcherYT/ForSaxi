const {
    Client,
    MessageEmbed,
    Message,
    MessageReaction
} = require('discord.js');
const bot = new Client();
const token = 'token'
const db = require('quick.db') //make sure you have quick.db installed

const PREFIX = "!"

bot.on('ready', () => {
    console.log("The bot is active and ready to go!");
    bot.user.setActivity(`Make me what you want | I'm in ${bot.guilds.cache.size} servers!`)
});

bot.on('message', async message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    switch (args[0].toLowerCase()) {

        case "poll":

            if (!args[1]) {
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
        case ('verify'):
            const role = message.guild.roles.cache.get('role id here');
            if (role) {
                try {
                    await message.member.roles.add(role);
                    console.log("Role Added!");
                    message.channel.send(`**${message.author.username}**, has successfully verified!`)
                } catch (err) {
                    console.log(err);
                }
            }
            break;
        case ('setprefix'):
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`${message.author.username}, You do not have permissions to run this command!`)
            .setColor('#00FFFF')
        )
        if (!args[0]) return message.channel.send(
            new Discord.MessageEmbed()
            .setDescription('Please define a prefix!')
            .setColor('#00FFFF')
        )
        await db.set(`prefix_${message.member.guild.id}`, args[0])
        message.channel.send(
            new Discord.MessageEmbed()
            .setDescription(`The prefix for **${message.member.guild.name}** has successfully been changed to **${args[0]}**! :tada:`)
        )
        break;
    }
})

bot.login(token)
