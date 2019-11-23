module.exports = {
    config: {
        name: "uptime",
        description: "Displays the bots current uptime!",
        usage: "!uptime",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["ut"]
    },
    run: async (bot, message, args) => {
        const { RichEmbed } = require("discord.js");
        const { gold } = require("../../colours.json");
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
    }
    let ut = new RichEmbed()
    .setTitle(bot.user.username + " Uptime")
    .setURL("https://hunterswebdesigns.ml")
    .setColor(gold)
    .setDescription("I have been online for:\n **`" + duration(bot.uptime)+ "`**")
    .setThumbnail(bot.user.displayAvatartURL)
    .setFooter("(c)2019 Hunter L.#3037 | All Rights Reserved (R)", bot.user.displayAvatarURL)
    message.channel.send(ut)
    message.delete(5000)//`I have been online for: ${duration(bot.uptime)}`

    }
}
