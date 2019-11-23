module.exports = {
    config: {
        name:"webhook-test",
        description: "sends a webhook to a channel",
        usage: "",
        category: "developer",
        accessableby: "Owner",
        aliases:["wh"]
    },
    run: async(bot, message, args) =>{
        const { RichEmbed, WebhookClient } = require("discord.js");
        const { red_dark } = require("../../colours.json");
        const { ownerid } = require("../../botconfig.json");
        /*const webhook = WebhookClient;
        if(!ownerid){
            message.channel.send({embed:{
                color: 3447003,
                description: ":x: You do not have permissions to use this command because it is a ***Owner Only*** command"
                }
            });
        } else if(ownerid){*/
            const webhook = new WebhookClient("597654850645393413", "JU7rY8rcIetdXvOWPIYycT15bctpDFP-mtE2mJ-3CQIyJR__abHCMJN8rESon8MS6KZs");
            webhook.sendSlackMessage({
                'username': 'DesRp Bot',
                'attachments': [{
                    'pretext': 'This is a message from the developer, we plan on making this bot better for more users and expand this bot to a fully settings enabled bot, if you guys are able to help with donations please do so by [clicking here](<https://paypal.me/pandorium>)',
                    'color': '#FOf',
                    'footer_icon': 'https://cdn.discordapp.com/attachment/521171520463044609/597668172467929115/your-avatar.png',
                    'footer': 'Powered by Hunter\'s Web Designs',
                    'ts': Date.now()/ 1000
                }]
            }).catch(O_o=>{})
        //}
    }
}
