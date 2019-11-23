module.exports = {
    config: {
        name: "bot-info",
        description: "gives bot information",
        usage: "",
        category: "info",
        accessableby: "members",
        aliases: ["bi", "binfo", "information"]
    },
    run: async (bot, message, args) => {
        const {version} = require("discord.js");
        const {bversion, prefix} = require("../../botconfig.json");
        const {nversion} = require("../../botconfig.json");
        const pjs = require('../../package.json')
        const Discord = require("discord.js");
        const { blue_dark } = require("../../colours.json");
        let botinfo = new Discord.RichEmbed()
        .setTitle(bot.user.username)
        .setDescription(`I am \` @${bot.user.tag}\`  and I have many moderational commands.\nI was developed by Hunter L#3037, and made out of the discord.js libary`)
        .setColor(blue_dark)
        .setTimestamp()
        .addField("Bot's Prefix",  `> My prfix = ${prefix}`, true)
        .addField("Libary Versions", `> Bot's Build Version = ${bversion}\n> Discord.js Version = v${version}\n> Node.Js Version = ${nversion}\n> Package.Json Version = ${pjs.version}`, true)
        message.channel.send({embed: botinfo})
        message.delete().catch(O_o=>{});
    }
}
