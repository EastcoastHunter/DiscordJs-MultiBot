const Discord = require("discord.js");

module.exports = {
    config: {
        name: "avatar",
        description: "Sends you your avatar or some one elses",
        usage: "(@user)",
        category: "miscellaneous",
        accessableby: "members",
        aliases: ["av", "user av"]
    },
    run: async (bot, message, args) => {
        let msg = await message.reply("Making your logo please be patient...");
        let target = message.mentions.users.first() || message.author;

        await message.author.send({
            files: [{
                    attachment: target.displayAvatarURL,
                    name: "your-avatar.png",
                    color: "RANDOM"
                }

            ]
        });

        msg.delete();
    }
}
