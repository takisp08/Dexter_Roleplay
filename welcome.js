module.exports = client => {
    const channelId = '828556636191981606' //welcome channel

    client.on('guildMemberAdd', member => {
        console.log(member)

        const message = `Ο <@${member.id}> μπήκε , στον **Dexter RolePlay**!!`
        member.roles.add('821458233432604723')

        const channel = member.guild.channels.cache.get(channelId)
        
        channel.send(message)
    })
}
