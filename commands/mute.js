const { channel } = require('diagnostics_channel');

module.exports = {
    name: "tev",
    model: "!tev <utilisateur> [temps en seconde(s) (60s si non précisé)]",
    description: "Cette commande permet d'expulser un utilisateur d'un channel vocal spécifique pendant un certain temps",
    permision: "MANAGE_CHANNELS",
    execute(bot, msg, args) {
        const { Permissions } = require('discord.js');

        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && msg.author.id !== "342696531108954113") {
            return msg.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }

        let member = msg.mentions.members.first();
        if(!member) return msg.reply("Aucun utilisateur selectionné");

        let temps;
        if (args[1]) {
            temps = parseInt(args[1])
        }else {
            temps = 60;
        }

        let envoieVal = `{"user" : "${member.id}"}`

        let fs = require("fs");
        fs.readFile(`./paramsServer/${msg.guild.id}.json`, 'utf8', function(error, data){
            if (!error) {
                let ServerConfig = JSON.parse(data);
                let nombreMute = ServerConfig.mute.length;
                ServerConfig.mute.push(JSON.parse(envoieVal))
                let resultModif = JSON.stringify(ServerConfig);
                fs.writeFile(`./paramsServer/${msg.guild.id}.json`, resultModif, (err) => {
                    if (err) throw err;
                    console.log(`"Mute" ajouté dans le fichier "${msg.guild.id}.json"`);
                });

                setTimeout(() => {
                    fs.readFile(`./paramsServer/${msg.guild.id}.json`, 'utf8', function(error, data){
                        if (!error) {
                            ServerConfig = JSON.parse(data);
                            if(ServerConfig.mute.length === nombreMute + 1) {
                                ServerConfig.mute.map(user => {
                                    if(user.user = member.id) {
                                        ServerConfig.mute.splice(nombreMute, 1);
                                        let resultModif = JSON.stringify(ServerConfig);
                                        fs.writeFile(`./paramsServer/${msg.guild.id}.json`, resultModif, (err) => {
                                            if (err) throw err;
                                            console.log(`"Mute" supprimer dans le fichier "${msg.guild.id}.json"`);
                                            msg.channel.send(`Mute fini pour <@${member.id}>`);
                                        });
                                    
                                       member.guild.channels.cache.map(channel => {
                                            if (channel.type === "GUILD_TEXT") {
                                               channel.permissionOverwrites.delete(member.id);
                                           }
                                       })
                                    }
                                })
                            }
                        }
                    })
                }, temps * 1000)

                member.guild.channels.cache.map(channel => {
                    if (channel.type === "GUILD_TEXT") {
                        channel.permissionOverwrites.edit(member.id, { SEND_MESSAGES: false, ADD_REACTIONS: false });
                    }
                })

            }else {
                console.log(`Le fichier "${msg.guild.id}.json" n'a pas put etre lu`);
            }
        });
    }
}