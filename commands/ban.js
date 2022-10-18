module.exports = {
    name: "ban",
    model: "!ban <utilisateur> [raison]",
    type: "beta",
    description: "cette commande permet de bannir un utilisateur et de presiser la raison (ne peut bannir les utilisateur possédent un role qui se trouve au dessu du role du bot)",
    permision: "BAN_MEMBERS",
    execute(bot, message, args) {

        let member = message.mentions.members.first();
        if(!member) return message.reply("Aucun utilisateur selectionné");

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

        console.log(args)
        if(member.id === message.author.id) return message.reply("Tu ne peut pas te ban toi meme !!!");
        let reason = args.slice(2).join(" ") || "Banni par la modération";
        let returnChannel = "L'utilisateur a été banni avec success !";

        let user = recupUser(bot, member.id, args[2])

        user.ban({days: 0, reason: reason})
        .catch(err => {
            returnChannel = "L'utilisateur n'a pas put etre banni";
            console.log(err)
        })
        .then(
            message.channel.send(returnChannel)
            .then(
                member.send(`Vous avez été banni du serveur "${message.guild.name}" pour la raison suivante : "${reason}"`)
                .catch(err => {
                    console.log('Cette utilisateur ne peut pas resevoir de message privée => ' + err);
                })
            )
        );
    }
}

