module.exports = {
    name: "ping",
    model: "!ping",
    mode: "beta",
    description: "Cette commande permet d'afficher la vitesse de reponce du serveur",
    permision: "",
    execute(Client, message, args) {
        const { Permissions } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && msg.author.id !== "342696531108954113") {
            return message.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }
        let fs = require('fs')
        



        fs.readFile(`./paramsServer/${message.guild.id}.json`, 'utf8', function(error, data){
            if (!error) {
                let ServerConfig = JSON.parse(data);
                ServerConfig.ServerType = "public";
                let resultModif = JSON.stringify(ServerConfig);
                fs.writeFile(`./paramsServer/${message.guild.id}.json`, resultModif, (err) => {
                    if (err) throw err;
                    console.log(`"server suprimer du mode beta"`)
                    message.channel.send('Vous avez quitté le mode Beta')
                });
            }else {
                button.channel.send("Un problème est survenue a l'ajout de votre serveur dans le programme beta")
            }
        })
    }
}