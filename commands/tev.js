const { channel } = require('diagnostics_channel');

let verifPerm = require('../paramsBot/function.js')

module.exports = {
    name: "tev",
    model: "!tev <utilisateur> [temps en seconde(s) (60s si non précisé)]",
    mode: "beta",
    description: "Cette commande permet d'expulser un utilisateur d'un channel vocal spécifique pendant un certain temps",
    permision: "MANAGE_CHANNELS",
    execute(Client, msg, args) {
        const { Permissions } = require('discord.js');

        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && msg.author.id !== "342696531108954113" && msg.author.id !== "840264278938484756") {
            return msg.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }

        let member = msg.mentions.members.first();
        if(!member) return msg.reply("Aucun utilisateur selectionné");

        if (args[1]) {
            temps = parseInt(args[1])
        }else {
            temps = 60
        }
        if (args[3]) {
            server = args[3]
        }else {
            server = msg.guild.id




            
        }

        let envoieVal = `{"user" : "${member.id}"}`

        let fs = require("fs");
        fs.readFile(`./paramsServer/${server}.json`, 'utf8', function(error, data){
            if (!error) {
                let ServerConfig = JSON.parse(data);
                let nombreTev = ServerConfig.tev.length;
                ServerConfig.tev.push(JSON.parse(envoieVal))
                let resultModif = JSON.stringify(ServerConfig);
                fs.writeFile(`./paramsServer/${server}.json`, resultModif, (err) => {
                    if (err) throw err;
                    console.log(`"tev" ajouté dans le fichier "${server}.json"`);
                });

                setTimeout(() => {
                    fs.readFile(`./paramsServer/${server}.json`, 'utf8', function(error, data){
                        if (!error) {
                            ServerConfig = JSON.parse(data);
                            if(ServerConfig.tev.length !== 0) {
                                ServerConfig.tev.map(user => {
                                    if(user.user = member.id) {
                                        ServerConfig.tev.splice(nombreTev, 1);
                                        let resultModif = JSON.stringify(ServerConfig);
                                        fs.writeFile(`./paramsServer/${server}.json`, resultModif, (err) => {
                                            if (err) throw err;
                                            console.log(`"tev" supprimer dans le fichier "${server}.json"`);
                                            msg.channel.send(`Tev fini pour <@${member.id}>`);
                                        });
                                    
                                        Client.guilds.cache.map(serverList => {
                                            if(serverList.id === server) {
                                                serverList.channels.cache.map(channel => {
                                                    if (channel.type === "GUILD_VOICE") {
                                                        channel.permissionOverwrites.delete(member.id);
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                }, temps * 1000)

                Client.guilds.cache.map(serverList => {
                    if(serverList.id === server) {
                        serverList.channels.cache.map(channel => {
                            if (channel.type === "GUILD_VOICE") {
                                channel.permissionOverwrites.edit(member.id, { CONNECT: false });
                            }
                        })
                    }
                })
                member.voice.disconnect()
                msg.delete()

                

            }else {
                console.log(`Le fichier "./paramsServer/${server}.json" n'a pas put etre lu`);
            }
        });    
    }
}