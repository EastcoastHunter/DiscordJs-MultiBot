module.exports = {
    config: {
        name: "invites",
        description: "gives bot information",
        usage: "",
        category: "info",
        accessableby: "Administrators",
        aliases: ["leaderboard", "il", "serverlinks"]
    },
    run: async (bot, message, args) => {
        const Discord = require('discord.js'),
            arraySort = require('array-sort'),
            table = require('table');
            const chalk = require("chalk");
        message.delete(10000).catch(O_o=>{})
        let invites = await message.guild.fetchInvites().catch(error=>{return message.channel.send('Sorry i do not have perms to view the invite audit log')})
        invites = invites.array();
        arraySort(invites, 'uses', {reverse:true});
        let possibleInvites =[['Invite Maker', 'Used [Number] Times']];
        invites.forEach(function(invite){
            let invitor = invite.inviter.username;
            let uses = invite.uses;
            possibleInvites.push([invitor, uses]);
    
        })
        let ttable =table.table;
        const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        //.setColor(0x7289da)
        .setTitle('Server Invites For ' + message.guild.name)
        // .setDescription(`<@${bot.user.id}> is only able to display the invite uses if it has permissions to view the invite audit logs if you get this embed that means the bot has proper pems in your server\n(${message.guild.name})`)
        .setFooter(`${bot.user.username} invite leaderboard system powered by Hunters Web Designs`, bot.user.displayAvatarURL)
        // .setThumbnail(message.guild.iconURL)
        .addField('Leaderboard', `\`\`\`css\n${(ttable(possibleInvites))}\`\`\``,false)
        // .addField('Leaderboard', `${ttable(possibleInvites)}`, false);   
     message.channel.send(embed).catch(error=>{
            console.log(chalk.bold.red(error))
        });
       console.log(chalk.bold.green(ttable(possibleInvites)));
    
    }
}
