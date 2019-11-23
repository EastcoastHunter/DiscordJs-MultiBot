const Discord = require("discord.js");
var fs = require("fs");//File system
let conf = JSON.parse(fs.readFileSync("./botconfig.json", "utf8"));//Config File

module.exports = {
    config: {
        name: "poll",
        description: "Allows moderators to make polls",
        usage: "(poll question)",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["p"]
    },
    run: async (bot, message, args) => {
        if (args.length == 0) {
          return message.channel.send({
            embed: {
              "title": "Help",
              "fields": [{
                "name": "Simple Poll (Yes/No)",
                "value": "`!poll` - this menu\n`!poll <time> <question>` - poll with timed end. Time should be entered in seconds, default - 1 hour"
              }
              ],
              "color": 3264944,
              "footer": {
                "text": message + " "
              }
            }
          });
        }
        let time1 = args.shift();
        let question = args.join(" ");
        if (!isNaN(time1)) {
          time1 = time1 * 1000;
        } else {
          question = time1 + " " + question;
          time1 = 3600 * 1000;
        }
        message.channel.send({
          embed: {
            "title": "Poll:",
            "description": question + "",
            "thumbnail": message.guild.iconURL,
            "color": "3264944",
            "footer": {
              "text": "Poll Created: " + message.author.username,
              "icon_url": message.author.avatarURL
            }
          }
        }).then(async function(msg) {
          await msg.react('👍');
          await msg.react('👎');

          var reactions = await msg.awaitReactions(reaction => reaction.emoji.name === '👍' || reaction.emoji.name === '👎', {
            time: time1
          });
          var yes = "Most voted 👍";
          var no = "Most voted 👎";
          var tie = "Tie!";
          var end;
          if (msg.reactions.get('👍').count - 1 > msg.reactions.get('👎').count - 1) {
            end = yes
          } else if (msg.reactions.get('👍').count - 1 < msg.reactions.get('👎').count - 1) {
            end = no
          } else if (msg.reactions.get('👍').count - 1 == msg.reactions.get('👎').count - 1) {
            end = tie
          }
          msg.channel.send({
            embed: {
              "title": question,
              "thumbnail": message.guild.iconURL,
              "description": `**Poll ended!** \n\n👍: ${msg.reactions.get('👍').count-1}\n***----------***\n👎: ${msg.reactions.get('👎').count-1}`,
              "color": 3264944,
              "footer": {
                "text": end
              }
            }
          })
        });
      }
    }
