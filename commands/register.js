const axios = require("axios"); // https://www.npmjs.com/package/axios

module.exports = async function(message, args, bot)
{
    let payload = {
        method: "POST",
        url: "http://www.work.psu.edu/cgi-bin/ldap/ldap_query.cgi",
        data: { mail: args[0] },
        transformRequest: [({mail}) => {
            return "sn=&cn=&uid=&mail=" + mail + "&full=0&submit=Search";
        }],
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    };
    
    let res = await axios(payload) // response
        .catch(bot.log.error);

    if (!res) return message.channel.send("Encountered an unknown error :sad:");

    // Check if page HTML contains "STUDENT" and, if not, deny access
    if (res.data.indexOf("STUDENT") < 0)
        return message.channel.send(
            `Your email (${args[0]}) is not registered in the database as a PSU student.
            This Discord is restricted to PSU students, so you cannot be automatically granted access.
            Please contact a moderator if you feel this is an error.`);
    
    // Collect some user data from HTML page
    let name_idx = res.data.indexOf(bot.config.info.name_prefix) + bot.config.info.name_prefix.length;
    let user = {
        name: res.data.slice(name_idx, res.data.indexOf("\n", name_idx)),
        email: args[0]
    };
    delete name_idx;

    // add student into the database
    
}