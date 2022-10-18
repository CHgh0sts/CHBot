module.exports = {
    name: "clear",
    model: "!clear <val de 1 à 50> [utilisateur]",
    type: "beta",
    description: "Cette commande permet de clear le channel sur lequel elle est appelée (si un utilisateur et donner, le bot ne supprimera que ces messages dans l'intervalle de la valeur donné)",
    permision: "MANAGE_MESSAGES",
    execute(bot, message, args) {

        const { Permissions } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && message.author.id !== "342696531108954113") {
            return message.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }
        amount = args[0];
        let member = message.mentions.members.first();
        let x = 0;
        if(!amount || isNaN(amount) || amount < 1 || amount > 50) {
            return message.reply("Merci de spécifier un nombre entre 1 et 50 !");
        }
        if (!member) {
            message.channel.bulkDelete(amount).then(messages => {
                console.log(`Supression de ${messages.size} messages reussi !!`)
            }).catch(err => {
                console.log("Erreur de clear : " + err);
            })
        }else {
            message.channel.messages.fetch({limit: amount}).then(messages => {
                let msgSup = [];
                if (member) {
                    messages.map(msg => {if(msg.author.id === member.id) {msgSup.push(msg)}});
                }
                message.channel.bulkDelete(msgSup).catch(err => {
                    console.log("Erreur de clear : " + err);
                });
            })
            
        }
    }
}