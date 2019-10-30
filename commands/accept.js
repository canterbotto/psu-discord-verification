module.exports = async function(message, args, bot)
{
    message.member.addRole(bot.config.cmd.register.role[0])
        .catch(e => {
            message.channel.send("ERROR: Improper Config Role Specified. Repair: `config.json`");
            bot.log.error("ERROR: Improper Config Role Specified. Repair: `config.json`");
        })
        .then(() => {
            bot.log.trace("User '" + message.author.tag + "' --> Stage Verify;");
            message.member.removeRoles(bot.config.cmd.accept.role);
        });
    
}