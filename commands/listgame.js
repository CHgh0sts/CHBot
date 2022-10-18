module.exports = {
    name: "listgame",
    model: "!!listgame",
    mode: "beta",
    description: "Cette commande permet d'afficher la list des partie du jeu sur genshin",
    permision: "",
    async execute(Client, message, args) {
        const { Permissions } = require('discord.js');

        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && message.author.id !== "342696531108954113") {
            return message.reply("Vous n'avez pas les autorisation d'executer cette commande");
        }


        const https = require('https');
        const Discord = require("discord.js");

        https.get('https://tfgbtr.chghosts.fr/api.php', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                let ListGame = JSON.parse(data)
                let avatar = message.author.displayAvatarURL({ size: 1024, dynamic: true })

                const embed = new Discord.MessageEmbed()
                        .setColor(`#fff`)
                        .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${avatar}`)
                        .setTitle(`Liste des games créees sur le site :`)
                        .setURL("https://tfgbtr.chghosts.fr/")

                for(let i = 0; i < ListGame.length; i++) {
                    let game = ListGame[i]
                    embed.addField(`Crée par : ${game.pseudo} , Type : ${game.type}`, `[${game.nbtUser} / ${game.nbtUserMax}] joueur(s)`)
                }
                if(ListGame.length == 0) {
                    embed.addField(`Aucune game est actuellement en cour`, `---------------------------------------------`)
                }
                message.channel.send({ embeds: [embed] })
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        })
    }
}