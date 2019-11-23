const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = {
  config: {
    name: "discordrpc",
    description: "Sends a fivem discord rpc script made by Hunter!",
    usage: "",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["drpc", "rpc"]
  },
  run: async (bot, message, args) => {
      const Discord = require("discord.js");
    const copy = new Discord.RichEmbed()
      .setTitle(
        `${message.author.tag} Here is Hunters Discord RPC Script For Five M`
      )
      .setDescription(
        "This is a five m discord rpc script that has been\nmade by the discord bot owner him self\nthis discord rpc application must be put in the `resources` folder\n for it to properly work"
      )
      .setTimestamp()
      .setColor("RANDOM")
      .setFooter(
        `Hunter's Web Designs & Bot Support ` + bot.user.username,
        bot.user.displayAvatarURL
      )
      .addField(
        "Details about this script:",
        "This is a discord rich presence that\nshows the location of a player and their name in the specific server they are in that has this script installed."
      );
    message.channel.send("<@!" + message.author.id + ">", copy);
    message.channel.send({
      files: [
        "./fivemscript/discordrpc/license.txt",
        "./fivemscript/discordrpc/__resource.lua",
        "./fivemscript/discordrpc/discord.lua"
      ]
    });
    //message.channel.send(copy);
  }
};
