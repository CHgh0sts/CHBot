module.exports = {
    name: "rename",
    model: "!!rename",
    mode: "beta",
    description: "Cette commande permet d'afficher la vitesse de reponce du serveur",
    permision: "",
    execute(Client, message, args) {
        const { Permissions } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && message.author.id !== "342696531108954113") {
            return message.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }

        let member = message.mentions.members.first();
        if(!member) return message.reply("Aucun utilisateur selectionné");
        
        
        if(args[1]) {
            console.log(args[1]);
            member.setNickname(args[1])
            message.delete()
        }else {
            member.setNickname(null)
        }
    }
}