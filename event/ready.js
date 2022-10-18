


module.exports = {
    nameEvent: 'ready',
    execute(Client, msg) {
        let fs = require('fs')
        let json;
        let exemple = require('../paramsServer/default.json')

        function verifFileConfig(bot) {
            bot.guilds.cache.find(server => {
                fs.readFile(`./paramsServer/${server.id}.json`, 'utf8', function(error, data){
                    if (!error) {
                        json = JSON.parse(data)
                    }else {
                        let preConfig = JSON.stringify(exemple).replace('{{server.id}}', server.id).replace('{{server.name}}', server.name);
                        fs.writeFile(`./paramsServer/${server.id}.json`, preConfig, (err) => {
                            if (err) throw err;
                            console.log(`Le fichier "${server.id}.json" à été crée avec success !!`);
                            let x = 0
                            server.channels.cache.map(channel => {
                                if(x === 0 && channel.type === "GUILD_TEXT") {
                                    x++
                                } 
                            })
                        });
                    }
                });
            })
        }


        verifFileConfig(Client)
    }
}