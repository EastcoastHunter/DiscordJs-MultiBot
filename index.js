const { Discord, Client, Collection, RichEmbed} = require("discord.js");
// const { token } = require("./botconfig.json");
const bot = new Client();
require("dotenv").config();
const {aqua,green_light,gold,red_dark, dark_red, red_light} = require("./colours.json");
["aliases", "commands"].forEach(x => (bot[x] = new Collection()));
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));
bot.on("ready", message => {
  try {
    console.log(bot.user.username + " is online and operational");
    const cheweyBotAnalyticsAPI = require("discord-bot-analytics");
    const customAnalytics = new cheweyBotAnalyticsAPI("68faeb7f-cb58-499b-b40c-a7619676979b", bot)

  } catch (err) {
    console.log(err);
  }
});
bot.on("ready", () => {
  // Require node-fetch
  const fetch = require("node-fetch");

  // Make your post request to discordbotlist.com
  fetch(`https://discordbotlist.com/api/bots/${bot.user.id}/stats`, {
    method: "POST",
    headers: {
      Authorization: `Bot 7adb43f252c97ea213a7822100b4981eae80e560ed1bd8d87fe258f2a002552b`, // Make sure to replace <your-token> with your actual token.
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      shard_id: bot.shard ? bot.shard.count : 0, // Or `bot.shards.size` on Eris
      guilds: bot.guilds.size, // `guilds` and `users` may not be accurate depending on how many shards you have (Discord.js). You'll have to get them all with broadcastEval
      users: bot.guilds.reduce((prev, now) => prev + now.memberCount, 0)
    })
  }).then(res => res.text());

  const BFDAPI = require("bfdapi.js");
  const bfd = new BFDAPI(
    bot.user.id,
    "6fb6f75626321e5f441b3f38a4f31605905ae976d34eec2c1ba608af72ea035fd391d6eaec70c156c2363171f866972bef9a917ba0528c7d63d6a0ca16e1ca4f"
  );
  bfd.postServerCount(bot.guilds.size).then(res => console.log(res));
});
// Start of user leave/join events
bot.on("guildMemberAdd", (member, guild) => {
  try {
    const Discord = require("discord.js");
    const channel = member.guild.channels.find(ch => ch.name === "welcome");
    const rules = member.guild.channels.find(ch => ch.name === "rules");
    const embed = new Discord.RichEmbed()
      .setAuthor("Hello " + member.displayName + ",")
      .setTitle(`Welcome to ${member.guild.name}`)
      .setColor(aqua)
      .setDescription(
        `- You are  currentlyin the **${channel}** channel!\n\n- You are the # \`${member.guild.members.size} \` member to join.\n- Please follow the tabs below for more instructions`
      )
      .setURL("")
      .setImage(member.guild.iconURL)
      .setThumbnail(`${member.user.avatarURL}`)
      .addBlankField(false)
      .addField("**Important!**",member.displayName + " please make sure you have read the " + rules +" channel before doing something againt them because some can get you insta banned!",false)
      .addBlankField(false)
      .addField("Enjoy your time here",`At, ${member.guild.name}\nIt will be a great experience!`,false);
    if (!channel) return;
    if (!rules)
      return embed.addField(
        "ERROR",
        "There isnt a #rules channel set please set one!"
      );
    channel.send(`<@${member.tag}>`);
    channel.send(embed);
  } catch (err) {
    console.log(err);
  }
});
bot.on("guildMemberRemove", (member, guild) => {
  try {
    const Discord = require("discord.js");
    const channel = member.guild.channels.find(ch => ch.name === "leave-log");
    const embed = new Discord.RichEmbed()
      .setTitle(`${member.displayName} Just left ${member.guild.name}`)
      .setURL("")
      .setThumbnail(member.user.avatarURL)
      .setColor(aqua)
      .setDescription(
        `${member.guild.name} now has **${member.guild.members.size}** members :worried:`
      )
      .setTimestamp(new Date())
      .addField(
        `See ya next time ${member.displayName}`,
        "Hope you enjoyed your stay here at _" +
          member.guild.name +
          "_ Hope to see you again soon! :wave:",
        false
      )
      .setFooter(
        `${member.guild.name} | Welcome bot`,
        bot.user.displayAvatarURL
      );

    if (!channel) return;
    channel.send(`<@${member.id}>`, { embed });
  } catch (err) {
    console.log(err);
  }
});
// End of user leave/join events
    // Start of bot server joining logging
    // Client join and leave Discord
    bot.on("guildCreate", async guild => {
      let guildCreateChannel = bot.channels.get("570609105769857044");
      let general = guild.channels.find('name', 'general');
      const Discord = require("discord.js");
      guild.channels.get(general.id).createInvite().then(invite => {
          let joinEmbed = new Discord.RichEmbed()
              .setTitle(`I Have Been Invited To **${guild.name}**`)
              .setColor(green_light)
              .setThumbnail(guild.iconURL)
              .setTimestamp(new Date())
              .setDescription('Join the new Guild')
              .addBlankField()
              .addField('Guild Info', `Name: **${guild.name}** \nID: **${guild.id}**`, true)
              .addField('Guild Invite Link:', '**' + invite.url + '**', true)
              .addBlankField()
              .addField('Bot is Now', 'in ' + bot.guilds.size + ' servers', true)
          guildCreateChannel.send(joinEmbed);
      });
  });
  bot.on("guildDelete", async guild => {
      const Discord = require("discord.js");
      let guildCreateDelete = bot.channels.get("570609105769857044");
      let leaveEmbed = new Discord.RichEmbed()
          .setTitle(`I Have Been Removed From **${guild.name}**`)
          .setColor(red_dark)
          .setThumbnail(guild.iconURL)
          .setTimestamp(new Date())
          .setDescription('**Removed From Guild** ' + guild.name)
          .addBlankField()
          .addField('Guild Info', `Name: **${guild.name}** \nID: **${guild.id}**`, true)
          .addBlankField()
          .addField('Bot is Now', '**in ' + bot.guilds.size + ' servers**', true)
      guildCreateDelete.send(leaveEmbed);
  });
  // End of bot server joining and leaving log
  
  // Start of server message logging and channel deletion and creation logging
  // start of server logging 
  bot.on("channelCreate", async channel => {
      var logs = channel.guild.channels.find(c => c.name === 'logs');
      if (!logs) return console.log("Can't find logs channel.");
      const Discord = require("discord.js");
      const cembed = new Discord.RichEmbed()
          .setTitle("Channel Created")
          .setColor(red_light)
          .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
          .setTimestamp(new Date());
      logs.send(cembed)
  });
  bot.on("channelDelete", async channel => {
    const Discord = require("discord.js");
      var logs = channel.guild.channels.find(c => c.name === 'logs');
      if (!logs) return console.log("Can't find logs channel.");
      const cembed = new Discord.RichEmbed()
          .setTitle("Channel Deleted")
          .setColor(dark_red)
          .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
          .setTimestamp(new Date())
      logs.send(cembed)
  });
  bot.on("channelEdit", async channel => {
    const Discord = require("discord.js");
      var logs = channel.guild.channels.find(c => c.name === 'logs');
      if (!logs) return console.log("Can't find the #logs channel");
      const cembed = new Discord.RichEmbed()
          .setTitle("Channel Edited")
          .setColor(gold)
          .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, has just been edited!`)
          .setTimestamp(new Date())
      logs.send(cembed)
  })
  bot.on('messageEdit', async(message) => {
      try {
          const logs = message.guild.channels.find('name', 'logs');
          if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
              await message.guild.createChannel('logs', 'text');
          }
          if (!logs) {
              return console.log('The logs channel does not exist and cannot be created in ' + message.guild.name)
          }
          if (!logs){
              return; 
          }
          const entry = await message.guild.fetchAuditLogs({
              type: 'MESSAGE_EDIT'
          }).then(audit => audit.entries.first())
          let user;
          if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
              user = entry.executor.username
          } else {
              user = message.author
          }
          const { RichEmbed } = require("discord.js");
          const logembed = RichEmbed()
              .setTitle("Message Edited")
              .setAuthor(user.tag, message.author.displayAvatarURL)
              .setColor(gold)
              .setTimestamp(new Date())
              .setDescription(`**Message sent by ${message.author.username}** >> edited in **${message.channel.name}**\n\n`)
              .addField("Message Content Before", `\`\`\`fix\n${message.content.before}\`\`\``, true)
              .addField("Message Content After", `\`\`\`fix\n${message.content.after}\`\`\``, true)
              .setFooter(`${bot.user.username} security logs • <#${message.channel.id}> `, bot.user.displayAvatarURL)
          logs.send(logembed)
          console.log()
      } catch (err) {
          console.log(err)
      }
  })
  bot.on('messageDelete', async(message) => {
      try {
        const logs = message.guild.channels.find('name', 'logs');
        if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
            await message.guild.createChannel('logs', 'text');
        }
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
            return console.log('I don\'t have permissions and the event was cannceled');
        }
        const entry = await message.guild.fetchAuditLogs({
            type: 'MESSAGE_DELETE'
        }).then(audit => audit.entries.first())
        let user;
        if (entry.extra.channel.id === message.channel.id && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
            user = entry.executor.username
        } else {
            user = message.author
        }
          const Discord = require("discord.js");
          const logembed = new Discord.RichEmbed()
              .setTitle('Message Deleted')
              .setAuthor(user.tag, message.author.displayAvatarURL)
              .addField(`**Message sent by ${message.author.username}> deleted in ${message.channel.name}**\n\n`, `\`\`\`fix\n${message.content}\`\`\``, false)
              .setColor(gold)
              .addField("Channel Message Was deleted in", `<#${message.channel.id}>`, false)
              .setFooter(`${bot.user.username} security logs`, message.guild.iconURL)
              .setTimestamp(new Date())
              // console.log(entry)
          logs.send(logembed);
      } catch (err) {
          console.log(err)
      }
  })
  bot.on("messageUpdate", async(oldMessage, newMessage) => {
          if (oldMessage.author.bot) {
              return;
          }
          let logs = oldMessage.guild.channels.find(`name`, `logs`);
          if (oldMessage.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
              await oldMessage.guild.createChannel('logs', 'text');
          }
          if (!oldMessage.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
              return console.log('The logs channel does not exist and cannot be created')
          };
          const Discord = require("discord.js");
          logs.send({
              embed: new Discord.RichEmbed()
                  .setTitle("Edited Message")
                  .setColor("85839f")
                  .setTimestamp(new Date())
                  .addField("Message Author", '\u200B' + oldMessage.author.tag)
                  .addField("OldMessage Content", `\u200B${oldMessage.content}`)
                  .addField("New Message Content", `\u200B${newMessage.content}`)
                  .addField("channel", '\u200B' + oldMessage.channel)
                  .addField("Time", '\u200B' + newMessage.createdAt)
          }).catch(console.error)
      })
      // End of server message logging
      // Start of server join and leaving loggs

//End of logging features
bot.login(process.env.token);
