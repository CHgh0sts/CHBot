const Discord = require("discord.js");
let fs = require("fs");

const Client = new Discord.Client({intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
]});


const config = require("./config.json");


/* require file for detec event */

let ready = require('./event/ready')
let guildCreate = require('./event/guildCreate')
let guildMemberAdd = require('./event/guildMemberAdd')
let messageCreate = require('./event/messageCreate')
let messageUpdate = require('./event/messageUpdate')
let clickButton = require('./event/clickButton')


Client.on("ready", msg => {
    console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    console.log("                                                                               Bot operationnel !!!");
    console.log('-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------');
    try {
        ready.execute(Client, msg)
    }
    catch(e) {
        console.error(`Un problème est survenue a la lecture de "ready.js"`)
        console.log(e)
    }
})
/* ajout du bot sur un nouveau serveur */
Client.on('guildCreate', async guild => {
    try {
        guildCreate.execute(Client, guild)
    }
    catch(e) {
        console.error(`Un problème est survenue a la lecture de "guildCreate.js"`)
        console.log(e)
    }
})
/* un nouvelle utilisateur sur un serveur */
Client.on("guildMemberAdd", async member => {
    try {
        guildMemberAdd.execute(Client, member)
    }
    catch(e) {
        console.error(`Un problème est survenue a la lecture de "guildMemberAdd.js"`)
        console.log(e)
    }
})
/* detection d'ecrit d'un msg dqns un channel text */
Client.on("messageCreate", message => {
    if(message.author.bot) return;
        try {
            messageCreate.execute(Client, message, config)
        }
        catch(e) {
            console.error(`Un problème est survenue a la lecture de "messageCreate.js"`)
            console.log(e)
        }
})
/* detection d'une modification d'un msg dans un channel text */
Client.on("messageUpdate", message => {
    if(message.author.bot) return;
    if (config.etatBot) {
        try {
            messageUpdate.execute(Client, message)
        }
        catch(e) {
            console.error(`Un problème est survenue a la lecture de "messageUpdate.js"`)
            console.log(e)
        }
    }
})
/* detection d'un click sur un btn dans un channel text */
Client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	try {
        clickButton.execute(Client, interaction)
    }
    catch(e) {
        console.error(`Un problème est survenue a la lecture de "clickButton.js"`)
    }
});
Client.login(config.token);