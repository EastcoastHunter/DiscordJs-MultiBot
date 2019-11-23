module.exports = {
    config: {
        name: "developers-twitch",
        description: "Sends the developers twitch link",
        usage: "",
        category: "developer",
        accessableby: "Members",
        aliases: ["dt"]
    },
    run: async (bot, message, args) => {
        const { ownerid } = require("../../botconfig.json");
        const { RichEmbed } = require("discord.js");
        const { blue_dark } = require("../../colours.json");
        let twitchembed = new RichEmbed()
        .setTitle("Developer's Twitch Link")
        .setURL("https://twitch.tv/midwest_hunter")
        .setDescription("Go subscribe to <@!" + ownerid + ">'s twitch channel by following the link below")
        .setColor(blue_dark)
        
        message.reply({embed: twitchembed}, "https://twitch.tv/midwest_hunter")

    }
}
