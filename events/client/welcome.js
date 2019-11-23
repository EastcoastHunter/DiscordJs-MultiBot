const Discord = require("discord.js")

module.exports = async bot => {
	bot.on('guildMemberAdd', member => {
		const channel = member.guild.channels.find(ch => ch.name === 'welcome') 
    const embed = new Discord.RichEmbed()
    .setAuthor('<*Server Name*!>;)//This is going to be on the very top of the Embed, For the Author Thumnail im going to put the Bot\'s Profile Picture, I\'m just testing this out, this wasnt planned, Don\'t blame me if it goes wrong :')
    .setTitle(`<Welcome to *Server Name*, ${member.displayName}>!`)
    .setColor(0xF08080)
    .setDescription(`<Welcome to *Server Name*, ${member.displayName}\nYou are currently in ${channel.name}!\n${guild.member.size}>`)
    .setURL('<https://github.com/Oribuin/OriWelcomeBot/blob/master/README.md>')
    .setImage('<http://i.imgur.com/yVpymuV.png>')
    .setThumbnail(`<${member.user.avatarURL}>`)
    .addBlankField(true)
    .addField("<Join our Minecraft Server!>", "< >> golinetwork.online << >")
    .addField("<Want to invite your friends to this server?>", "<[Discord Invite](https://discord.gg/c5JgrnA>", true)
    .addField("<You can add a number of fields, I wouldn't add too many since it would look at bit crazy>", "<[Github](https://github.com/Oribuin/)>", true)

    if (!channel) return;
    channel.send({embed})
});
}
