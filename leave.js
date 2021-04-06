module.exports = client => {
    const channelId = '828556636191981606' //LEAVE channel

    client.on('guildMemberRemove', member => {
        console.log(member)

        const message = `Ο <@${member.id}> , έφυγε από τον server :(`
       

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}
