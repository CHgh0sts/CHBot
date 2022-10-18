module.exports = {
    name: "tmv",
    model: "!tmv <utilisateur> [temps en seconde(s) (60s si non précisé)]",
    mode: "beta",
    description: "Cette commande permet d'expulser un utilisateur d'un channel vocal spécifique pendant un certain temps",
    permision: "MANAGE_CHANNELS",
    execute(bot, msg, args) {
        let member = msg.mentions.members.first();
        if(!member) return msg.reply('Aucun utilisateur selectionné')


        function recupUser(Client, idUser, idServer) {
            let retourVal
            Client.guilds.cache.map(serverList => {
                if(serverList.id === idServer) {
                    serverList.members.cache.map(userList => {
                        if(userList.id === idUser) {
                            retourVal = userList
                        }
                    })
                }
            })
            return retourVal;
        }

        let temps,server,user

        if(args[1]) {
            temps = parseInt(args[1])
        }else {
            temps = 60
        }

        if (args[3]) {
            server = args[3]
            user = recupUser(bot, member.id, args[3])
        }else {
            server = msg.guild.id
            user = member
        }

        let fs = require("fs");
        let ServerConfig;
        fs.readFile(`./paramsServer/${server}.json`, 'utf8', function(error, data){
            if (!error) {
                ServerConfig = JSON.parse(data);
                let nombreTmv = ServerConfig.tmv.length;
                ServerConfig.tmv.push(user.id)

                let resultModif = JSON.stringify(ServerConfig);
                fs.writeFile(`./paramsServer/${server}.json`, resultModif, (err) => {
                    if (err) throw err;
                    console.log(`"tmv" ajouté dans le fichier "${server}.json"`);
                });

                let interval = setInterval(() => {
                    try {
                        user.voice.setMute(true)
                        //member.voice.setDeaf(true)
                    } catch(e) {
                            msg.reply(`"<@${user.id}>" n'est pas en vocal`);
                            clearInterval(interval)
                    }
                    
                }, 1000);

                setTimeout(() => {
                    ServerConfig.tmv.splice(nombreTmv, 1);
                    let resultModif = JSON.stringify(ServerConfig);
                    fs.writeFile(`./paramsServer/${server}.json`, resultModif, (err) => {
                        if (err) throw err;
                        clearInterval(interval)
                        try {
                            user.voice.setMute(false)
                            //member.voice.setDeaf(false)
                        } catch(e) {
                            console.log(e)
                        }    
                        msg.channel.send(`tmv fini pour <@${user.id}>`)
                        console.log(`"tmv" suprimer dans le fichier "${server}.json"`);
                    });
                }, temps * 1000)
            }else {
                console.log(`Le fichier "${server}.json" n'a pas put etre lu`);
            }
        })
    }
}