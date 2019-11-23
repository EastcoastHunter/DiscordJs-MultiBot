module.exports = { 
    config: {
        name: "reporter",
        description: "reports a user of the guild",
        usage: "<user> <reason>",
        accessableby: "owner",
        category: "developer",
        aliases: ["r"]
    },
    run: async (bot, message, args) => {
        const Discord = require('discord.js');
        message.delete()
        // mentioned or grabbed user
        let target = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!target) return message.channel.send("Please provide a valid user").then(m => m.delete(15000))

        // reasoning definition
        let reason = args.slice(1).join(" ")
        if(!reason) return message.channel.send(`Please provide a reason for reporting **${target.user.tag}**`).then(m => m.delete(15000))

        // grab reports channel
        let sChannel = message.guild.channels.find(x => x.name === "report-logs")

        // send to reports channel and add tick or cross

        message.channel.send("Your report has been filed to the staff team. Thank you!").then(m => m.delete(15000))
        let reporter = new Discord.RichEmbed()
        .setTitle("New Report")
        .setColor("#ffff00")
        .setDescription(`> **${message.author.tag}**  has reported **<@${target.user.id}>**`)
        // .addBlankField(false)
        .addField("Reason", "**```fix\n"+ reason +"```**" , true)
        // .addBlankField(false) 
        .addField("Time Of Report", `**\`\`\`prolog\n${message.createdAt}\`\`\`**`, true)
        .setTimestamp(message.createdAt)
        sChannel.send(reporter).then(async msg => {
            await msg.react("✅")
            await msg.react("❌")
        })
  }
}
