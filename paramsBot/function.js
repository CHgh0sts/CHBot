module.exports = {
    verifPermBot(Client, user) {
        let bot = user.guild.members.get('880698142239105024')
        return bot
     },
    verifPermUser(user, userMention) {
        return 'bye'
    }
}