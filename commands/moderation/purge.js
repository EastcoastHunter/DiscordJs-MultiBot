const { ownerid, ownerid2 } = require("../../botconfig.json");
module.exports = { 
    config: {
        name: "purge",
        description: "Bulk Deletes A channel",
        accessableby: "Moderator",
        category: "moderation",
        usage:`<number>`,
        aliases: ["p", "clean", "clear", "erase", "delete"]
    },
    run: async (bot, message, args) => {
		const deleteCount = parseInt(args[0], 10);    
		if (message.member.roles.some(r => ["Staff", "Owner", "Admin"].includes(r.name)) || message.author.id === ownerid || message.author.id === ownerid2) {
		if(!deleteCount || deleteCount < 0 || deleteCount > 300)
		return message.reply("Please provide a number between 0 and 300 for the number of messages to delete");
		const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched)
		.catch(error => message.reply(`Couldnt delete messages because of: ${error}`));
		if(deleteCount.error){
			console.log('Couldnt Purge Chat Because: ', error)
			}
		}
	}
}

