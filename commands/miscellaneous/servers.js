module.exports = {
  config: {
    name: "servers",
    description: "Displays the bots server list!",
    usage: "",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["s"]
  },
  run: async (bot, message, args) => {
      const Discord = require("discord.js");
    let bicon = bot.user.displayAvatarURL;
    let servers = "";
    bot.guilds.forEach(guild => {
      servers += " - " + guild.name + "\n";
    });
    //let string = '';
    // bot.guilds.forEach(guild => {
    //string += guild.name + '\n';})
    let bt = bot.user.username;
    let botembed = new Discord.RichEmbed()
      .setTitle("Bot Server List")
      .setAuthor(bot.user.tag, bot.user.displayAvatarURL)
      .setURL("https://hunterswebdesigns.ml/longmire/index.php")
      .setColor("RANDOM")
      .setDescription("<@" + bot.user.id + "> is in a total of **" + bot.guilds.size + "** servers")
      //.addField("Servers In", string)
      .addField(`Servers[${bot.guilds.size}]:`, ">>>"+ servers, true)
      .addBlankField(false)
      .addField(`Total Servers In`, `<@${bot.user.id}> is in a total of \`${bot.guilds.size}\` servers.`,true)
      .addField(`All Server Channels`, `<@${bot.user.id}> is wathcing over a total of \`${bot.channels.size}\` channels`, true)
      .addField(`All Server User Count:`, `<@${bot.user.id}> is moderating over a total of \`${bot.users.size}\` Users`,true)
      .setTimestamp()
      .setFooter(
        "Command Ran By: " + message.author.username,
        message.author.avatarURL
      );
    message.channel.send(botembed);
  }
};
