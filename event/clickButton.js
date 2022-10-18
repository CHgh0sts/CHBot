const Discord = require("discord.js");
let fs = require("fs");
const config = require("../config.json");


module.exports = {
    nameEvent: 'guildCreate',
    execute(Client, button) {


        const embedJoinBeta = new Discord.MessageEmbed()
            .setColor(`#FF8300`)
            .setAuthor("CHBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp", "https://discord.js.org/")
            .setTitle(`:shield: Bienvenue dans le programme Beta ! (${config.prefix}leavebeta pour le quitter) :shield:`)
            .setURL("https://discord.gg/vqSyjG9V")
            .setTimestamp()
            .setFooter("CHghostsBot", "http://www.rj-informatique.com/CHghostsBot/src/img/CHghostsBot.webp")


        if(button.customId === "beta") {
            button.deferUpdate()
            button.channel.bulkDelete(1).then(messages => {
                fs.readFile(`./paramsServer/${button.guild.id}.json`, 'utf8', function(error, data){
                    if (!error) {
                        let ServerConfig = JSON.parse(data);
                        ServerConfig.ServerType = "beta";
                        let resultModif = JSON.stringify(ServerConfig);
                        fs.writeFile(`./paramsServer/${button.guild.id}.json`, resultModif, (err) => {
                            if (err) throw err;
                            console.log(`"nouveau server sur le mode beta ajouté"`)
                            button.channel.send({embeds: [embedJoinBeta]})
                        });
                    }else {
                        button.channel.send("Un problème est survenue a l'ajout de votre serveur dans le programme beta")
                    }
                })
            }).catch(err => {
                console.log("Erreur de clear : " + err);
            })
        }
    }
}