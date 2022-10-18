module.exports = {
    name: "ping",
    model: "!ping",
    mode: "public",
    description: "Cette commande permet d'afficher la vitesse de reponce du serveur",
    permision: "",
    execute(Client, message, args) {
        message.channel.send('Pong ! Calcul en cour...').then(msg => {
            msg.edit(`Pong ! Latence : ${msg.createdTimestamp - message.createdTimestamp}ms`);
        });
    }
}