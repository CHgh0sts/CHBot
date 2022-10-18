const { channel } = require('diagnostics_channel');

module.exports = {
    name: "suptmv",
    model: "!suptev <utilisateur> [temps en seconde(s) (60s si non précisé)]",
    mode: "beta",
    description: "Cette commande permet d'expulser un utilisateur d'un channel vocal spécifique pendant un certain temps",
    permision: "MANAGE_CHANNELS",
    execute(bot, msg, args) {
        const { Permissions } = require('discord.js');

        if (!msg.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && msg.author.id !== "342696531108954113") {
            return msg.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }

        let member = msg.mentions.members.first();
        if(!member) return msg.reply("Aucun utilisateur selectionné");

        let fs = require("fs");
        fs.readFile(`./paramsServer/${msg.guild.id}.json`, 'utf8', function(error, data){
            if (!error) {
                let ServerConfig = JSON.parse(data);
                let x = -1;
                if(ServerConfig.tmv.length !== 0) {
                    console.log(`un utilisateur minimum trouver !`)
                    ServerConfig.tmv.map(Member => {
                        x++
                        if (member.id === Member) {
                            member.voice.setMute(false)
                            //member.voice.setDeaf(false)
                            ServerConfig.tmv.splice(x, 1);
                            let resultModif = JSON.stringify(ServerConfig);
                            fs.writeFile(`./paramsServer/${msg.guild.id}.json`, resultModif, (err) => {
                                if (err) throw err;
                                console.log(`"tev" supprimer dans le fichier "${msg.guild.id}.json"`);
                            });
                        }
                    })
                    if(x < 0) {
                        msg.reply(`Cette utilisateur n'a pas été trouver dans la listes des personne en cour de tev`)
                    }
                }
            }else {
                console.log(`Le fichier "${msg.guild.id}.json" n'a pas put etre lu`);
            }
        });
    }
}