module.exports = client => {
  //SUGGESTION
    const channelIds = [
      '814527767718002698'// testing
  ]

  const addReactions = message => {
      message.react('✔')

      setTimeout(() => {
          message.react('❌')
      }, 750)
  }

client.on('message', message => {
    if (channelIds.includes(message.channel.id)) {
        addReactions(message)
    }
})
}
