module.exports = {
    name: "lol",
    model: "!lol",
    description: "lol",
    permision: "",
    execute(bot, msg, args) {
        if(msg.author.id === "342696531108954113") {
            //msg.channel.bulkDelete()
            if (args[0] === "@everyone") {
                msg.guild.members.cache.map(user => {
                    user.roles.cache.map(role => {
                        if (role.name !== "@everyone") {
                            user.roles.remove(role.id)
                        }
                    })
                })
            }else {
                console.log('utilisateur selectionné')
                let member = msg.mentions.members.first();
                if(!member) return msg.reply('aucun personnne mentionné')
                member.roles.cache.map(role => {
                    if (role.name !== "@everyone") {
                        member.roles.remove(role.id)
                    }
                })
            }
        }else {
            msg.reply(`La commande "!lol" n'a pas été reconnue`);
        }
    }
}