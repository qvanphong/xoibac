module.exports = async function dispatch(interaction) {
  const { commandName } = interaction

  const commandHandler = require(`./commands/${commandName}`)
  await commandHandler(interaction)
}
