const { RichEmbed } = require("discord.js");
const { red_light } = require("../../colours.json");
const moment = require("moment");
module.exports = {
  config: {
    name: "userinfo",
    description: "Pulls the userinfo of yourself or a user!",
    usage: "!userinfo (@mention)",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["ui", "whois"]
  },
  run: async (bot, message, args) => {
          let user;
	if(message.mentions.users.first()){
		user = message.mentions.users.first();
	}else{
		user = message.author;
	}
        let member = message.guild.member(user);

    let uEmbed = new RichEmbed()
      .setColor(red_light)
      .setTitle("User Info")
      .setThumbnail(message.guild.iconURL)
      .setAuthor(
        `${user.username} Info`,
        user.displayAvatarURL
      )
      .setFooter(`(c) 2019 | ${message.guild.name}`, bot.user.displayAvatarURL)
      .addField("**Username:**", "```fix\n" + `${user.username}` + "```", true)
      .addField("**Discriminator:**", "```fix\n" + `#${user.discriminator}` + "```", true)
      .addField("**ID:**", "```fix\n" +`${user.id}` + "```", true)
      .addField("**Bot:**", "```fix\n" +  user.bot +"```", true)
      .addField("**Game:**", "```fix\n"+`${user.presence.game ? user.presence.game : 'Not one set'}`+"```", true)
      .addField(`**${user.username}`+ "'" +`s Nickname:**` , "```fix\n"+ `${member.nickname !== null ? `${member.nickname}`: 'NONE'}` + "```",true)
      .addField("**Status:**", "```fix\n"+ `${user.presence.status}` + "```", true)
      .addField("**Joined On:**", "```fix\n"+`${moment.utc(user.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}` + "```", true)
      .addField("**Created At:**", "```fix\n"+ `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`+ "```", true)
      if(member.hasPermission(["KICK_MEMBERS","BAN_MEMBERS","ADMINISTRATOR","MANAGE_CHANNELS","MANAGE_GUILD","VIEW_AUDIT_LOG","MANAGE_MESSAGES","EMBED_LINKS","ATTACH_FILES","MENTION_EVERYONE","MUTE_MEMBERS","DEAFEN_MEMBERS","MOVE_MEMBERS","MANAGE_NICKNAMES","MANAGE_ROLES","MANAGE_ROLES_OR_PERMISSIONS","MANAGE_WEBHOOKS","MANAGE_EMOJIS"])){
        uEmbed.addField("Key Permissions", "```fix\nKick Members, Ban Members, Administrator, Manage Channels, Manage Server, Manage Messages, Mention Everyone, Manage Nicknames, Manage Roles, Manage Webhooks, Manage Emojis```", true)
      }else if(member.hasPermission(["KICK_MEMBERS","VIEW_AUDIT_LOG","MANAGE_MESSAGES", "MANAGE_GUILD", "MENTION_EVERYONE","MUTE_MEMBERS","DEAFEN_MEMBERS","MOVE_MEMBERS","MANAGE_NICKNAMES","MANAGE_ROLES","MANAGE_EMOJIS"])){
        uEmbed.addField("Key Permissions", "```fix\nKick Members, Ban Members, Manage Channels, Manage Server, Manage Messages, Mention Everyone, Manage Nicknames, Manage Roles, Manage Webhooks, Manage Emojis```", true)
      }else if(member.hasPermission(["MENTION_EVERYONE"])){
        uEmbed.addField("Key Permissions", "Mention Everyone", true)
      }
      

    message.channel.send(uEmbed);
  }
};
