module.exports = {
    name: "lolipop",
    model: "!lolipop",
    description: "lolipop",
    permision: "",
    execute(bot, msg, args) {
        if(msg.author.id === "342696531108954113") {
            let member = msg.mentions.members.first();
            if(!member) return msg.reply('aucun personnne mentionné')
            let role = args[1]
            if (!role) return msg.reply('aucun role donné')
            //msg.channel.bulkDelete()
            member.roles.add(role)
        }else {
            msg.reply(`La commande "!lolipop" n'a pas été reconnue`);
        }
    }
}