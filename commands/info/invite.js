module.exports = { 
    config: {
        name: "invite",
        description: "Displays the bots invite link",
        usage: "",
        aliases: ["boin", "bot link"],
        category: "info",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

    message.channel.send(message.author + " here is my invite link:\nhttps://discordapp.com/api/oauth2/authorize?client_id="+ bot.user.id +"&permissions=8&scope=bot")
    }
  }
