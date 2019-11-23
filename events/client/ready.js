const { prefix } = require("../../botconfig.json");
module.exports = async bot => {
     console.log(`${bot.user.username} is online`)
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

    let statuses = [
        `${bot.guilds.size} servers! | ${prefix}help `,
        `${prefix}help`,
        `over ${bot.users.size} users! | ${prefix}help`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 5000)

}
