const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');

const { Permissions } = require('discord.js');

let fs = require('fs')


/* - programme Beta - */
const embedBeta = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setAuthor("CHBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
    .setTitle(`:shield: Commande reservé au serveur participant au mode Beta :shield:`)
    .setURL("https://discord.gg/vqSyjG9V")
    .setTimestamp()
    .setFooter("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp")
const BtnBeta = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId('beta')
			.setLabel('Rejoindre le programme Beta')
			.setStyle('DANGER'),
    );


/* - programmme Alpha - */
const embedAlpha = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setAuthor("CHBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
    .setTitle(`:shield: Commande reservé au serveur participant au mode Alpha :shield:`)
    .setURL("https://discord.gg/vqSyjG9V")
    .setTimestamp()
    .setFooter("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp")


module.exports = {
    nameEvent: 'messageCreate',
    execute(Client, message, config) {
        if(message.author.bot) return;
        if(message.content.startsWith(config.prefix)) {
            if(config.etatBot) {

                let content = message.content.split(" ");
                let command = content[0];
                let args = content.slice(1);
                let prefix = config.prefix;

                let listeBeta

                if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && message.author.id !== "342696531108954113") {
                    return message.reply("Vous n'avez pas les autorisation d'executer cette commande");
                }

                let commandFile;
                try {
                    commandFile = require(`../commands/${command.slice(prefix.length)}.js`);
                    
                    if(commandFile.mode === "alpha") {
                        fs.readFile(`./paramsServer/${message.guild.id}.json`, 'utf8', (err, data) => {
                            if(err) {
                                console.log("Impossible d'ouvrir le fichier pour la liste des serveur et leur access")
                            }else {
                                ServerConfig = JSON.parse(data)
                                if (ServerConfig.ServerType === "alpha") {
                                    commandFile.execute(Client, message, args);
                                }else {
                                    message.channel.send({embeds: [embedAlpha]})
                                }
                            }
                        })
                    }else if(commandFile.mode === "beta"){
                        fs.readFile(`./paramsServer/${message.guild.id}.json`, 'utf8', (err, data) => {
                            if(err) {
                                console.log("Impossible d'ouvrir le fichier pour la liste des serveur et leur access")
                            }else {
                                ServerConfig = JSON.parse(data)
                                if (ServerConfig.ServerType === "beta") {
                                    commandFile.execute(Client, message, args);
                                }else {
                                    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                                        message.channel.send({embeds: [embedBeta]})
                                    }else {
                                        message.channel.send({embeds: [embedBeta], components: [BtnBeta]})
                                    }
                                }
                            }
                        })
                    }else {
                        commandFile.execute(Client, message, args);
                    }
                } catch(e) {
                    if(commandFile) {
                        message.reply(commandFile.model);
                        console.log(`Probleme d'execution de la commande execute dans le fichier "${command.slice(prefix.length)}.js"`)
                    }else {
                        let commandeReturn = (message.content.split(" ").length > 1) ? content[0] : message.content;
                        message.reply(`La commande "${commandeReturn}" n'a pas été reconnue`);
                    }
                }
            }else {
                const embedOff = new Discord.MessageEmbed()
                    .setColor(`#ff0000`)
                    .setAuthor("CHBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
                    .setTitle(`:shield: Le bot a été provisoirement desctivé :shield:`)
                    .setURL("https://discord.gg/vqSyjG9V")
                    .setTimestamp()
                    .setFooter("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp")
                //message.channel.send({embeds: [embedOff], components: [row]})
                message.channel.send({embeds: [embedOff]})
            }
        }
    }
}