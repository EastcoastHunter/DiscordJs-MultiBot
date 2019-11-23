const Discord = require("discord.js");

module.exports = {
    config: {
        name: "report",
        description: "Reports a user to staff",
        usage: "<@user> <reason>",
        category: "miscellaneous",
        accessableby: "members",
        aliases: ["r"]
    },
    run: async (bot, message, args) => {
        //!report @user this is the reason
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) return message.channel.send({
            embed: {
                color: 15158332,
                description: "Couldn't Find A User!\nMake Sure you've taged some one!"
            }
        });
        let reason = args.join(" ").slice(22);
        if (!reason) return message.channel.send({
            embed: {
                color: 15158332,
                description: `Please make sure you\'ve provided a resaon for the \`${prefix}report\`\n**\`${prefix}reports [@user] [resason]\`** is the proper way to report a user`
            }
        }).message.delete(10000).catch(O_o => {});
        let reportEmbed = new Discord.RichEmbed()
            .setDescription("Reports")
            .setColor(10038562)
            .setTimestamp()
            .setFooter(`${message.guild.name} Modersting System`, message.guild.iconURL)
            .addField("Reported User:", `${rUser} with ID: ${rUser.id}`)
            .addField("Reported By:", `${message.author} with ID: ${message.author.id}`)
            .addField("Channel:", message.channel)
            .addField("Time:", message.createdAt)
            .addField("Reason:", reason);

        //https://discordapp.com/api/webhooks/591326989743423544/yYAluN7oGCwUuxOySfETF1hAwFZvkrPNRRkv_ALwhmwhL5CREqnowkRHPGtZtLrUu6Q5

        const hook = new Discord.WebhookClient('591326989743423544', 'yYAluN7oGCwUuxOySfETF1hAwFZvkrPNRRkv_ALwhmwhL5CREqnowkRHPGtZtLrUu6Q5');
        hook.send(reportEmbed);
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if (!reportschannel) return message.channel.send({
            embed: {
                color: 15158332,
                description: "Couldn't find reports channel."
            }
        });


        message.delete().catch(O_o => {});
        reportschannel.send(reportEmbed);
        rUser.send({
            embed: {
                color: 15105570,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarDisplayURL
                },
                title: `You've been warned in ${message.guild.name}`,
                url: "https://hunterswebdesigns.ml/",
                decription: `You've been warned in ${message.guild.name} by ${message.author} for the reason below:`,
                fields: [{
                        name: "Reason: ",
                        value: `**\`\`\`fix\n${reason}\`\`\`**`
                    },
                    {
                        name: "Channel you where reported in",
                        value: `**${message.channel}**`
                    },
                    {
                        name: "Time you where reported",
                        value: `**${message.createdAt}**`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: message.guild.iconURL,
                    text: `© ${message.guild.name} Moderation System `
                }
            }
        });
        //rUser.send(`Youve been reported by ${message.author} the reason is downbelow this message: `, reportEmbed);
        message.channel.send(message.author, {
            embed: {
                color: 3066993,
                description: `Thank you for making/reporting us the information you have made in your report ticket!`
            }
        })
        message.delete(1000).catch(O_o => {});
        return;
    }
}
